import "server-only";
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error("Mongo URI not found ");
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbName) {
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log(`Connected to ${dbName} database.`);
    return db;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}

export async function getCollection(collectionName) {
  const db = await getDB("next_blog");
  if (db) {
    console.log(`Connected to ${collectionName} collection.`);
    return db.collection(collectionName);
  } else {
    return null;
  }
}
