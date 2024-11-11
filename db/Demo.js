class Demo {
    constructor(db) {
        this.db = db;
        this.collection = {};

        this.collection = this.db.collection('Demo');

        this.initDemoData();
    }

    async initDemoData() {
        try {
            this.setData({
                name: 'demo',
                data: 1,
            });
        } catch (e) {
            console.log(e);
        }
    }

    async getData(props) {
        const {
            name,
        } = props;

        try {
            return await this.collection.find(
                { test: name },
                {
                    projection: {
                        test: 1,
                        text: 1,
                        _id: 0,
                    }
                }).toArray();
        } catch (e) {
            console.log(e);
        }
    }

    async setData(props) {
        const {
            name,
            data,
        } = props;

        try {
            return this.collection.updateOne(
                {
                    test: name
                },
                {
                    $set: {
                        text: data,
                    },
                },
                { upsert: true },
            );
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = { Demo };
