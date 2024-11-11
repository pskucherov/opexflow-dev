const mongo = require('mongodb');

class Users {
    constructor(db) {
        this.db = db;
        this.init();
    }

    init() {
        this.collection = this.db.collection('Users');
        this.collection.createIndex({ login: 1 }, { unique: true });

        this.addTestUser();
    }

    async addTestUser() {
        if (!(await this.get('test'))) {
            try {
                this.collection.insertOne({
                    _id: new mongo.ObjectId('62dea1efd8e2689d5a3f471a'),
                    login: 'test',
                })
            } catch (e) {
                // console.log(e);
            }
        }
    }

    async get(login) {
        return await this.collection.findOne({ login });
    }
}

module.exports = { Users };
