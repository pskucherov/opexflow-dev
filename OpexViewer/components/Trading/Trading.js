import { useCallback, useEffect, useState } from 'react';
import { FormGroup, Spinner, Button, Modal, ModalHeader, ModalBody, ModalFooter, List, ButtonGroup } from 'reactstrap';
import Link from 'next/link';

import styles from './Trading.module.css';

export default function Trading(props) {
    const { serverUri, routerPush, user } = props;

    useEffect(() => {

    }, []);

    return (
        <div
            style={{
                margin: '30px auto',
                padding: '0 25px',

                // textAlign: 'justify',
                width: 800,
                maxWidth: '100%',
            }}
        >

            <center><h1>Opexbot — ваш надёжный помощник в Тинькофф Инвестиции</h1></center>
            <h2 className={styles.Paragraph} >
                Представьте, что вы можете управлять портфелем и зарабатывать на инвестициях в пару кликов,
                а рутину робот возьмёт на себя.
            </h2>

            <h2 className={styles.Paragraph} >Теперь это возможно.</h2>

            <h1
                className={styles.Paragraph}
            >
                1. Робот анализирует рынок — вы экономите время!
            </h1>

            <a
                href="/images/opexbot/instruments.png"
                target="_blank"
                className={styles.LinkImgCenter}
            >
                <img
                    loading="lazy"
                    src="https://opexbot.akamaized.net/images/opexbot/instruments.png"
                    alt="Тренд акций, фьючерсов и облигаций"
                    className={styles.ImgS}
                />
            </a>
            <div
                style={{
                    // textAlign: 'justify',
                }}
            >
                <h5
                    className={styles.Text}
                >
                    Показан тренд за неделю, предыдущий и последний торговый день. Если рынок заметно растёт или падает,
                    то переходим к следующему шагу.
                </h5>
            </div>

            <h1
                className={styles.Paragraph}
            >
                2. Робот подсвечивает драйверы роста
            </h1>

            <a
                href="/images/opexbot/shares.png"
                target="_blank"
                className={styles.LinkImgCenter}
            >
                <img
                    loading="lazy"
                    src="https://opexbot.akamaized.net/images/opexbot/shares.png"
                    alt="Список отраслей с сортировкой по тренду и торгуемым объёмам"
                    className={styles.ImgS}
                />
            </a>

            <div
                style={{
                    // textAlign: 'justify',
                }}
            >
                <h5
                    className={styles.Text}
                >
                    Если сектор растёт, то это сигнал к покупке. Если сектор падает, но одна из компаний в нём растёт,
                    то это сигнал, что могут быть инсайдерские сделки и стоит рассмотреть к покупке.
                </h5>
            </div>

            <h1
                className={styles.Paragraph}

            >
                3. Топ-тренды акций от робота
            </h1>

            <a
                href="/images/opexbot/volatility.png"
                target="_blank"
                className={styles.LinkImgCenter}
            >
                <img
                    loading="lazy"
                    src="https://opexbot.akamaized.net/images/opexbot/volatility.png"
                    alt="Список акций с сортировкой по тренду и торгуемым объёмам"
                    className={styles.ImgS}
                />
            </a>

            <div
                style={{
                    // textAlign: 'justify',
                }}
            >
                <h5
                    className={styles.Text}
                >
                    Собран актуальный список растущих акций.
                    Добавьте интересующие акции в корзину и переходите к следующему этапу.
                </h5>
            </div>

            <h1
                className={styles.Paragraph}
            >
                4. Робот сэкономит время на покупке пакета акций
            </h1>

            <a
                href="/images/opexbot/cart.png"
                target="_blank"
                className={styles.LinkImgCenter}
            >
                <img
                    loading="lazy"
                    src="https://opexbot.akamaized.net/images/opexbot/cart.png"
                    alt="Корзина с выбранными инструментами, которые можно отбалансировать относительно средств в портфеле."
                    className={styles.ImgS}
                />
            </a>

            <div
                style={{
                    // textAlign: 'justify',
                }}
            >
                <h5
                    className={styles.Text}
                >
                    При покупки портфеля акций укажите объём от портфеля, а количество лотов определится автоматически.
                    Далее, в один клик, вы можете купить собранную корзину акций по лучшей цене.
                </h5>
            </div>

            <h1
                className={styles.Paragraph}
            >
                5. Робот поможет сохранить капитал, максимально ускорив выход из акций
            </h1>

            <a
                href="/images/opexbot/autosell.png"
                target="_blank"
                className={styles.LinkImgCenter}
            >
                <img
                    loading="lazy"
                    src="https://opexbot.akamaized.net/images/opexbot/autosell.png"
                    alt=""
                    className={styles.ImgS}
                />
            </a>

            <div
                style={{
                    // textAlign: 'justify',
                }}
            >
                <h5
                    className={styles.Text}
                >
                    Вы можете продать весь портфель акций по лучшей цене в один клик.
                    Также доступна автоматическая продажа при достижении заданных условий.
                </h5>
            </div>

            <h1
                className={styles.Paragraph}
            >
                6. Поможет оптимизировать торговлю, подсветив затраты на комиссию и реальные результаты
            </h1>

            <a
                href="/images/opexbot/statistic.png"
                target="_blank"
                className={styles.LinkImgCenter}
            >
                <img
                    loading="lazy"
                    src="https://opexbot.akamaized.net/images/opexbot/statistic.png"
                    alt="Пример подробной статистики доходов и расходов"
                    className={styles.ImgS}
                />
            </a>

            <div
                style={{
                    // textAlign: 'justify',
                }}
            >
                <h5
                    className={styles.Text}
                >
                    В opexbot все затраты на торговлю разложены по полочкам с максимальной детализацией.
                    Никакой ручной работы по расчётам в excel.
                </h5>
            </div>

            <h1
                className={styles.Paragraph}
            >
                6. Робот пришлёт состояние портфеля в телеграм по расписанию или по запросу
            </h1>

            <a
                href="/images/opexbot/tgsupport.png"
                target="_blank"
                className={styles.LinkImgCenter} rel="noreferrer"
            >
                <img
                    loading="lazy"
                    src="https://opexbot.akamaized.net/images/opexbot/tgsupport.png"
                    alt=""
                    className={styles.ImgS}
                />
            </a>

            <div
                style={{
                    // textAlign: 'justify',
                }}
            >
                <h5
                    className={styles.Text}
                >
                    Возможно самостоятельно запрограммировать содержимое сообщений.
                </h5>
            </div>

            <h1
                className={styles.Paragraph}
            >
                7. Кэшбек 10% на комиссию в Тинькофф Инвестиции при торговле через OpexBot
            </h1>

            <a
                href="https://www.tinkoff.ru/invest/open-api/"
                target="_blank"
                className={styles.LinkImgCenter} rel="noreferrer"
            >
                <img
                    loading="lazy"
                    src="https://opexbot.akamaized.net/images/opexbot/cachback.png"
                    alt=""
                    className={styles.ImgS}
                />
            </a>

            <div
                style={{
                    // textAlign: 'justify',
                }}
            >
                <h5
                    className={styles.Text}
                >
                    Оптимизируйте налоги и комиссии. Сэкономил — значит заработал.
                </h5>
            </div>

            <h1
                className={styles.Paragraph}
                style={{
                    marginTop: 100,
                }}
            >
                Обзор функциональности OpexBot
            </h1>

            <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/HDtfIdpJpvU?si=sX6YSFBo5jADazpE"
                title="Видеоинструкция OpexBot"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                allowFullScreen="1"
            />

            <br />
            <br />

            <h1
                className={styles.Paragraph}
            >
                Пример работы AutoProfit по закрытию сделок с профитом
            </h1>

            <center>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/fqdEuqa_VsA?si=2Si83HI4W9yGv7uc"
                    title="Как установить и запустить OpexBot"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                />
            </center>

            <br />
            <br />

            <h1
                className={styles.Paragraph}
            >
                Инструкция, как установить и запустить OpexBot
            </h1>
            <center>
                <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/EEroGLmcXwU?si=sgm-4SSbaPXL6Qxr"
                    title="Как установить и запустить OpexBot"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                />
            </center>

            <div
                style={{
                    margin: '100px 0',
                    color: '#0D6EFD',
                    textAlign: 'center',
                    fontSize: 36,
                    fontWeight: 'bold',
                }}
            >
                <a
                    href="https://articles.opexflow.com/strategies/kak-avtomaticheski-sobirat-profit-s-pomoshhyu-torgovogo-robota.htm"
                    alt="Узнать подробнее"
                >
                    Узнать подробнее
                </a>
            </div>

        </div>
    );
}
