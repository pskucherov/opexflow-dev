/* eslint-disable @next/next/no-html-link-for-pages */
import { useRouter } from 'next/router';
import React,
{ useCallback, useEffect, useState, memo, useMemo, useRef } from 'react';

import { getAuthUserParams } from '../containers/withAuthUser/withAuthUser';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../styles/Index.module.css';
import useOnScreen from '../hooks/useOnScreen';
import MediaVisual, { MediaNextButton } from '../components/MediaVisual/MediaVisual';

export async function getServerSideProps(props) {
    const { req, res,
        locale,
    } = props;

    const user = await getAuthUserParams(props);

    const filters = null;
    const userSignals = null;

    return {
        props: {
            ...(await serverSideTranslations(locale || 'ru', ['common'])),
            user,

            title: 'Opexflow. Мы делаем алготрейдинг доступным для миллионов частных инвесторов России.',
            description: 'Робот экономит ваше время на анализ рынка, подсвечивает драйверы роста, экономит время на покупке пакета акций, кэшбек 10% на комиссию в Тинькофф Инвестиции при торговле через OpexBot',
            keywords: 'Акции, котировки, цена в реальном времени, торговый помощник, opexbot.',
        },
    };
}

export default memo(function Page(props) {
    const {
        serverUri,
        routerPush,
        user,

        pageWidth,
        pageHeight,
    } = props;

    const [background, setB] = useState();
    const [inited, setInited] = useState();

    useEffect(() => {
        setInited(true);
    }, []);

    useEffect(() => {
        if (!background) {
            const b = pageWidth > pageHeight ? '/images/hback.png' : '/images/pback2.png';

            setB(`url(${b})`);
        }
    }, [setB, pageWidth, pageHeight, background]);

    const [selectedId, setSelectedId] = useState('signals');

    const list = useMemo(() => [
        {
            name: 'signals',
            title: 'Сигналы',
            component: <Signals
                onNext={() => setSelectedId('robots')}
            />,
        },
        {
            name: 'robots',
            title: 'Роботы',
            component: <Robots
                onNext={() => setSelectedId('sandbox')}
            />,
        },
        {
            name: 'sandbox',
            title: 'Песочница',
            component: <Sandbox onNext={() => setSelectedId('research')} />,
        },
        {
            name: 'research',
            title: 'Исследования',
            component: <Research
                onNext={() => setSelectedId('competition')}
            />,

        },
        {
            name: 'competition',
            title: 'Соревнования',
            component: <Competition
                onNext={() => setSelectedId('forum')}
            />,

        },
        {
            name: 'forum',
            title: 'Форум',
            component: <Forum
                onNext={() => {
                    location.href = '/robots/competition';
                }}
            />,
        },
    ], [setSelectedId]);

    return <>
        <div
            style={{
                position: 'relative',
                maxWidth: 1000,
                margin: '0 auto',
                paddingInline: '5px',
            }}
        >
            <div
                style={{
                    paddingTop: 50,
                    textAlign: 'center',

                }}
            >
                <div
                    className={styles.HeadTitle}
                >
                    Бодаешься с чужими <span style={{ whiteSpace: 'nowrap' }}>роботами в стакане?</span>
                    <br />Создай своего!
                </div>
                <div
                    className={styles.SubHeadTitle}
                >
                    <div>Мы делаем алготрейдинг <span style={{ whiteSpace: 'nowrap' }}>доступным для миллионов
                    </span> <span
                        style={{ whiteSpace: 'nowrap' }}>частных инвесторов России</span>.</div>

                </div>
            </div>

        </div>

        <MediaVisual
            list={list}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
        />

        <div
            style={{
                marginTop: 100,
            }}
        >
            <CoolThings />
        </div>

        <div
            style={{
                marginTop: 100,
            }}
        >
            <LogosCarousel />
        </div>

        {Boolean(0) &&
            <div
                style={{
                    position: 'relative',
                }}
            >
                <div
                    className={styles.BackGold}
                >
                    <div
                        style={{
                            paddingTop: 50,
                            textAlign: 'center',

                        }}
                    >
                        <div

                        >
                            <div style={{
                                fontSize: 40,
                                fontFamily: 'Courier New',
                                fontWeight: 800,
                                lineHeight: '64px',
                            }}>
                                Перестань бодаться с чужими роботами в стакане. Создай своего!
                            </div>

                            <p
                                className={styles.Center}
                            >
                                <iframe
                                    style={{
                                        maxWidth: '100%',
                                    }}
                                    width="560"
                                    height="315"

                                    src="https://www.youtube.com/embed/KDUkjg8rC-E?si=IcXj5EonoWRRgEE6"
                                    title=""
                                    frameBorder="0"
                                    allow={'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;' +
                                        'picture-in-picture; web-share'}
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen />
                            </p>

                            <div class="wrapper-zfeOWGLK bannerWrapper-lYFsWV_q">
                                <div class="content-zfeOWGLK bannerContent-lYFsWV_q">
                                    <div class="item-zfeOWGLK">
                                        <div class="block-zfeOWGLK icon-type-circle-zfeOWGLK">
                                            <span class="title-zfeOWGLK bannerTitle-lYFsWV_q">
                                                60M+
                                            </span>
                                        </div>
                                        <p class="description-zfeOWGLK bannerDescription-lYFsWV_q">
                                            Столько трейдеров и инвесторов пользуются нашей платформой.
                                        </p>
                                    </div>
                                    <div class="item-zfeOWGLK">
                                        <div class="block-zfeOWGLK icon-type-top-zfeOWGLK">
                                            <span class="title-zfeOWGLK bannerTitle-lYFsWV_q">
                                                #1
                                            </span>
                                        </div>
                                        <p class="description-zfeOWGLK bannerDescription-lYFsWV_q">
                                            <a href="https://www.tradingview.com/blog/ru/we-are-officially-number-one-in-the-world-25885/" class="colorLink-zfeOWGLK" target="_blank" rel="noreferrer">
                                                Самый популярный в мире сайт</a> в сфере инвестирования.
                                        </p>
                                    </div>
                                    <div class="item-zfeOWGLK">
                                        <div class="block-zfeOWGLK icon-type-star-zfeOWGLK">
                                            <span class="title-zfeOWGLK bannerTitle-lYFsWV_q">
                                                1.5M+
                                            </span>
                                        </div>
                                        <p class="description-zfeOWGLK bannerDescription-lYFsWV_q">
                                            Оценок со средним рейтингом 4.9 у наших мобильных приложений.
                                        </p>
                                    </div>
                                    <div class="item-zfeOWGLK">
                                        <div class="block-zfeOWGLK icon-type-pine-zfeOWGLK">
                                            <span class="title-zfeOWGLK bannerTitle-lYFsWV_q">
                                                10M+
                                            </span>
                                        </div>
                                        <p class="description-zfeOWGLK bannerDescription-lYFsWV_q">
                                            <span>Оригинальных <a href="/scripts/" target="_blank" class="colorLink-zfeOWGLK">
                                                скриптов</a> и <a href="/ideas/" target="_blank" class="colorLink-zfeOWGLK">
                                                    идей</a> от наших пользователей.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        }
    </>;
});

