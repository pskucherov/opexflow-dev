import { useCallback, useEffect, useState, memo, useMemo, useRef } from 'react';
import Link from 'next/link';

import styles from './Forum.module.css';
import { Button, Input, Spinner } from 'reactstrap';
import { getFromLS, setToLS } from '../../utils/storage';

export default memo(function ForumPosts(props) {
    const {
        appSocket,
        forumPost,
        user,
        category,
        name,
    } = props;

    return <div>
        <div><h1
            style={{
                marginTop: 70,
                textAlign: 'center',
            }}
        >
            {forumPost.title}
        </h1>
        <br />
        </div>

        <div
            style={{
                marginTop: 150,
            }}
        >
            {forumPost.message}
        </div>
    </div>;
});
