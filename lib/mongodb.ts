import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

if (!dbName) {
  throw new Error("Please define the MONGODB_DB environment variable");
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  console.log("Connecting to MongoDB...");
  const client = new MongoClient(uri);
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
