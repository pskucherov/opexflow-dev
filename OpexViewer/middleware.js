import { NextResponse } from 'next/server';

// import { v4 as uuid } from 'uuid';

// function csp(req, res) {
//     const nonce = undefined; // = `nonce-${Buffer.from(uuid()).toString('base64').slice(0, 8)}`;
//     const isProduction = process.env.NODE_ENV === 'production';
//     const devScriptPolicy = ['unsafe-eval']; // NextJS uses react-refresh in dev

//     res.headers.append('Content-Security-Policy-Report-Only', [
//         ['default-src', 'self', nonce],
//         ['script-src', 'self', nonce].concat(isProduction ? [] : devScriptPolicy),

//         // ['connect-src', 'self', nonce],
//         // ['img-src', 'self', nonce],
//         ['style-src', 'self', nonce],

//     // ['base-uri',  'self', nonce],
//     // ['form-action', 'self', nonce],
//     ].reduce((prev, [directive, ...policy]) => {
//         return `${prev}${directive} ${policy.filter(Boolean).map(src => `'${src}'`).join(' ')}; `; // eslint-disable-line sonarjs/no-nested-template-literals
//     }, '') +
//     ` report-uri ${process.platform === 'win32' ?
//         'http://o.com' : 'https://opexflow.com'}/api/csp-violation/;`);
// }

export function middleware(req) {
    // csp(req, res);

    return NextResponse.next();
}
