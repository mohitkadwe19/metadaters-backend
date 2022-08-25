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

// module.exports.connectDB = async () => {
//   try {
//     const client = await MongoDBClient.connect();
//     const db = client.db("Metadaters");
//     console.log("Connected to MongoDB successfully 🟢");
//     connection = db;
//     return db;
//   } catch (err) {
//     console.log(err);
//     MongoDBClient.close();
//     return null;
//   }
// };

module.exports.connectDB = () => new Promise((resolve, reject) => {
  MongoDBClient.connect(function (err, client) {
    if (err) { reject(err); return; };
    const db = client.db('Metadaters');
    resolve(db);
    connection = db;
    console.log("Connected to MongoDB successfully 🟢");
  });
  return connection;
});


module.exports.get = () => {
  if (!connection) {
    throw new Error('Wait for connection to DB');
  }
  return connection;
}

module.exports.close = () => {
  if (!connection) {
    throw new Error('Wait for connection to DB');
  }
  MongoDBClient.close();
  return;
}

module.exports.uri;
