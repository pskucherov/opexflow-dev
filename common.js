const crypto = require('crypto');
const path = require('path');

const getPrice = quotation => {
    if (!quotation || typeof quotation !== 'object') {
        return typeof quotation === 'string' ? parseFloat(quotation) : quotation;
    }

    if (quotation.nano) {
        return quotation.units + quotation.nano / 1e9;
    }

    return quotation.units;
};

const median = values => {
    if (!values || values?.length === 0) return 0;

    values.sort(function (a, b) {
        return a - b;
    });

    const half = Math.floor(values.length / 2);

    if (values.length % 2) { return values[half] }

    return (values[half - 1] + values[half]) / 2.0;
};

const isToday = (date1, date2) => date1.toDateString() === date2.toDateString();

const timer = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

const iToCrypto = (i) => {
    const isCrypto = Boolean(i.symbol && !i.isin);
    if (!isCrypto) {
        return i;
    }

    return {
        ...i,
        ticker: i.ticker || i.symbol,
        isin: i.isin || i.symbol,
        name: i.name || `${i.baseAsset} / ${i.quoteAsset}`,
        emptyIcon: true,
        lot: 1,
        isCrypto,
    };
};

const isWeekday = date => {
    const day = new Date(date).getDay();

    return day !== 0 && day !== 6;
};

/**
 * Множественная форма числительных.
 * @param {*} number 
 * @param {*} titles 
 * @returns 
 */
const countForm = (number, titles) => {
    number = Math.abs(number);
    if (Number.isInteger(number)) {
        cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }
    return titles[1];
};


/**
 * Returns string HEX hash of the passed value.
 *
 * @param value
 *
 * @returns {string}
 */
const calculateHash = value => {
    const hash = crypto.createHash('md5');

    hash.update(value);

    return hash.digest('hex');
};

/**
 * Добавляет месяцы к дате.
 * 
 * @param {Number} months
 * @param {?Date} date
 * @returns 
 */
const addMonths = (months, date = new Date()) => {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);

    if (date.getDate() !== d) {
        date.setDate(0);
    }

    return date;
};

const calcChangePerc = (change, lcurrentprice) => {
    return Math.floor(
        (change / (lcurrentprice - change)
        ) * 10000) / 100;
}

const isDebugAuthMode = () => {
    return !!process.env.AUTH;
};

const a = { ' ': '-', "Ё": "YO", "Й": "I", "Ц": "TS", "У": "U", "К": "K", "Е": "E", "Н": "N", "Г": "G", "Ш": "SH", "Щ": "SCH", "З": "Z", "Х": "H", "Ъ": "", "ё": "yo", "й": "i", "ц": "ts", "у": "u", "к": "k", "е": "e", "н": "n", "г": "g", "ш": "sh", "щ": "sch", "з": "z", "х": "h", "ъ": "", "Ф": "F", "Ы": "I", "В": "V", "А": "A", "П": "P", "Р": "R", "О": "O", "Л": "L", "Д": "D", "Ж": "ZH", "Э": "E", "ф": "f", "ы": "i", "в": "v", "а": "a", "п": "p", "р": "r", "о": "o", "л": "l", "д": "d", "ж": "zh", "э": "e", "Я": "Ya", "Ч": "CH", "С": "S", "М": "M", "И": "I", "Т": "T", "Ь": "", "Б": "B", "Ю": "YU", "я": "ya", "ч": "ch", "с": "s", "м": "m", "и": "i", "т": "t", "ь": "", "б": "b", "ю": "yu" };

function transliterate(word) {
    return word.split('').map((char) => {
        return a[char] || (/^([A-Za-z0-9\-]*)$/g.test(char) ? char : '');
    }).join("");
}

module.exports = {
    getPrice,
    median,

    canvasWidth: 320,
    canvasHeight: 50,
    instrumentsFromTime: (to) => new Date(to - (4 * 24 * 3600 * 1000)),

    isToday,

    timer,

    iToCrypto,
    isWeekday,

    countForm,

    addMonths,
    calculateHash,

    calcChangePerc,
    isDebugAuthMode,

    transliterate,
};
