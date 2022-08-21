require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const { connectDB } = require('./src/db/connectDB');
const adminRouter = require('./src/routes/admin-routes');
const vehicleRouter = require('./src/routes/vehicle-routes');

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//connect to db
connectDB();

app.get('/', function (req, res) {
  res.send('Hello World! 🚀 🚀 🚀');
  return;
});

// routes
app.use('/', adminRouter);
app.use('/', vehicleRouter);

const server = app.listen(
  PORT, () => {
    console.log(`🟢 Server is running on port ${PORT} 🚀`)
  }
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1))
});