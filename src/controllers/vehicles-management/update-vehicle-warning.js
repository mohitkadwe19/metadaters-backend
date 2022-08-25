const vehicleServices = require('../../services/vehicleServices');
const validators = require("../../utils/helpers/validator");


// update vehicle warning PUT Method
const updateVehicleWarning = async (request, response) => {
  try {

    const id = request.body.id;
    const warning = Number(request.body.warning);

    const validatorsArray = [
      { fieldName: "id", value: id, type: "string", maxLength: 100, minLength: 20 },
      { fieldName: "warning", value: warning, type: "number", maxLength: 100, minLength: 1 },
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
    const IsVehicleExist = await vehicleServices.vehicleById(id);

    if (!!IsVehicleExist === false) {
      response.status(200).json({
        status: "FAILED",
        message: "Vehicle is not Exist",
      });
      return;
    }

    const increaseWarning = IsVehicleExist.warning + warning

    // update Vehicle details to database
    const result = await vehicleServices.updateVehicleWarning(id, increaseWarning);

    if (result.acknowledged === true && result.modifiedCount > 0) {
      response.status(200).json({
        status: "SUCCESS",
        message: 'Vehicle updated Successfully',
      });
      return;
    } else {
      response.status(200).json({
        status: "FAILED",
        message: 'Failed to update vehicle warning',
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


module.exports = updateVehicleWarning;
