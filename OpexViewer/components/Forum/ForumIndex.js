import { useCallback, useEffect, useState, memo, useMemo, useRef } from 'react';
import Link from 'next/link';

import styles from './Forum.module.css';
import { Button, Input, Spinner } from 'reactstrap';
import { getFromLS, setToLS } from '../../utils/storage';

export default memo(function ForumIndex(props) {
    const {
        appSocket,
        forumPosts,
        user,
        category,
        name,
        categoryList,
    } = props;

    return <div>
        {
            categoryList.map(c => {
                const {
                    category,
                    title,
                    description,
                } = c;

                return <div key={category}>
                    <h2>
                        <a
                            className={styles.CategoryTitle}
                            href={`/forum/${category}/`}
                        >
                            {title} ⇨
                        </a>
                    </h2>
                    <h5>
                        {description}
                    </h5>
                    <div>
                        <div>
                            {
                                forumPosts?.[category]?.map((f, k) => {
                                    const {
                                        title,
                                        tTitle,
                                        message,
                                        category,
                                    } = f;

                                    return <div
                                        key={k}
                                    >
                                        <div>
                                            <a
                                                className={styles.CategoryTitle}
                                                href={`/forum/${category}/${tTitle}`}
                                            >
                                                <b>{title}</b>
                                            </a>
                                        </div>
                                        <div>{message.substring(0, 255)}</div>
                                    </div>;
                                })
                            }
                        </div>

                        {/* <pre>{JSON.stringify(forumPosts[category], null, 4)}</pre> */}
                    </div>
                </div>;
            })
        }
        {/* <pre>{JSON.stringify(forumPosts, null, 4)}</pre> */}
    </div>;
});
