const db = require('../db/connectDB');

// create admin user service
const createAdminUser = async (userDetails) => {
  try {
    const result = await db.get().collection('admins').insertOne(userDetails);
    return result;
  }
  catch (error) {
    throw error;
  }
};

// get admin user by email service
const adminUserByEmail = async (email) => {
  try {
    const result = await db.get().collection('admins').findOne({ email: email })
    return result;
  }
  catch (error) {
    throw error;
  }
};

// get admin user by userId service
const adminUserByUserId = async (userId) => {
  try {
    const result = await db.get().collection('admins').findOne({ userId: userId })
    return result;
  }
  catch (error) {
    throw error;
  }
};


module.exports = {
  createAdminUser,
  adminUserByEmail,
  adminUserByUserId,
}