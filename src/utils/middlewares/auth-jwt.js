const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

module.exports = function authJwt(request, response, next) {
  try {
    const authHeader = request.header('authorization');
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, secretKey, async (err, userObject) => {
        if (err) {
          response.status(500).json({
            status: "JWT_INVALID",
            message: err.message
          });
          return;
        }
        next();
      });
    } else {
      response.status(200).json({
        status: "JWT_INVALID",
        message: "Your session has ended. Please login again."
      });
      return;
    }
  } catch (error) {
    response.status(500).json({
      status: "ERROR",
      message: error.message,
    });
    next();
  }
};