const { isDebugAuthMode } = require('../../../../../common');

module.exports = function(req, next) {
    try {
        const localIsAuth = isDebugAuthMode();
        let decoded;

        if (localIsAuth) {
            decoded = {
                user: {
                    id: '62dea1efd8e2689d5a3f471a',
                    login: 'test',
                },
            };
            req.user = decoded.user;

            next();

            return;
        }

        next();
    } catch (e) {
        console.error(e);
    }
};
