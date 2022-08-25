const db = require('../db/connectDB');
const { ObjectId } = require('mongodb');

// create vehicle service
const createVehicle = async (vehicleDetails) => {
  try {
    const result = await db.get().collection('vehicles').insertOne(vehicleDetails);
    console.log(result);
    return result;
  }
  catch (error) {
    throw error;
  }
};

// get vehicles service
const getVehicles = async () => {
  try {
    const result = await db.get().collection('vehicles').find({}).toArray();
    return result;
  }
  catch (error) {
    throw error;
  }
};

// get vehicle by Id service
const vehicleById = async (Id) => {
  try {
    const result = await db.get().collection('vehicles').findOne({ _id: ObjectId(Id) });
    return result;
  }
  catch (error) {
    throw error;
  }
};

// get vehicle by number service
const vehicleByNumber = async (number) => {
  try {
    const result = await db.get().collection('vehicles').findOne({ number: number });
    return result;
  }
  catch (error) {
    throw error;
  }
};

// update vehicle warning service
const updateVehicleWarning = async (Id, warning) => {
  try {
    const result = await db.get().collection('vehicles').updateOne({ _id: ObjectId(Id) }, { $set: { warning: warning } });
    return result;
  }
  catch (error) {
    throw error;
  }
}

module.exports = {
  createVehicle,
  getVehicles,
  vehicleById,
  vehicleByNumber,
  updateVehicleWarning,
}