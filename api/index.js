import express from 'express';
import config from '../config';
import { MongoClient } from 'mongodb';

let dbCached = null;

async function getDatabase() {
    if (dbCached !== null) return dbCached;
    const client = new MongoClient(config.database.mongoUri);
    await client.connect();
    console.log(`[Database] Connect to database "${config.database.mongoUri}" finish!`)
    dbCached = client.db(config.database.dbName);
    return dbCached;
}

const app = express();

app.get('/hint', async (req, res) => {
    const database = await getDatabase();
    const hint = await database.collection('hints').findOne({ id: req.query.id });
    if (!hint) {
        return res.status(404).json({
            status: 404,
            message: 'ไม่พบคำใบ้ของรหัสนักเรียนนี้'
        })
    }
    res.status(200).json({
        status: 200,
        hint
    });
});

export default {
    path: '/api',
    handler: app
}