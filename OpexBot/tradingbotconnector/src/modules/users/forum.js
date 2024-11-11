const { transliterate } = require('../../../../../common');
const mongo = require('../../../../../db/mongoClient');
const forumDb = mongo.getForumTable();

const { io, app } = require('../server');

const auth = require('./socketAuth');

io.of('/api/app').use(auth).on('connection', async socket => { // eslint-disable-line
    try {
        const userId = socket?.user?.id;

        socket.on('forum:newpost', async data => {
            const {
                title,
                category,
                text,
                nonAuthId,
                url,
                prevPostId,
            } = data;

            try {
                const name = title?.trim().substring(0, 1000) || '';
                const cat = category?.trim().substring(0, 1000) || '';
                const message = text?.trim().substring(0, 5000);

                if (!message) {
                    return;
                }

                const ip = socket?.handshake?.address;

                await forumDb.setPost({
                    title: name,

                    tTitle: transliterate(name),
                    category: cat,

                    userId,
                    nonAuthId,
                    message,

                    prevPostId,
                    url,
                    ip,
                });
            } catch (e) {
                console.log(e); // eslint-disable-line
            }

            socket.emit('forum:newpostResult', {
                url,
                needModerate: userId ? 0 : 1,
            });
        });

        socket.on('forum:getPosts', async data => {
            const {
                url,
            } = data;

            try {
                const posts = await forumDb.getPosts({ url });

                socket.emit('forum:getPostsResult:' + url, {
                    posts,
                });
            } catch (e) {
                console.log(e); // eslint-disable-line
            }
        });
    } catch (e) {
        console.log(e); // eslint-disable-line
    }
});
