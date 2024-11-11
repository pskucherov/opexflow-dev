import {
    useCallback,
    useEffect,
    useState,
    memo,
    useMemo,
    useRef,
} from 'react';

import Link from 'next/link';

import styles from './Forum.module.css';
import { Button, Input, Spinner } from 'reactstrap';
import { getFromLS, setToLS } from '../../utils/storage';
import ForumWritePost from './ForumWritePost';

export default memo(function ForumCategory(props) {
    const {
        appSocket,

        forumPosts,
        user,

        // category,

        curCategory,

        // name,
    } = props;

    const {
        category,
        title,
        description,
    } = curCategory;

    return <div>
        <div>
            <h2
                style={{
                    marginTop: 20,
                    textAlign: 'center',
                }}
            >
                {title}
            </h2>
            <h5>{description}</h5>
        </div>

        <div
            style={{
                // marginTop: 150,
            }}
        >
            <pre>{JSON.stringify(forumPosts, null, 4)}</pre>
        </div>

        <div>
            <ForumWritePost
                user={user}
                appSocket={appSocket}

                // forumPosts={forumPosts}

                category={category}

                // isLongUrl={false}
                showPosts={false}
                showPostTitle={false}
                showIdeaTitle={false}

                title="Создать тему"
                createTheme={true}
            />
        </div>
    </div>;
});
