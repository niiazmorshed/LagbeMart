import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI as string | undefined;
const dbName = process.env.MONGODB_DB as string | undefined;

let cachedClient: MongoClient | null = null;

async function createClient(): Promise<MongoClient> {
  const options: MongoClientOptions = {
    // You can add driver options here if needed
  };
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }
  const connectionString = uri as string;
  const client = new MongoClient(connectionString, options);
  await client.connect();
  return client;
}

export async function getMongoClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;

  if (process.env.NODE_ENV !== "production") {
    const globalWithMongo = global as typeof global & {
      _mongoClient?: MongoClient;
    };
    if (!globalWithMongo._mongoClient) {
      globalWithMongo._mongoClient = await createClient();
    }
    cachedClient = globalWithMongo._mongoClient;
    return cachedClient;
  }

  cachedClient = await createClient();
  return cachedClient;
}

export async function getDb() {
  if (!dbName) {
    throw new Error("Missing MONGODB_DB environment variable");
  }
  const client = await getMongoClient();
  const databaseName = dbName as string;
  return client.db(databaseName);
}