const CoolThings = memo(function CoolThings(props) {
    return <div
        style={{
            padding: '0 10px',
            textAlign: 'center',
        }}
    >
        <div
            className={styles.HeadTitle}
        >
            Нам доверяют <span style={{ whiteSpace: 'nowrap' }}>тысячи инвесторов
            </span> <span style={{ whiteSpace: 'nowrap' }}>по всей России</span>

        </div>

    </div>;
});

const Signals = memo(function s(props) {
    const {
        onNext,
    } = props;

    return <div
        style={{
            padding: 20,
        }}
    >
        <div
            className={styles.MediaHeadTitle}
            style={{
                textAlign: 'left',
            }}
        >
            Взгляни на биржу по-новому
        </div>
        <br />
        <div
            className={styles.SubHeadTitle}
            style={{
                textAlign: 'left',
                marginTop: 0,
            }}
        >
            Забудь о просмотре графиков, трейдов и стаканов.<br />
            Теперь алгоритмы, в режиме реального времени, находят интересующие сигналы со всего рынка.
        </div>
        <br />
        <MediaNextButton
            onNext={onNext}
        />
    </div>;
});

const Robots = memo(function s(props) {
    const {
        onNext,
    } = props;

    return <div
        style={{
            padding: 20,
        }}
    >
        <div
            className={styles.MediaHeadTitle}
            style={{
                textAlign: 'left',
            }}
        >
            Освободи время для творчества
        </div>
        <br />
        <div
            className={styles.SubHeadTitle}
            style={{
                textAlign: 'left',
                marginTop: 0,
            }}
        >
            Создавай уникальных роботов или воспользуйся одним из множества готовых решений.
            В освободившееся время занимайся поиском крутых стратегий,
            а рутину робот возьмёт на себя.

        </div>
        <br />

        <MediaNextButton
            onNext={onNext}
        />
    </div>;
});

