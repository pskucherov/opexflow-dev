const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self';
    style-src 'self';
    font-src 'self';  
`;

const isProd = process.env.NODE_ENV === 'production';

// const { i18n } = require('./next-i18next.config');

const securityHeaders = [
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
    },
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
    },
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
    },
    {
        key: 'X-Powered-By',
        value: 'pskucherov',
    },
    {
        key: 'Access-Control-Allow-Origin',
        value: 'https://opexflow.com',
    },
    {
        key: 'Vary',
        value: 'Origin',
    },
    {
        key: 'Cache-Control',
        value: 'private, max-age=30',
    },

    //   {
    //     key: 'Content-Security-Policy',
    //     value: `default-src 'self';`, //ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
    //   }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    distDir: 'build',
    compress: false,
    experimental: { esmExternals: true },
    assetPrefix: isProd ? 'https://opexbot.akamaized.net' : undefined,

    // i18n,
    trailingSlash: false,

    async rewrites() {
        return [

            // {
            //     source: '/instruments/(bluechipsshares|bluechipsfutures|shares|etfs|currencies|crypto)',
            //     destination: '/',
            // },

            // {
            //     source: '/',
            //     destination: '/screener-test',
            // },
            // {
            //     source: '/:sectype',
            //     destination: '/tickers',
            // },

            {
                source: '/robots/:page',
                destination: '/robots?page=:page',
            },

            {
                source: '/robots/:page/:tRobotNameId',
                destination: '/robots?page=:page&tRobotNameId=:tRobotNameId',
            },

            {
                source: '/forum/:category',
                destination: '/forum?category=:category',
            },
            {
                source: '/forum/:category/:name',
                destination: '/forum?category=:category&name=:name',
            },

            {
                source: '/:sectype/:ticker/:page',
                destination: '/tickers/:ticker?sectype=:sectype&page=:page',
            },
            {
                source: '/:sectype/:ticker/:page/:tframe',
                destination: '/tickers/:ticker?sectype=:sectype&page=:page&tframe=:tframe',
            },
        ];
    },

    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: securityHeaders,
            },
        ];
    },

    webpack: function(config, options) {
        // config.experiments = {};

        config.optimization || (config.optimization = {});
        config.optimization.splitChunks = {
            ...config.optimization.splitChunks,
            chunks: 'all',
        };

        config.optimization.providedExports = true;

        return config;
    },
};

module.exports = nextConfig;
