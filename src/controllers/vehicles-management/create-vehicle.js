const vehicleServices = require('../../services/vehicleServices');
const validators = require("../../utils/helpers/validator");


// Create vehicle POST Method
const createVehicle = async (request, response) => {
  try {

    const number = request.body.number;
    const location = request.body.location;
    const warning = Number(request.body.warning);
    const driver = request.body.driver;

    const validatorsArray = [
      { fieldName: "number", value: number, type: "string", maxLength: 100, minLength: 8 },
      { fieldName: "location", value: location, type: "string", maxLength: 100, minLength: 8 },
      { fieldName: "driver", value: driver, type: "string", maxLength: 100, minLength: 8 },
      { fieldName: "warning", value: warning, type: "number", maxLength: 5, minLength: 1 },
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

    if (IsVehicleExist) {
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
      driver,
      warning
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