const Sandbox = memo(function s(props) {
    const {
        onNext,
    } = props;

    return <div
        style={{
            padding: 20,
        }}
    >
        <div
            className={styles.MediaHeadTitle}
            style={{
                textAlign: 'left',
            }}
        >
            Контролируй риски со старта
        </div>
        <br />
        <div
            className={styles.SubHeadTitle}
            style={{
                textAlign: 'left',
                marginTop: 0,
            }}
        >
            Тестируй роботов в песочнице, не рискуя собственным капиталом.
            Робот будет совершать сделки не выводя их на биржу.
            Так узнаешь доходность, на реальных данных, не потеряв ни рубля.
        </div>
        <br />
        <MediaNextButton
            onNext={onNext}
        />
    </div>;
});

const Research = memo(function s(props) {
    const {
        onNext,
    } = props;

    return <div
        style={{
            padding: 20,
        }}
    >
        <div
            className={styles.MediaHeadTitle}
            style={{
                textAlign: 'left',
            }}
        >
            Присоединяйся к лучшим
        </div>
        <br />
        <div
            className={styles.SubHeadTitle}
            style={{
                textAlign: 'left',
                marginTop: 0,
            }}
        >
            Мы исследуем рынок с помощью алгоритмов.
            Нам помогают ChatGPT и собственные разработки в сфере искусственного интеллекта.<br />
            Нам нужна твоя помощь!
        </div>
        <br />
        <MediaNextButton
            onNext={onNext}
        />
    </div>;
});

const Competition = memo(function s(props) {
    const {
        onNext,
    } = props;

    return <div
        style={{
            padding: 20,
        }}
    >
        <div
            className={styles.MediaHeadTitle}
            style={{
                textAlign: 'left',
            }}
        >
            Узнай возможности робота в бою
        </div>
        <br />
        <div
            className={styles.SubHeadTitle}
            style={{
                textAlign: 'left',
                marginTop: 0,
            }}
        >
            Добавляй робота на соревнования и следи за таблицей участников.
            Это сделает исследования и разработку не только более эффективной и интересной,
            но и позволит сравнить с другими участниками.
        </div>
        <br />
        <MediaNextButton
            onNext={onNext}
        />
    </div>;
});

const Forum = memo(function s(props) {
    const {
        onNext,
    } = props;

    return <div
        style={{
            padding: 20,
        }}
    >
        <div
            className={styles.MediaHeadTitle}
            style={{
                textAlign: 'left',
            }}
        >
            Стучитесь и вам откроют
        </div>
        <br />
        <div
            className={styles.SubHeadTitle}
            style={{
                textAlign: 'left',
                marginTop: 0,
            }}
        >
            Делись опытом, предлагай идеи и задавай вопросы на форуме.
            Наша цель, чтобы любой желающий мог создать робота в пару кликов.
            Вместе мы создадим лучший сайт про алготрейдинг в России.
        </div>
        <br />
        <MediaNextButton
            onNext={onNext}
        />
    </div>;
});

