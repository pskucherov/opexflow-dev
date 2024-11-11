import React, { useCallback, useEffect, useRef, useState } from 'react';

export async function getServerSideProps(props) {
    const { res } = props;

    res.statusCode = 302;
    res.setHeader(
        'Set-Cookie', ['token=deleted; Max-Age=0'],
    );
    res.setHeader(
        'Cache-Control', ['no-cache, must-revalidate'],
    );
    res.setHeader(
        'Pragma', ['no-cache'],
    );
    res.setHeader(
        'Expires', ['Sat, 26 Jul 1997 05:00:00 GMT'],
    );
    res.setHeader('Location', '/');
    res.end();

    return { props: {} };
}

export default function Page(props) {
    return null;
}
