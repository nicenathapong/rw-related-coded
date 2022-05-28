const { MongoClient } = require("mongodb");
const data = require('./data.json');

const MONGO_URI = 'mongodb://154.208.140.242:27017';
const DB_NAME = 'rw-code'

async function insertData() {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DB_NAME);

    await db.collection('hints').insertMany(data).then(console.log);
}

insertData();