const logos = [
    {
        ticker: 'KZIZP',
    },
    {
        ticker: 'IRKT',
    },
    {
        ticker: 'VSMO',
    },
    {
        ticker: 'UNAC',
    },
    {
        ticker: 'VKCO',
    },
    {
        ticker: 'TTLK',
    },
    {
        ticker: 'MGNT',
    },
    {
        ticker: 'SPBE',
    },
    {
        ticker: 'SVCB',
    },
    {
        ticker: 'KZIZ',
    },
    {
        ticker: 'ETLN',
    },
    {
        ticker: 'KZOSP',
    },
    {
        ticker: 'WUSH',
    },
    {
        ticker: 'GEMC',
    },
    {
        ticker: 'UGLD',
    },
    {
        ticker: 'PHOR',
    },
    {
        ticker: 'HNFG',
    },
    {
        ticker: 'HHRU',
    },
    {
        ticker: 'LNZL',
    },
    {
        ticker: 'SELG',
    },
    {
        ticker: 'TATNP',
    },
    {
        ticker: 'SLAV',
    },
    {
        ticker: 'GTRK',
    },
    {
        ticker: 'PRFN',
    },
    {
        ticker: 'MAGN',
    },
    {
        ticker: 'VTBR',
    },
    {
        ticker: 'CARM',
    },
    {
        ticker: 'RUAL',
    },
    {
        ticker: 'NKHP',
    },

    // {
    //     ticker: 'TGKJ',
    // },
    {
        ticker: 'BANEP',
    },
    {
        ticker: 'OKEY',
    },
    {
        ticker: 'ALRS',
    },
    {
        ticker: 'ELMT',
    },
    {
        ticker: 'MRKP',
    },
    {
        ticker: 'FLOT',
    },
    {
        ticker: 'DIAS',
    },
    {
        ticker: 'TATN',
    },
    {
        ticker: 'ABIO',
    },
    {
        ticker: 'UWGN',
    },
    {
        ticker: 'DVEC',
    },
    {
        ticker: 'RTKM',
    },
    {
        ticker: 'PRMD',
    },
    {
        ticker: 'ZAYM',
    },
    {
        ticker: 'MTSS',
    },
    {
        ticker: 'TGKN',
    },
    {
        ticker: 'TRNFP',
    },
    {
        ticker: 'FEES',
    },
    {
        ticker: 'OBNE',
    },
    {
        ticker: 'PMSB',
    },
    {
        ticker: 'ZILLP',
    },
    {
        ticker: 'MSRS',
    },
    {
        ticker: 'IRAO',
    },
    {
        ticker: 'NSVZ',
    },
    {
        ticker: 'GCHE',
    },
    {
        ticker: 'SNGSP',
    },
    {
        ticker: 'NVTK',
    },
    {
        ticker: 'UNKL',
    },
    {
        ticker: 'NKNC',
    },
    {
        ticker: 'AQUA',
    },
    {
        ticker: 'VRSB',
    },
    {
        ticker: 'MBNK',
    },
    {
        ticker: 'MOEX',
    },
    {
        ticker: 'ROLO',
    },
    {
        ticker: 'OZON',
    },
    {
        ticker: 'OGKB',
    },
    {
        ticker: 'NOMP',
    },
    {
        ticker: 'GLTR',
    },
    {
        ticker: 'KAZTP',
    },
    {
        ticker: 'SNGS',
    },
    {
        ticker: 'CBOM',
    },
    {
        ticker: 'AMEZ',
    },
    {
        ticker: 'TGKBP',
    },
    {
        ticker: 'ABRD',
    },
    {
        ticker: 'PIKK',
    },
    {
        ticker: 'ROSN',
    },
    {
        ticker: 'EUTR',
    },
    {
        ticker: 'TRMK',
    },
    {
        ticker: 'SOFL',
    },
    {
        ticker: 'MRKU',
    },
    {
        ticker: 'BLNG',
    },
    {
        ticker: 'KRKNP',
    },
    {
        ticker: 'CHMF',
    },
    {
        ticker: 'ENPG',
    },
    {
        ticker: 'POLY',
    },
    {
        ticker: 'NKNCP',
    },
    {
        ticker: 'OBNEP',
    },
    {
        ticker: 'UFOSP',
    },
    {
        ticker: 'MRKV',
    },
    {
        ticker: 'LSRG',
    },
    {
        ticker: 'TCSG',
    },
    {
        ticker: 'CNTL',
    },
    {
        ticker: 'VSEH',
    },
    {
        ticker: 'SVAV',
    },
    {
        ticker: 'RTKMP',
    },
    {
        ticker: 'KMAZ',
    },
    {
        ticker: 'KZOS',
    },
    {
        ticker: 'FIXP',
    },
    {
        ticker: 'MGTSP',
    },
    {
        ticker: 'ELFV',
    },
    {
        ticker: 'KLVZ',
    },
    {
        ticker: 'AGRO',
    },
    {
        ticker: 'VEON-RX',
    },
    {
        ticker: 'NTZL',
    },
    {
        ticker: 'GRNT',
    },
    {
        ticker: 'YDEX',
    },
    {
        ticker: 'SMLT',
    },
    {
        ticker: 'BANE',
    },
    {
        ticker: 'AFLT',
    },
    {
        ticker: 'CIAN',
    },
    {
        ticker: 'ORUP',
    },
    {
        ticker: 'SBER',
    },
    {
        ticker: 'GECO',
    },
    {
        ticker: 'MVID',
    },
    {
        ticker: 'PMSBP',
    },
    {
        ticker: 'MSTT',
    },
    {
        ticker: 'MTLR',
    },
    {
        ticker: 'IVAT',
    },
    {
        ticker: 'AKRN',
    },
    {
        ticker: 'MDMG',
    },
    {
        ticker: 'GAZP',
    },
    {
        ticker: 'SBERP',
    },
    {
        ticker: 'LENT',
    },
    {
        ticker: 'BSPB',
    },
    {
        ticker: 'ASTR',
    },
    {
        ticker: 'RKKE',
    },
    {
        ticker: 'LSNG',
    },
    {
        ticker: 'RENI',
    },
    {
        ticker: 'MRKC',
    },
    {
        ticker: 'POSI',
    },
    {
        ticker: 'KROT',
    },
    {
        ticker: 'KAZT',
    },
    {
        ticker: 'SIBN',
    },
    {
        ticker: 'YAKG',
    },
    {
        ticker: 'TGKB',
    },
    {
        ticker: 'KLSB',
    },
    {
        ticker: 'RBCM',
    },
    {
        ticker: 'CHMK',
    },
    {
        ticker: 'RNFT',
    },
    {
        ticker: 'MRKZ',
    },
    {
        ticker: 'APTK',
    },
    {
        ticker: 'QIWI',
    },
    {
        ticker: 'HYDR',
    },
    {
        ticker: 'NLMK',
    },
    {
        ticker: 'BELU',
    },
    {
        ticker: 'LNZLP',
    },
    {
        ticker: 'SFIN',
    },
    {
        ticker: 'FESH',
    },
    {
        ticker: 'RASP',
    },
    {
        ticker: 'NOMPP',
    },
    {
        ticker: 'SGZH',
    },
    {
        ticker: 'LSNGP',
    },
    {
        ticker: 'GMKN',
    },
    {
        ticker: 'LIFE',
    },
    {
        ticker: 'UPRO',
    },
    {
        ticker: 'MRKS',
    },
    {
        ticker: 'MSNG',
    },
    {
        ticker: 'AFKS',
    },
    {
        ticker: 'PLZL',
    },
    {
        ticker: 'LKOH',
    },
    {
        ticker: 'DELI',
    },
    {
        ticker: 'MGKL',
    },
    {
        ticker: 'LEAS',
    },
    {
        ticker: 'UDMN',
    },
    {
        ticker: 'NMTP',
    },
    {
        ticker: 'TGKA',
    },
    {
        ticker: 'CNTLP',
    },
    {
        ticker: 'MTLRP',
    },
    {
        ticker: 'MRKY',
    },
];

