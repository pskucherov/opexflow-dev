import React, { useCallback, useEffect, useState, memo, useMemo, useRef } from 'react';

import styles from './MediaVisual.module.css';

export const Features = memo(function Features(props) {
    const {
        selectedId,
        setSelectedId,
        list,
    } = props;

    return <div
        style={{
            margin: '70px auto 0',
        }}
        className={styles.NavWrap}
    >
        <div
            className={styles.Navigation}
        >
            {
                list.map((t, k) => {
                    return <div key={k}
                        className={
                            styles.NavButtons + ' ' +
                            (selectedId === t.name ? styles.NavButtonSelected : styles.NavButton)
                        }
                        onClick={() => setSelectedId(t.name)}
                    >
                        <span
                            className={styles.NavText}
                        >
                            {t.title}
                        </span>

                        <span
                            className={styles.NavText}
                            style={{
                                fontWeight: 600,
                                visibility: 'hidden',
                                display: 'flex',
                                height: 0,
                            }}
                        >
                            {t.title}
                        </span>

                    </div>;
                })
            }

        </div>

    </div>;
});

export default memo(function MediaVisual(props) {
    const {
        list,
        selectedId,
        setSelectedId,
        fullScreen = true,
    } = props;

    const result = useMemo(() => list.find(l => l.name === selectedId)?.component ||
        list[0].component,
    [list, selectedId]);

    return <div
        style={{
            position: 'relative',
        }}
        className={styles.MediaWrapAll}
    >
        <div
            className={styles.MediaBack}
        />
        <Features
            setSelectedId={setSelectedId}
            selectedId={selectedId}
            list={list}
        />

        {fullScreen ?
            <div
                className={styles.MediaVisualWrap}
            >

                <div
                    className={styles.MediaVisualSizer}
                >
                    <div
                        className={styles.MediaVisual}
                    >
                        {result}
                    </div>
                </div>
            </div> : result
        }
    </div>;
});

export const MediaNextButton = memo(function n(props) {
    const {
        onNext,
        text = 'Далее',
    } = props;

    return <div
        className={styles.NextLinkWrap}
    >
        <div
            onClick={onNext}
            className={styles.NextLink}
        >
            <span
                className={styles.NextLinkText + ' ' + styles.NavText}
            >
                {text}
            </span>
        </div>
    </div>;
});
