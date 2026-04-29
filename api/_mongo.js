const { MongoClient } = require('mongodb');

let clientPromise;

async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB_NAME || 'portfolio';
  return client.db(dbName);
}

module.exports = { getDb };
