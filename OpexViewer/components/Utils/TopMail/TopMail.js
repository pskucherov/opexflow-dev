import React, { useEffect, useRef, memo, useState } from 'react';

function TopMail() {
    const container = useRef();

    useEffect(() => {
        const script = document.createElement('script');

        script.type = 'text/javascript';
        script.async = true;

        script.innerHTML = `var _tmr = window._tmr || (window._tmr = []);
        _tmr.push({id: "3515437", type: "pageView", start: (new Date()).getTime()});
        (function (d, w, id) {
if (d.getElementById(id)) return;
        var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
        ts.src = "https://top-fwz1.mail.ru/js/code.js";
        var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
        if (w.opera == "[object Opera]") {d.addEventListener("DOMContentLoaded", f, false); } else {f(); }
})(document, window, "tmr-code");`;

        container.current.appendChild(script);
    }, []);

    return (
        <>
            <noscript><div><img src="https://top-fwz1.mail.ru/counter?id=3515437;js=na" style={
                {
                    position: 'absolute',
                    left: '-9999px',
                }
            } alt="Top.Mail.Ru" /></div></noscript>
            <div
                ref={container}
            />
        </>
    );
}

export default memo(TopMail);
