const mongo = require('mongodb');

class Forum {
    constructor(db) {
        this.db = db;
        this.collection = {};

        this.collection = this.db.collection('Forum');
        this.collection.createIndex({ ticker: 1, createdAt: 1 });

        this.collection.createIndex({
            category: 1,
            tTitle: 1,
        });

        this.collection.createIndex({ userId: 1 });
        this.collection.createIndex({ url: 1, moderate: 1, createdAt: 1 });
        this.collection.createIndex({ moderate: 1 });
        this.collection.createIndex({ ticker: 1, isChatGPT: 1, createdAt: 1 });
    }

    async getChatGptPost(props) {
        const {
            ticker,
        } = props;

        try {
            const data = await this.collection.find({
                ticker,
                isChatGPT: true,
            }).sort({
                createdAt: -1,
            }).limit(1).toArray();

            if (data?.length) {
                return {
                    isChatGPT: true,
                    createdAt: data[0].createdAt,
                    message: data[0].message,
                };
            }
        } catch (e) {
            console.log(e); // eslint-disable-line
        }
    }

    async getCategoryPosts(props) {
        try {
            const {
                category,
                isForAdmin,
            } = props;

            const find = {
                moderate: 1,
                isChatGPT: false,
                category,
            };

            const projection = isForAdmin ? undefined : {
                projection: {
                    userId: 1,
                    createdAt: 1,
                    category: 1,
                    title: 1,
                    tTitle: 1,
                    likes: 1,
                    message: 1,
                    ticker: 1,
                    signalId: 1,
                    prevPostId: 1,
                    url: 1,
                    isChatGPT: 1,
                },
            };

            return (await this.collection
                .find(find, projection)
                .sort({
                    createdAt: -1,
                }).toArray())?.map(s => {
                return {
                    ...s,
                    _id: s._id.toString(),
                    userId: s.userId?.toString() || null,
                    prevPostId: s.prevPostId?.toString() || null,
                };
            });
        } catch (e) {
            console.log(e); // eslint-disable-line
        }
    }

    async getIndexPosts(props) {
        try {
            const {
                categories,
                isForAdmin,
            } = props;

            const projection = isForAdmin ? undefined : {
                projection: {
                    userId: 1,
                    createdAt: 1,
                    category: 1,
                    title: 1,
                    tTitle: 1,
                    likes: 1,
                    message: 1,
                    ticker: 1,
                    signalId: 1,
                    prevPostId: 1,
                    url: 1,
                    isChatGPT: 1,
                },
            };

            const result = {};

            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];

                const find = {
                    moderate: 1,
                    isChatGPT: false,
                    category,
                };

                result[category] = (await this.collection
                    .find(find, projection)
                    .sort({
                        createdAt: -1,
                    })
                    .limit(10)
                    .toArray())?.map(s => { // eslint-disable-line
                    return {
                        ...s,
                        _id: s._id.toString(),
                        userId: s.userId?.toString() || null,
                        prevPostId: s.prevPostId?.toString() || null,
                    };
                });
            }

            return result;
        } catch (e) {
            console.log(e); // eslint-disable-line
        }
    }

    async getPosts(props) {
        try {
            const {
                ticker,
                url,
                isForAdmin,

                category,
                name,
            } = props;

            const find = {
                moderate: 1,
                isChatGPT: false,
            };

            if (ticker) {
                find.ticker = ticker;
            }
            if (url) {
                find.url = url;
            }

            // find.$or = [
            //     { moderate: 1 },
            //     { isChatGPT: true },
            // ];

            if (category) {
                find.category = category;
            }

            if (name) {
                find.tTitle = name;
            }

            const projection = isForAdmin ? undefined : {
                projection: {
                    userId: 1,
                    createdAt: 1,
                    category: 1,
                    title: 1,
                    tTitle: 1,
                    likes: 1,
                    message: 1,
                    ticker: 1,
                    signalId: 1,
                    prevPostId: 1,
                    url: 1,
                    isChatGPT: 1,
                },
            };

            return (await this.collection
                .find(find, projection)
                .sort({
                    createdAt: -1,
                })
                .toArray())?.map(s => { // eslint-disable-line
                return {
                    ...s,
                    _id: s._id.toString(),
                    userId: s.userId?.toString() || null,
                    prevPostId: s.prevPostId?.toString() || null,
                };
            });
        } catch (e) {
            console.log(e); // eslint-disable-line
        }
    }

    async setPost(props) {
        try {
            const {
                userId,
                nonAuthId,
                message,
                ticker,
                prevPostId,
                isChatGPT,
                signalId,
                url,
                ip,
                title,
                tTitle,
                category,
            } = props;

            if (!message.length) {
                return;
            }

            const data = {
                userId: userId && new mongo.ObjectId(userId) || null,
                title,
                tTitle,
                category,
                createdAt: Date.now(),
                likes: 0,
                isDeleted: false,
                isChatGPT: isChatGPT || false,
                message: message.length > 5000 ?
                    message.substring(0, 5000) : message,
                ticker,
                signalId,
                url,
                moderate: userId ? 1 : 0,
                ip,
            };

            if (!userId) {
                data.nonAuthId = nonAuthId;
            }

            if (prevPostId) {
                data.prevPostId = new mongo.ObjectId(prevPostId);
            }

            return await this.collection.insertOne(data);
        } catch (e) {
            console.log(e); // eslint-disable-line
        }
    }
}

module.exports = { Forum };
