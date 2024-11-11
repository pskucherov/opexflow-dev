/* eslint-disable @next/next/no-html-link-for-pages */
import { useRouter } from 'next/router';
import React,
{ useCallback, useEffect, useState, memo, useMemo, useRef } from 'react';

import { getAuthUserParams } from '../containers/withAuthUser/withAuthUser';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ForTraders from '../components/Articles/ForTraders';

const mongo = require('../../db/mongoClient');
const forumData = mongo.getForumTable();

export async function getServerSideProps(props) {
    const { req, res,
        locale,
    } = props;

    const user = await getAuthUserParams(props);

    const forumPosts = await forumData.getPosts({
        url: '/fortraders',
    });

    return {
        props: {
            ...(await serverSideTranslations(locale || 'ru', ['common'])),
            user,
            forumPosts: forumPosts || null,
            title: 'Как создать робота для внутридневной торговли',
            description: 'Робот экономит ваше время на анализ рынка, подсвечивает драйверы роста, экономит время на покупке пакета акций, кэшбек 10% на комиссию в Тинькофф Инвестиции при торговле через OpexBot',
            keywords: 'Акции, котировки, цена в реальном времени, торговый помощник, opexbot.',
        },
    };
}

export default memo(function Page(props) {
    const {
        user,
        appSocket,
        forumPosts,
    } = props;

    return <ForTraders
        user={user}
        appSocket={appSocket}
        forumPosts={forumPosts}
    />;
});
