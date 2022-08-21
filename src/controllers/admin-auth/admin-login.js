const adminServices = require('../../services/adminServices');
const validators = require("../../utils/helpers/validator");
const bcrypt = require("bcrypt");
const generateAdminUserJwt = require("../../utils/helpers/generate-admin-user-jwt-token");


const adminLogin = async (request, response) => {
  try {

    const email = request.body.email;
    const password = request.body.password;

    const validatorsArray = [
      { fieldName: "email", value: email, type: "email", maxLength: 100, minLength: 8 },
      { fieldName: "Password", value: password, type: "string", maxLength: 36, minLength: 8 }
    ];

    const validationResult = validators(validatorsArray);

    //check validations
    if (validationResult.length !== 0) {
      response.status(200).json({
        status: "FAILED",
        message: "Validation Errors",
        validationErrorsList: validationResult
      });
      return;
    }


    //check user exist or not
    const IsUserExist = await adminServices.adminUserByEmail(email);
    if (!IsUserExist) {
      response.status(200).json({
        status: "FAILED",
        message: "Invalid User !",
      });
      return;
    }

    //compare user entered password & password in db
    const compareUserPassword = bcrypt.compareSync(password, IsUserExist.password);

    if (compareUserPassword) {
      let jwtToken = generateAdminUserJwt(IsUserExist.name, IsUserExist.email, IsUserExist.isAdmin);

      const UserDetails = {
        name: IsUserExist.name,
        email: IsUserExist.email,
        isAdmin: IsUserExist.isAdmin,
      }

      if (jwtToken) {
        response.status(200).json({
          status: "LOGIN_SUCCESSFUL",
          message: "Login successful.",
          jwtToken,
          UserDetails
        });
        return;
      }
    } else {
      response.status(200).json({
        status: "FAILED",
        message: "Incorrect Password, Please check your password."
      });
      return;
    }
  } catch (error) {
    response.status(500).json({
      status: "FAILED",
      message: error.message,
    });
    return;
  }
};

module.exports = adminLogin;