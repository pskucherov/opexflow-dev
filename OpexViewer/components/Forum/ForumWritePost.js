import { useCallback, useEffect, useState, memo, useMemo, useRef } from 'react';
import Link from 'next/link';

import styles from './Forum.module.css';
import { Button, Input, Spinner } from 'reactstrap';
import { getFromLS, setToLS } from '../../utils/storage';

export default memo(function ForumWritePost(props) {
    const {
        appSocket,
        forumPosts,
        isLongUrl = false,
        showPosts = true,
        showPostTitle = false,

        // showIdeaTitle = true,

        category,
        title = 'Идеи и предложения',
        createTheme = false,
        user,
    } = props;

    const [posts, setPosts] = useState(forumPosts);
    const [url, setUrl] = useState();

    useEffect(() => {
        setUrl(isLongUrl ? (location.pathname + location.search) : location.pathname);
    }, [isLongUrl, setUrl]);

    useEffect(() => {
        setPosts(forumPosts);
    }, [forumPosts, setPosts]);

    const [nonAuthId, setNonAuthId] = useState();
    const titleRef = useRef();
    const textAreaRef = useRef();

    const [goToModer, setGoToModer] = useState();
    const [inProgress, setInProgress] = useState();

    useEffect(() => {
        let id = getFromLS('nonAuthId');

        if (id) {
            setNonAuthId(id);
        } else {
            id = Math.random();
            setToLS('nonAuthId', id);
            setNonAuthId(id);
        }
    }, [setNonAuthId]);

    const onPost = useCallback(() => {
        let text = textAreaRef?.current?.value;
        const title = titleRef?.current?.value;

        if (text?.length > 10) {
            setInProgress(true);

            if (text?.length > 5000) {
                text = text.substring(0, 5000);
            }

            appSocket?.emit('forum:newpost', {
                title,
                category,
                text,
                nonAuthId,
                url,
                prevPostId: undefined,
            });
        }
    }, [nonAuthId, textAreaRef, titleRef,
        setInProgress, appSocket, url,
        category,
    ]);

    const onOkModer = useCallback(() => {
        setGoToModer(false);
    }, [setGoToModer]);

    const onPosted = useCallback(data => {
        const {
            url: postUrl,
            needModerate,
        } = data;

        if (postUrl === url) {
            if (needModerate) {
                setGoToModer(true);
                setInProgress(false);
            } else {
                appSocket?.emit('forum:getPosts', {
                    url,
                });
            }
        }
    }, [setInProgress, setGoToModer, url, appSocket]);

    const onGetPost = useCallback(data => {
        const {
            posts,
        } = data;

        setPosts(posts);
        setInProgress(false);
    }, [setPosts, setInProgress]);

    useEffect(() => {
        appSocket?.on('forum:newpostResult', onPosted);
        appSocket?.on('forum:getPostsResult:' + url, onGetPost);

        return () => {
            appSocket?.off('forum:newpostResult', onPosted);
            appSocket?.off('forum:getPostsResult:' + url, onGetPost);
        };
    }, [onPosted, appSocket, url, onGetPost]);

    return <div>
        {
            <div>
                <h2
                    style={{
                        marginTop: 70,
                        textAlign: 'center',
                    }}
                >
                    {title}
                </h2>
                <br />
            </div>
        }
        {
            goToModer ? <>
                <div>Сообщение отправлено на модерацию.</div>
                <div
                    style={{
                        float: 'right',
                    }}
                >
                    <Button
                        color="primary"
                        onClick={onOkModer}
                    >
                        Ok
                    </Button>
                </div>
            </> : <>
                {Boolean(createTheme) && Boolean(user?._id) &&
                    <Input
                        style={{
                            width: '100%',
                            marginBottom: 15,
                        }}
                        innerRef={titleRef}
                        placeholder="Тема"
                    />
                }
                <Input
                    style={{
                        width: '100%',
                    }}
                    rows={5}
                    innerRef={textAreaRef}
                    type="textarea"
                    placeholder={user?._id ? 'Ваш комментарий...' :
                        'Сообщения неавторизованных пользователей публикуются после модерации.'}
                />
                <div
                    style={{
                        float: 'right',
                        marginTop: 15,
                    }}
                >
                    {inProgress ?
                        <Spinner
                            color="success"
                        /> :
                        <Button
                            color="primary"
                            onClick={onPost}
                        >
                            Отправить
                        </Button>
                    }
                </div>
            </>
        }

        {Boolean(showPosts) && <div
            style={{
                marginTop: 150,
            }}
        >
            {Boolean(posts?.length) && posts
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((p, i) => {
                    const {
                        message,
                        createdAt,
                    } = p;

                    return <div
                        key={i}
                    >
                        <div
                            style={{
                                textAlign: 'right',
                                fontSize: 14,
                            }}
                        >
                            {new Date(createdAt).toLocaleString()}
                        </div>
                        <div>{message}</div>
                        <hr />
                    </div>;
                })}
            {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
        </div>}
    </div>;
});
