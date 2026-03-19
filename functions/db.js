import { MongoClient } from "mongodb";



const client = new MongoClient(process.env.MONGO_URI);

await client.connect();

export const database = client.db('admin_api_database');