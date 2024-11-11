const getLink = (locale, url) => {
    return url;

    // if (!locale || locale.toLowerCase() === 'en') {
    //     return url;
    // }

    // return '/' + locale + url;
};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Формирует случайный промежуток размером в сутки.
 *
 * @param {*} min
 * @param {*} max
 * @returns
 */
const getRandomDayByMinMax = (min, max) => {
    const dayTime = 3600000 * 24;

    if ((max - dayTime - min + dayTime) > dayTime) {
        const time = getRandomInt(min + dayTime, max - dayTime);
        const from = new Date(time);
        const to = new Date(time);

        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);

        return {
            from: from.getTime(),
            to: to.getTime(),
        };
    }
};

const translit = word => {
    const w = word?.toLowerCase();

    if (!w) {
        return word;
    }

    let answer = '';
    const converter = {
        а: 'a', б: 'b', в: 'v', г: 'g', д: 'd',
        е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
        й: 'y', к: 'k', л: 'l', м: 'm', н: 'n',
        о: 'o', п: 'p', р: 'r', с: 's', т: 't',
        у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch',
        ш: 'sh', щ: 'sch', ь: '', ы: 'y', ъ: '',
        э: 'e', ю: 'yu', я: 'ya',
    };

    for (let i = 0; i < w.length; ++i) {
        if (typeof converter[w[i]] === 'undefined') {
            answer += w[i];
        } else {
            answer += converter[w[i]];
        }
    }

    return answer;
};

export {
    translit,
    getLink,
    getRandomInt,
    getRandomDayByMinMax,
};
