/* eslint-disable @next/next/no-html-link-for-pages */
import { useRouter } from 'next/router';
import React,
{
    useCallback, useEffect, useState, memo, useMemo, useRef
} from 'react';

import { getAuthUserParams } from '../containers/withAuthUser/withAuthUser';
import {
    Button,
    Spinner,
} from 'reactstrap';

const mongo = require('../../db/mongoClient');
const demoDb = mongo.getDemoTable();

import styles from '../components/Demo/Demo.module.css';

export async function getServerSideProps(props) {
    const {
        req, res,
        locale,
        query,
    } = props;

    const user = await getAuthUserParams(props);

    console.log(user);

    const demoData = await demoDb.getData({ name: 'demo' }) || null;

    return {
        props: {
            user,
            demoData,
        },
    };
}

export default memo(function Demo(props) {
    const {
        user,
        appSocket,
        demoData,
    } = props;

    const [currentData, setCurrentData] = useState(demoData);
    const [inProgress, setInProgress] = useState(false);

    const update = useCallback(() => {
        appSocket?.emit('demo:updateData');
        setInProgress(true);
    }, [appSocket, setInProgress]);

    const onUpdate = useCallback(data => {
        setCurrentData(data);
        setInProgress(false);
    }, [setCurrentData, setInProgress]);

    useEffect(() => {
        appSocket?.on('demo:updateDataResult', onUpdate);

        return () => {
            appSocket?.off('demo:updateDataResult', onUpdate);
        };
    }, [appSocket, onUpdate]);

    return <>
        <div
            className={styles.Example}
        >
            <pre>{JSON.stringify(currentData, null, 4)}</pre>

            <div> {
                !!user?._id ?
                    inProgress ? <Spinner color='success' /> :
                        <Button
                            color="primary"
                            onClick={update}
                        >
                            Обновить
                        </Button> :
                    'Пользователь не авторизован'
            }
            </div>
        </div>
    </>;
});
