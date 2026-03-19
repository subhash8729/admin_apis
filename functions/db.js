import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

const client = new MongoClient(process.env.MONGO_URI);

await client.connect();

export const database = client.db('admin_api_database');