const { MongoClient } = require('mongodb');
const { Users } = require('./Users');
const { Forum } = require('./Forum');
const { Demo } = require('./Demo');

const databaseName = 'opexflow-dev';

class MongoClientHelper {
    constructor() {
        try {
            const uri = 'mongodb://localhost:27017/' + databaseName;

            this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 });

            this.client.connect();
            this.db = this.client.db(databaseName);
            this.Users = new Users(this.db);
            this.Forum = new Forum(this.db);
            this.Demo = new Demo(this.db);
        } catch (e) {
            console.log(e); // eslint-disable-line no-console
        }
    }

    getDb() {
        return this.db;
    }

    getForumTable() {
        return this.Forum;
    }

    getDemoTable() {
        return this.Demo;
    }

    getUsersObject() {
        return this.Users;
    }

}

module.exports = new MongoClientHelper();
