const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const adminServices = require('../../services/adminServices');

const ValidateAdminJwtMiddleware = async (request, response, next) => {
  try {
    const authHeader = request.header('authorization');

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, secretKey, async (err, userObject) => {
        if (err) {
          response.status(500).json({
            status: "ERROR",
            message: err.message
          });
          return;
        } else {

          request.name = userObject.name;
          request.email = userObject.email;
          request.isAdmin = userObject.isAdmin;

          // check if user exists
          const doesUserExist = await adminServices.adminUserByUserId(request.userId);

          if (!!doesUserExist === false) {
            response.status(500).json({
              status: "JWT_INVALID",
              message: "Your session has ended. Please login again."
            });
            return;
          }
        }
        next();
      });
    } else {
      response.status(500).json({
        status: "JWT_INVALID",
        message: "Your session has ended. Please login again."
      });
      return;
    }
  } catch (error) {
    console.log("error: ", error);
    response.status(500).json({
      status: "ERROR",
      message: error.message
    });
    next();
  }
};

module.exports = ValidateAdminJwtMiddleware;