const LogoItem = memo(function L(props) {
    const {
        ticker,
        selected,
        setSelected,
        isVisible,
    } = props;

    const onSelected = useCallback(() => {
        setSelected(ticker);
    }, [ticker, setSelected]);

    const isSelected = selected === ticker;

    return <a
        key={ticker}
        href={`/stocks/${ticker}/technical`}
        title={ticker}
        onClick={onSelected}
    >
        <img
            className={styles.CarouselItem + ' ' + (isSelected ? styles.CarouselItemSelected : '')}
            src={`https://opexbot.akamaized.net/logos/${ticker}.png`}
            loading={!isVisible ? 'lazy' : 'auto'}
            alt={ticker}
        />
    </a>;
});

const LogosCarousel = memo(function L(props) {
    const [selected, setSelected] = useState();

    const ref = useRef(null);
    const isVisible = useOnScreen(ref);

    const LogoComponent = useMemo(() => {
        return logos.map(l => {
            const ticker = l.ticker;

            return <LogoItem
                key={ticker}
                ticker={ticker}
                selected={selected}
                setSelected={setSelected}
                isVisible={isVisible}
            />;
        });
    }, [setSelected, selected, isVisible]);

    return <div
        ref={ref}
        className={styles.CarouselWrap}
    >
        <div className={styles.Carousel + ' ' + (selected ? styles.Paused : '')}>
            {
                LogoComponent
            }
        </div>

    </div>;
});
