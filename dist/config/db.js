import { MongoClient } from 'mongodb';
let client;
let db;
export const connectDb = async () => {
    if (db)
        return db;
    client = new MongoClient(process.env.DB_URL);
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("admin service connected to mongodb");
    return db;
};
