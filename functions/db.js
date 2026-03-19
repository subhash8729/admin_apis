import { MongoClient } from "mongodb";


const uri = 'mongodb+srv://subhashdhaka8729:RM3ODYt1PqKUJcpx@subhash.52lifjh.mongodb.net/?appName=admin_api';
const client = new MongoClient(uri);

await client.connect();

export const database = client.db('admin_api_database');