import { Html, Head, Main, NextScript } from 'next/document';
import fs from 'fs';
import path from 'path';

const files = {};

let _getRequireWildcardCache = () => {
    if (typeof WeakMap !== 'function') return null;
    const cache = new WeakMap();

    _getRequireWildcardCache = () => {
        return cache;
    };

    return cache;
};

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== 'object' && typeof obj !== 'function') {
        return {
            default: obj,
        };
    }
    const cache = _getRequireWildcardCache();

    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    const newObj = {};
    const hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }

    return newObj;
}

const _react = _interopRequireWildcard(require('react'));

class NextHead extends Head {
    makeStylesheetInert(node) {
        const n = super.makeStylesheetInert(node);

        const preload = n.filter(n => n?.props?.rel === 'preload');
        const css = n.filter(n => n?.props?.rel !== 'preload');

        const {
            isDevelopment,
            disableOptimizedLoading,
            crossOrigin } = this.context;

        const fileToJs = [];
        const inlineCss = [];
        const preloadKeys = [];

        for (let i = 0; i < css.length; i++) {
            const c = css[i];

            if (!files[c.key]) {
                const { size } = fs.statSync(path.resolve(__dirname, '../../static', c.key.replace('$static', ''))) || {};

                files[c.key] = { size };
            }

            if (files[c.key].size < 25000) {
                if (!files[c.key].content) {
                    files[c.key].content = fs.readFileSync(path.resolve(__dirname, '../../static', c.key.replace('$static', ''))).toString();
                }
                inlineCss.push(
                    _react.default.createElement('style', {
                        key: 'cssInlineStyleSheets' + c.key,
                        nonce: this.props.nonce,
                        dangerouslySetInnerHTML: {
                            __html: files[c.key].content,
                        },
                    }),
                );
            } else {
                preloadKeys.push(c.key + '-preload');
                fileToJs.push(c);
            }
        }

        let js;

        if (fileToJs.length) {
            js = _react.default.createElement('script', {
                key: 'cssLoadAsyncStyleSheets',
                nonce: this.props.nonce,
                async: !isDevelopment && disableOptimizedLoading,
                defer: !disableOptimizedLoading,
                crossOrigin: this.props.crossOrigin || crossOrigin,
                dangerouslySetInnerHTML: {
                    __html: `var isCssLoaded = false; function loadAsyncStyleSheets() { if (isCssLoaded) { return; } isCssLoaded = true; var asyncStyleSheets = [${fileToJs.map(c => Boolean(c?.props?.href) && "'" + c?.props?.href + "'").filter(Boolean).join(',')}]; for (var i = asyncStyleSheets.length - 1; i >= 0; i--) { var link = document.createElement('link'); link.setAttribute('rel', 'stylesheet'); link.setAttribute('href', asyncStyleSheets[i]); var head = document.getElementsByTagName("head")[0]; head.insertBefore(link, head.firstChild); }} window.addEventListener('DOMContentLoaded', loadAsyncStyleSheets, false);`, // eslint-disable-line
                },
            });
        }

        return [
            preload.filter(p => preloadKeys.includes(p.key)),
            inlineCss,
            js,
        ].filter(Boolean);
    }
}

function MyDocument() {
    return (
        <Html lang="ru">
            <NextHead />
            <body data-bs-theme="dark">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default MyDocument;
