// import { checkSubscribeToChannel } from '../../../OpexBot/tradingbotconnector/src/modules/users/tgbot';

import { isDebugAuthMode } from '../../../common';

const mongo = require('../../../db/mongoClient');
const userDB = mongo.getUsersObject();

export async function getAuthUserParams(props) { // eslint-disable-line
    const { req, res, query } = props;

    const localIsAuth = isDebugAuthMode();

    try {
        const { lang } = req.cookies;
        const { token } = req.cookies;
        let user;

        let decoded;

        if (token || localIsAuth) {
            if (localIsAuth) {
                decoded = {
                    user: {
                        id: '62dea1efd8e2689d5a3f471a',
                        login: 'test',
                    },
                };
            }

            if (decoded?.user?.id) {
                user = await userDB?.findByIdForWeb(decoded.user.id);

                user.demoActivated = true;
                user.activateEndAt = new Date().getTime() + (7 * 24 * 3600000);
            }
        }

        const refLogin = !(user && user._id) && query?.ref;
        const refUserData = await getSignUpData(req, refLogin);

        return user ? {
            ...user,
            _id: user._id.toString(),
            loggedIn: true,
            lang: lang || '',
        } : {
            lang: lang || '',
            loggedIn: false,
            refLogin: refUserData?.refLogin || null,
        };
    } catch (error) {
        return {
            lang: '',
        };
    }
}

export async function getSignUpData(req, refLoginFromUrl) {
    try {
        const { lang } = req.cookies;

        const refLogin = refLoginFromUrl || req.cookies.refLogin;
        const refUser = await userDB?.get(refLogin);

        return refUser ? {
            partnerUserDiscount: refUser.partnerUserDiscount || 0,
            lang: lang || '',
            refLogin: refLogin || null,
        } : {
            lang: lang || '',
        };
    } catch (error) {
        console.log(error); // eslint-disable-line no-console

        return {
            lang: '',
        };
    }
}
