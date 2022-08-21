const jwt = require("jsonwebtoken")

const secretKey = process.env.JWT_SECRET;

module.exports = function generateAdminUserJwt(name, email, isAdmin) {
  return jwt.sign({ name: name, email: email, isAdmin: isAdmin }, secretKey, { expiresIn: process.env.JWT_EXPIRE });
};
