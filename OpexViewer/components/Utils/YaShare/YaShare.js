import React, { useEffect, useRef, memo, useState } from 'react';

function YaShare(props) {
    const {
        title,
    } = props;

    const container = useRef();

    useEffect(() => {
        const script = document.createElement('script');

        script.src = 'https://yastatic.net/share2/share.js';
        script.type = 'text/javascript';
        script.async = true;
        container.current.appendChild(script);
    }, []);

    return (
        <div
            style={{
                textAlign: 'center',
                margin: '25px 0',
            }}
        >
            <div
                ref={container}
            >
                <div
                    className="ya-share2"
                    data-copy="extraItem"
                    data-size="l"
                    data-services="telegram,viber,whatsapp,vkontakte,odnoklassniki"
                    data-title={title}
                />
            </div>
        </div >
    );
}

export default memo(YaShare);
