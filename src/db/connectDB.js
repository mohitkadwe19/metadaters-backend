const { MongoClient } = require("mongodb");

let connection = null;

// Connection URI
const uri = process.env.MONGO_URI;

// optional options for MongoClient

const options = {
  keepAlive: true,
  minPoolSize: 0,
  maxPoolSize: 10,
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Create a new MongoClient
const MongoDBClient = new MongoClient(uri, options);

module.exports.connectDB = async () => {
  try {
    const client = await MongoDBClient.connect();
    const db = client.db("Metadaters");
    console.log("Connected to MongoDB successfully 🟢");
    connection = db;
    return db;
  } catch (err) {
    console.log(err);
    MongoDBClient.close();
    return null;
  }
};

module.exports.get = () => {
  if (!connection) {
    throw new Error('Call Connect First...');
  }
  return connection;
}

module.exports.close = () => {
  if (!connection) {
    throw new Error('Call Connect First...');
  }
  MongoDBClient.close();
  return;
}

module.exports.uri;
