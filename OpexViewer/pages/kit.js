import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import { getAuthUserParams } from '../containers/withAuthUser/withAuthUser';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Trading from '../components/Trading/Trading';

export async function getServerSideProps(props) {
    const { req, res,
        locale,
    } = props;

    const user = await getAuthUserParams(props);

    return {
        props: {
            ...(await serverSideTranslations(locale || 'ru', ['common'])),
            user,
            lang: user?.lang,
            host: props?.req?.headers?.host,

            title: 'Opexbot: ваш ключ к максимальной эффективности в Тинькофф Инвестиции!',
            description: 'Робот экономит ваше время на анализ рынка, подсвечивает драйверы роста, экономит время на покупке пакета акций, кэшбек 10% на комиссию в Тинькофф Инвестиции при торговле через OpexBot',
            keywords: 'Акции, котировки, цена в реальном времени, торговый помощник, opexbot.',
            image: 'https://opexflow.com/images/opexbotcartlist.png',
        },
    };
}

export default memo(function Page(props) {
    const { serverUri, routerPush, user } = props;

    return (
        <Trading
            serverUri={serverUri}
            routerPush={routerPush}
            user={user}
        />
    );
});
