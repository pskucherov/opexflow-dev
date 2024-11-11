const { transliterate } = require('../../../../../common');
const mongo = require('../../../../../db/mongoClient');
const demoDb = mongo.getDemoTable();

const { io, app } = require('../server');

const auth = require('./socketAuth');

console.log(1);

io.of('/api/app')
    .use(auth)
    .on('connection', async socket => { // eslint-disable-line

        console.log(2);

        try {
            const userId = socket?.user?.id;

            socket.on('demo:updateData', async data => {

                console.log('demo:updateData', userId);

                if (!userId) {
                    return;
                }

                const currentData = (await demoDb.getData({
                    name: 'demo',
                })) || null;

                let nextData;
                console.log(currentData);

                if (currentData) {
                    nextData = (currentData?.[0]?.text || 0) + 1;

                    await demoDb.setData({
                        name: currentData?.[0]?.test,
                        data: nextData,
                    });
                }

                socket.emit('demo:updateDataResult', [{
                    test: currentData?.[0]?.test,
                    text: nextData,
                }]);
            });
        } catch (e) {
            console.log(e); // eslint-disable-line
        }
    });
