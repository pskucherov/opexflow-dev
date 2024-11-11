import React, { useCallback, useState, useRef, useEffect, memo } from 'react';
import Head from 'next/head';
import {
    Badge, Nav, Navbar, NavbarBrand, NavbarToggler,
    Collapse, NavItem, NavLink, NavbarText,
} from 'reactstrap';
import { pageOpenGraph } from './PageHeadTItles';

import styles from './Page.module.css';

import { useTranslation } from 'next-i18next';
import { getLink } from '../../utils/utils';
import Idea from '../Idea/Idea';

const fontFamily = 'EuclidCircularSemibold, -apple-system,BlinkMacSystemFont,Roboto,Ubuntu';

export default memo(function Page(props) { // eslint-disable-line
    const { t } = useTranslation('common');

    const { isSandboxToken, serverStatus,
        pageProps,
        accountId, pathname, balance,
        robotStartedStatus, serverUri,
        asPath, router, componentTitle,
        locale,
        user, hideWrapper,
        setIsDarkMode,
        isDarkMode,
        ideaRef,
        setTitle,
        disableHeadTgAuth,
    } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(!isMenuOpen);
    }, [isMenuOpen]);

    // 0 нужно задать, 1 sandbox, 2 production
    const whatToken = typeof isSandboxToken === 'undefined' ? 0 : isSandboxToken ? 1 : 2;

    const graph = {};

    const title = (componentTitle || pageProps?.title);

    return (hideWrapper ? props.children :
        <div className={styles.container} >
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageProps?.description || graph.description} />
                <meta name="keywords" content={pageProps?.keywords || graph.keywords} />

                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={pageProps?.description || graph.description} />
                <meta property="og:image" content={pageProps?.image || graph.image || 'https://articles.opexflow.com/wp-content/uploads/2022/06/opexhabr-330x140.png'} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:locale:alternate" content="ru,en" />
                <meta property="og:site_name" content={'opexflow.com'} />
                <meta property="og:url" content={('https://opexflow.com') + asPath} />

                {/* <meta property="csp-nonce" content={'nonceqwe'} /> */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" href="https://articles.opexflow.com/wp-content/uploads/2020/04/android-icon-192x192-1-150x150.png" sizes="32x32" />
                <link rel="icon" href="https://articles.opexflow.com/wp-content/uploads/2020/04/android-icon-192x192-1.png" sizes="192x192" />
                <link rel="apple-touch-icon" href="https://articles.opexflow.com/wp-content/uploads/2020/04/android-icon-192x192-1.png" />
                <meta name="msapplication-TileImage" content="https://articles.opexflow.com/wp-content/uploads/2020/04/android-icon-192x192-1.png" />

                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="UTF-8" />
                {/* <link rel="preload" as="script" href="https://top-fwz1.mail.ru/js/code.js" />
                <link rel="preload" as="script" href="https://mc.yandex.ru/metrika/tag.js" />
                <link rel="preload" as="script" href="https://www.googletagmanager.com/gtag/js?id=G-YCVDSR3BD7" /> */}
                {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1649451972970215" crossOrigin="anonymous"></script> */}
            </Head>

            <main className={styles.main} data-bs-theme="dark"
                style={{
                    padding: 0,
                    margin: 0,

                    // visibility: 'hidden',
                }}
            >
                <style
                    dangerouslySetInnerHTML={{
                        __html: 'body,html{padding:0;margin:0;color:#fff!important;font-family: EuclidCircularSemibold, sans-serif; color-scheme:dark;background:#000;-webkit-font-smoothing:antialiased;font-smooth:antialiased;letter-spacing:1.1px;overflow-x:hidden}a{color:inherit;text-decoration:none}*{box-sizing:border-box}.button-submit{background-color:#1976d2!important}main{visibility:visible!important}h1,h2,h3,h4,h5{font-family:EuclidCircularSemibold,sans-serif;font-feature-settings:"tnum" on,"lnum" on}', // eslint-disable-line
                    }}
                />
                <div
                    style={{
                        position: 'relative',
                    }}
                >
                    <Navbar
                        color="dark"
                        expand="md"

                        // light
                        dark

                        // color
                        data-bs-theme="dark"
                        animation="true"
                        className={styles.NavBarBg}
                        style={{
                            padding: 0,

                            position: 'absolute',
                            width: '100%',
                            margin: 0,
                            zIndex: 100,
                        }}
                    >
                        {<>
                            <NavbarBrand style={{
                                fontSize: '1.75rem',
                                margin: '15px 5px 15px 15px',
                                padding: 0,
                                fontFamily,
                                color: '#FFD700',
                            }} href="/">
                                OpexFlow
                            </NavbarBrand>
                            <div style={{
                                flex: 'auto',
                                width: 35,
                                fontSize: 11,
                                color: 'red',
                                padding: 0,
                                top: -10,
                                position: 'relative',
                            }} >
                                <a href="/" target="_blank" rel="noreferrer">βeta</a>
                                {/* <a href="https://articles.opexflow.com/beta" target="_blank" rel="noreferrer">βeta</a> */}
                            </div>
                        </>
                        }
                        <NavbarToggler
                            style={{
                                borderColor: '#fff',
                                marginRight: 15,
                            }}
                            onClick={toggleMenu} />
                        <Collapse isOpen={isMenuOpen} navbar
                            style={{
                                margin: '0 30px',
                                flexBasis: '100%',
                                width: '100%',
                                paddingBottom: isMenuOpen ? '15px' : 0,

                                // backgroundColor: '#000811', // isMenuOpen ? '#000' : 'rgba(0, 0, 0, 100)',
                            }}
                        >
                            <Nav
                                className="me-auto"
                                navbar
                            >
                                {
                                    (
                                        [
                                            {
                                                url: '/screener',
                                                name: 'Скринер',
                                            },

                                            {
                                                url: '/robots/competition',
                                                name: 'Роботы',
                                            },

                                            {
                                                url: '/fortraders',
                                                name: 'Трейдерам',
                                            },

                                            {
                                                url: '/ai',
                                                name: 'ИИ',
                                            },

                                            {
                                                // url: 'https://t.me/opexflow',
                                                url: 'https://t.me/opexbotru',
                                                name: 'Контакты',
                                            },
                                        ]
                                    )
                                        .filter(f => Boolean(f))
                                        .map((n, k) => (
                                            <NavItem
                                                key={k}
                                                style={{ margin: '5px 10px', fontSize: 20 }}
                                            >
                                                <NavLink
                                                    active={n.url === pathname}
                                                    href={n.url === '/#' ? undefined : n.url}
                                                    onClick={
                                                        n.url === '/#' ? () => {
                                                            ideaRef?.current?.click();
                                                        } : () => {
                                                            // n.url === 'https://t.me/opexflow_bot' && window.ym(89394696, 'reachGoal', 'headlinktglearnclick');
                                                        }
                                                    }
                                                    className={styles.HeadNavLink}
                                                    style={{
                                                        cursor: 'pointer',
                                                        color: '#FFF',
                                                        fontFamily: 'EuclidCircularSemibold, sans-serif',

                                                    }}
                                                >
                                                    {n.url.indexOf(pathname) !== -1 ? <b>{n.name}</b> : n.name}
                                                </NavLink>
                                            </NavItem>
                                        ))}
                            </Nav>

                            <HeadBadges
                                locale={locale}
                                login={user?.login}
                                refLogin={user?.refLogin}
                                disableHeadTgAuth={disableHeadTgAuth}
                            />
                        </Collapse>
                    </Navbar>
                </div>

                <div
                    dangerouslySetInnerHTML={{
                        __html: '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" onload="if (typeof loadAsyncStyleSheets === \'function\') { loadAsyncStyleSheets(); }"  style="position: absolute; top: -10000px; left: -10000px;"/>', // eslint-disable-line
                    }}
                />

                <div
                    style={{
                        position: 'relative',
                        marginTop: 65,
                        fontFamily,
                    }}
                >
                    {props.children}
                </div>
            </main>

            <link rel="preload" as="script" href="https://top-fwz1.mail.ru/js/code.js" />
            <link rel="preload" as="script" href="https://mc.yandex.ru/metrika/tag.js" />
            <link rel="preload" as="script" href="https://www.googletagmanager.com/gtag/js?id=G-YCVDSR3BD7" />

            <div

                style={{
                    padding: '200px 50px 0',
                    color: 'rgba(255, 255, 255, .5)',
                    textAlign: 'justify',
                    width: '100%',
                }}
            >
                Всё, что вы видите на сайте, создано одним разработчиком, при поддержке его верного помощника,
                ChatGPT. Приглашаю стать нашим инвестором, ментором и вдохновителем
                (или порекомендуйте нас тому, кого может проект заинтересовать).
                В знак благодарности, мы (Я и ChatGPT) готовы предложить вам долю в проекте.

                Сайт opexflow.com является прототипом (черновиком / MVP) для
                знакомства с основами алгоритмической торговли.
                В качестве биржевых данных пользователи видят
                устаревшую неактуальную информацию, которая может не соответствовать действительности,
                т.к. собрана из открытых источников.

                Opexflow не является распространителем биржевой информации.
                Чтобы использовать реальные биржевые данные онлайн, воспользуйтесь терминалом <a href="/kit" >OpexBot</a>.

                Сайт носит исключительно демонстрационный характер и может содержать ошибки.
                Содержимое не является инвестиционной рекомендацией или
                предложением к совершению сделок с финансовыми инструментами.

                Торговля на финансовых рынках подвержена высокому рыночному риску.
                Администрация opexflow.com не несет ответственности
                за содержание, последствия использования сайта и информации на нём.
                В том числе за любые возможные убытки от сделок с
                финансовыми инструментами. В случае обнаружения ошибок — сообщайте роботу (кружок слева внизу).
            </div>

            <footer className={styles.footer} style={{
                // float: 'right',
            }}>
                {

                    <>
                        <div
                            style={{
                                margin: '10px 30px',
                            }}
                        >
                            <a
                                href="https://articles.opexflow.com/terms/terms-and-conditions.htm"
                                target="_blank" rel="noreferrer"
                            >
                                Пользоватeльское соглашение
                            </a>
                        </div>
                        <div
                            style={{
                                margin: '10px 30px',
                            }}
                        >
                            <a
                                href="https://articles.opexflow.com/terms/privacy-policy.htm"
                                target="_blank" rel="noreferrer"
                            >
                                Политика конфиденциальности
                            </a>
                        </div>
                    </>
                }

                <Idea
                    serverUri={serverUri}
                    ideaRef={ideaRef}
                    login={user?.login || undefined}
                    isDarkMode={isDarkMode}
                />
            </footer>
        </div>
    );
});

const HeadBadges = memo(function FMemoName(props) {
    const { t } = useTranslation('common');

    const {
        login,
        refLogin,
        locale,
        disableHeadTgAuth,
    } = props;

    return (<>
        {
            Boolean(login) &&
            <Badge
                className={styles.PageLoginBadge}

                // color="success"

                href={getLink(locale, '/profile')}
            >
                {/* {login} */}
                Профиль
            </Badge>
        }
        {

            login ?
                <Badge
                    className={styles.PageBadge}
                    color="danger"
                    href="/logout"
                >
                    {t('logout')}
                </Badge> :

                !disableHeadTgAuth &&
                <>
                    <div
                        style={{
                            marginTop: 10,
                        }}
                    >
                    </div>
                </>
        }
    </>);
});
