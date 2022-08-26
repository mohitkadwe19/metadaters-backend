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
const updateVehicleWarning = async (Id, warning, updationDate, weight) => {
  try {
    const updatedData = {
      weight: weight,
      creationDate: updationDate,
      warning: true
    }
    const result = await db.get().collection('vehicles').updateOne({ _id: ObjectId(Id) }, { $set: { warning: warning, updationDate: updationDate }, $push: { truckTransaction: updatedData } });
    return result;
  }
  catch (error) {
    throw error;
  }
}

// get vehicles service
const getVehicleWarningDetailsForGraph = async () => {
  try {
    const result = await db.get().collection('vehicles').aggregate(
      [
        {
          '$unwind': {
            'path': '$truckTransaction',
            'includeArrayIndex': 'truck',
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$addFields': {
            'creationDate': '$truckTransaction.creationDate',
            'weight': '$truckTransaction.weight',
            'warning': '$truckTransaction.warning'
          }
        }, {
          '$project': {
            'creationDate': 1,
            'weight': 1,
            'warning': 1,
            '_id': 0
          }
        }
      ]
    ).toArray();
    return result;
  }
  catch (error) {
    throw error;
  }
};


// update vehicle details service
const updateVehicleDetails = async (id, number, location, authority, mobileNumber, warning) => {
  try {
    const result = await db.get().collection('vehicles').aggregate(
      [
        {
          '$match': {
            '_id': new ObjectId(id)
          }
        }, {
          '$set': {
            'warning': warning,
            'updationDate': new Date(),
            'location': location,
            'authority': authority,
            'number': number,
            'mobileNumber': mobileNumber,
          }
        }, {
          '$addFields': {
            'truckTransactions': {
              '$slice': [
                '$truckTransaction', {
                  '$cond': {
                    'if': {
                      '$gt': [
                        {
                          '$size': '$truckTransaction'
                        }, 1
                      ]
                    },
                    'then': {
                      '$subtract': [
                        0, warning
                      ]
                    },
                    'else': {
                      '$subtract': [
                        0, 1
                      ]
                    }
                  }
                }
              ]
            }
          }
        }
      ]
    )
    // updateMany({ _id: ObjectId(id) }, { $set: { number: number, location: location, authority: authority, mobileNumber: mobileNumber, warning: warning } });
    return result;
  }
  catch (error) {
    throw error;
  }
}

// check truckTransaction data service
const checkTruckTransactionData = async (Id, warning, updationDate, weight) => {
  try {
    console.log(typeof weight);
    const result = await db.get().collection('vehicles').aggregate(
      [
        {
          '$match': {
            '_id': Id,
            'truckTransaction.weight': weight,
            'truckTransaction.creationDate': updationDate,
            'truckTransaction.warning': warning
          }
        }
      ]
    ).toArray();
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
  getVehicleWarningDetailsForGraph,
  updateVehicleDetails,
  checkTruckTransactionData
}