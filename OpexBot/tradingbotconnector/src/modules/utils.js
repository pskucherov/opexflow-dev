const path = require('path');
const fs = require('fs');

/**
 * Устанавливает утреннее время для бирж РФ.
 *
 * @param {Date|String|Number} from
 * @returns
 */
const getFromMorning = from => {
    const f = new Date(Number(from));

    f.setHours(5, 0, 0, 0);

    return f;
};

/**
 * Устанавливает вечернее время для бирж РФ.
 *
 * @param {Date|String|Number} to
 * @returns
 */
const getToEvening = to => {
    const t = new Date(Number(to));

    t.setHours(20, 59, 59, 999);

    return t;
};

/**
 * @copypaste https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync
 *
 * @param {*} targetDir
 * @param {*} param1
 * @returns
 */
const mkDirByPathSync = (targetDir, { isRelativeToScript = false } = {}) => {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : '';
    const baseDir = isRelativeToScript ? __dirname : '.';

    return targetDir.split(sep).reduce((parentDir, childDir) => {
        let curDir = baseDir;

        if (parentDir && childDir) {
            curDir = path.resolve(curDir, parentDir, childDir);
        } else if (parentDir) {
            curDir = path.resolve(curDir, parentDir);
        }

        try {
            fs.mkdirSync(curDir, { recursive: true });

            return curDir;
        } catch (err) {
            if (err.code === 'EEXIST') { // curDir already exists!
                return curDir;
            }

            // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
            if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
                console.log(`EACCES: permission denied, mkdir '${parentDir}'`); // eslint-disable-line no-console
            }

            const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;

            if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
                console.log(JSON.stringify(err)); // eslint-disable-line no-console
            }
        }

        return curDir;
    }, initDir);
};

const clearNullEmpties = obj => {
    const newObj = {};

    Object.entries(obj).forEach(([k, val], i) => {
        const isNotNull = (parseFloat(val) || null) !== null;
        const isObject = val !== null && val.constructor === Object;
        const isEmptyObj = isObject && Object.keys(val).length === 0;

        const result = (isObject && !isEmptyObj && clearNullEmpties(clearNullEmpties(val)));

        if (isObject && !Array.isArray(val)) {
            result && Object.assign(newObj, { [k]: result });
        } else if (isNotNull || Array.isArray(val)) {
            Object.assign(newObj, { [k]: (val) });
        }
    });

    return newObj;
};

module.exports = {
    getFromMorning,
    getToEvening,
    mkDirByPathSync,
    clearNullEmpties,
};
