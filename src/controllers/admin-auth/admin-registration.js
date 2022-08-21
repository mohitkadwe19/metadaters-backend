const adminServices = require('../../services/adminServices');
const validators = require("../../utils/helpers/validator");
const bcrypt = require("bcrypt");


// Create admin user POST Method
const registerAdmin = async (request, response) => {
  try {

    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;
    const isAdmin = request.body.isAdmin;

    const validatorsArray = [
      { fieldName: "name", value: name, type: "string", maxLength: 100, minLength: 2 },
      { fieldName: "email", value: email, type: "email", maxLength: 100, minLength: 4 },
      { fieldName: "Password", value: password, type: "string", maxLength: 200, minLength: 8 },
      { fieldName: "isAdmin", value: isAdmin, type: "boolean", maxLength: 100, minLength: 2 },
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
    };

    //check user exist or not
    const IsUserExist = await adminServices.adminUserByEmail(email);

    if (IsUserExist) {
      response.status(200).json({
        status: "FAILED",
        message: "User already Exist",
      });
      return;
    }

    //hash user entered password
    const hashedUserPassword = bcrypt.hashSync(password, 14);

    // user Object
    userDetails = {
      name,
      email,
      password: hashedUserPassword,
      isAdmin: isAdmin
    }
    // save user details to database
    const result = await adminServices.createAdminUser(userDetails);

    if (result.acknowledged) {
      response.status(200).json({
        status: "SUCCESS",
        message: 'User Registered Successfully',
      });
      return;
    } else {
      response.status(200).json({
        status: "FAILED",
        message: 'User Registration Failed',
      });
      return;
    }


  }
  catch (err) {
    response.status(500).json({
      status: 'ERROR',
      message: err.message
    })
    return;
  }
}


module.exports = registerAdmin
