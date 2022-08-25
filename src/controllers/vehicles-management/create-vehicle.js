const vehicleServices = require('../../services/vehicleServices');
const validators = require("../../utils/helpers/validator");


// Create vehicle POST Method
const createVehicle = async (request, response) => {
  try {

    const number = request.body.number;
    const location = request.body.location;
    const warning = 0;
    const authority = request.body.authority;
    const mobileNumber = request.body.mobileNumber;

    const validatorsArray = [
      { fieldName: "number", value: number, type: "string", maxLength: 100, minLength: 8 },
      { fieldName: "location", value: location, type: "string", maxLength: 100, minLength: 3 },
      { fieldName: "authority", value: authority, type: "string", maxLength: 100, minLength: 3 },
      { fieldName: "mobileNumber", value: mobileNumber, type: "mobile", maxLength: 10, minLength: 10 },
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

    //check vehicle exist or not
    const IsVehicleExist = await vehicleServices.vehicleByNumber(number);

    if (!!IsVehicleExist) {
      response.status(200).json({
        status: "FAILED",
        message: "Vehicle already Exist",
      });
      return;
    }

    // Vehicle Object
    vehicleDetails = {
      number,
      location,
      authority,
      warning,
      mobileNumber
    }

    // save Vehicle details to database
    const result = await vehicleServices.createVehicle(vehicleDetails);

    if (result.acknowledged === true) {
      response.status(200).json({
        status: "SUCCESS",
        message: 'Vehicle Registered Successfully',
      });
      return;
    } else {
      response.status(200).json({
        status: "FAILED",
        message: 'Vehicle Registration Failed',
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


module.exports = createVehicle;
