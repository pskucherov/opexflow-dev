import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import Page from '../components/Page/Page';

import { appWithTranslation } from 'next-i18next';

import { useRouter } from 'next/router';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { getFromLS } from '../utils/storage';

import useWindowDimensions from '../hooks/useWindowDimensions/useWindowDimensions';
import Cookies from 'universal-cookie';
import { io } from 'socket.io-client';

const opexDomain = 'opexflow.com';

const defaultServerUri = typeof location !== 'undefined' &&
    (location.host === opexDomain ?
        'https://opexflow.com/api' :
        'http://localhost:8000/api'
    );

const setReferalLogin = ref => {
    if (!ref) {
        return;
    }

    const cookies = new Cookies();

    cookies.set('refLogin', ref, {
        path: '/',
        expires: new Date(Date.now() + (7 * 24 * 3600 * 1000)),
        signed: true,
    });
};

/* eslint-disable sonarjs/cognitive-complexity */
function MyApp({ Component, pageProps }) {
    pageProps = pageProps || {};

    const {
        host,
        user,
        disableHeadTgAuth,
    } = pageProps;

    const [isDarkMode, setIsDarkMode] = useState();

    const router = useRouter();

    const routerPush = router.push;
    const { isReady, pathname, query, asPath } = router;

    const locale = 'ru';
    const [ready, setReady] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [serverUri, setServerUri] = React.useState(defaultServerUri);

    const ideaRef = useRef(null);

    const [robotStartedStatus, setRobotStartedStatus] = React.useState(false);

    const [appSocket, setSocket] = useState();
    const [appNotAuthSocket, setAppNotAuthSocket] = useState();

    useEffect(() => {
        if (!isReady || appSocket || !serverUri) {
            return;
        }

        const s = io(serverUri + '/app', {
            path: '/api/socket',
            withCredentials: true,
        });

        setSocket(s);
    }, [serverUri, isReady, setSocket, appSocket]);

    useEffect(() => {
        if (!isReady || appNotAuthSocket) {
            return;
        }

        const s = io(serverUri + '/notAuthApp', {
            path: '/api/socket',
            withCredentials: true,
        });

        setAppNotAuthSocket(s);
    }, [isReady, setAppNotAuthSocket, serverUri, appNotAuthSocket]);

    useEffect(() => {
        typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null;

        let interval;
        let intervalStatus;

        setReady(true);

        const newUri = getFromLS('serverUri');
        const serverUriFromParam = query && query.serveruri;

        if (newUri && newUri !== serverUri) {
            setServerUri(newUri);
        } else if (serverUriFromParam && serverUriFromParam !== serverUri) {
            setServerUri(serverUriFromParam);
        }

        return () => {
            interval && clearInterval(interval);
            intervalStatus && clearInterval(intervalStatus);
        };

        // checkToken в deps специально не добавлен, чтобы не было лишних запросов.
    }, [ready, isReady, setServerUri, // eslint-disable-line react-hooks/exhaustive-deps
        // getBalanceRequest
    ]);

    useEffect(() => {
        setReferalLogin(router?.query?.ref);
    }, [router?.query?.ref]);

    const hideWrapper = [
        '/auth/opexbotiframe',
        '/auth/opexbotiframeexit',
        '/auth/opexbotredirect',
        '/auth/opexbotiframeisenter',
        '/logout',
        '/bot',
    ].includes(pathname);

    const { height, width } = useWindowDimensions();

    return (
        <Page
            title={title}
            componentTitle={pageProps.title && typeof pageProps.text !== 'undefined' && (pageProps.title + (typeof pageProps.text !== undefined ? '. ' + pageProps.text : ''))}
            pageProps={pageProps}
            pathname={pathname}
            asPath={asPath}
            router={router}
            user={user}
            serverUri={serverUri}
            locale={locale}
            hideWrapper={hideWrapper}
            key={router.asPath}
            setIsDarkMode={setIsDarkMode}
            isDarkMode={isDarkMode}
            ideaRef={ideaRef}
            setTitle={setTitle}
            disableHeadTgAuth={disableHeadTgAuth}
        >

            {/* {Boolean(appSocket) &&  */}
            <Component
                {...pageProps}
                serverUri={serverUri}
                appSocket={appSocket}
                appNotAuthSocket={appNotAuthSocket}

                // isDevHost={isDevHost}
                setTitle={setTitle}
                router={router}
                routerPush={routerPush}
                asPath={asPath}

                // asPathServer={asPathServer}
                robotStartedStatus={robotStartedStatus}
                setRobotStartedStatus={setRobotStartedStatus}
                locale={locale}
                user={user}
                key={router.asPath}
                isDarkMode={isDarkMode}
                pageWidth={width}
                pageHeight={height}
            />
            {/* } */}
        </Page>
    );
}

MyApp.getInitialProps = async ({ ctx: { req, res } }) => {
    try {
        const csp = {};

        const headers = res.getHeaders();

        headers?.['content-security-policy']?.split(';').filter(Boolean).forEach(part => {
            const [directive, ...source] = part.split(' ');

            csp[directive] = source.map(s => s.slice(1, s.length - 1));
        });

        return {
            nonce: csp['default-src']?.find(s => s.startsWith('nonce-')).split('-')[1],
        };
    } catch (e) {
        console.log(e); // eslint-disable-line
    }
};

export default appWithTranslation(MyApp);
