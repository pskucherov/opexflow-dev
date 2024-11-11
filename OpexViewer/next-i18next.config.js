module.exports = {
    i18n: {
        locales: [
            'ru', 'en',
        ],
        defaultLocale: 'ru',
        localeDetection: true,

        // localePath: './locales',
        localePath:
            typeof window === 'undefined' ?
                require('path').resolve('./public/locales') :
                '/public/locales',
        useDataAttrOptions: true,
    },

    // react: { useSuspense: false },
};
