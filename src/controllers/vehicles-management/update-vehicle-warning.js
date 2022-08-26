const vehicleServices = require('../../services/vehicleServices');
const validators = require("../../utils/helpers/validator");


// twilio credentials
const accountSid = 'AC5dff5d59dadfd76c9ec91227c0eddbc6';
const authToken = 'f63f7250f0a2921feface36cc73bccda';

const twilio = require("twilio")(accountSid, authToken);


// update vehicle warning PATCH Method
const updateVehicleWarning = async (request, response) => {
  try {

    const number = request.body.number;
    const warning = request.body.warning;
    const updationDate = new Date(request.body.updationDate);
    const weight = Number(request.body.weight);

    const validatorsArray = [
      { fieldName: "number", value: number, type: "string", maxLength: 100, minLength: 8 },
      { fieldName: "warning", value: warning, type: "boolean", maxLength: 5, minLength: 4 },
      { fieldName: "updationDate", value: updationDate, type: "date", maxLength: 5, minLength: 4 },
      { fieldName: "weight", value: weight, type: "number", maxLength: 1000, minLength: 1 },
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

    if (!!IsVehicleExist === false) {
      response.status(200).json({
        status: "FAILED",
        message: "Vehicle is not Exist",
      });
      return;
    }


    if (IsVehicleExist.warning >= 5) {

      // for sending sms
      twilio.messages
        .create({
          from: "+12673991126",
          to: '+91' + IsVehicleExist.mobileNumber,
          body: "This is general reminder for your vehicle .Please clear your vehicle penalties.",
        })
        .then(function (res) { console.log("message has sent!") })
        .catch(function (err) {
          response.status(200).json({
            status: "FAILED",
            message: err.message,
          });
          return;
        })

      // response.status(200).json({
      //   status: "FAILED",
      //   message: "Vehicle has been blocked.",
      // });
      // return;
    }

    const increasedWarning = IsVehicleExist.warning + warning

    // update Vehicle details to database
    const result = await vehicleServices.updateVehicleWarning(IsVehicleExist._id, increasedWarning, updationDate, weight);

    // for sending sms
    twilio.messages
      .create({
        from: "+12673991126",
        to: '+91' + IsVehicleExist.mobileNumber,
        body: `[WARNING] : Your vehicle ${IsVehicleExist.number} seems to be overloaded. Your warnings: ${IsVehicleExist.warning}.`,
      })
      .then(function (res) { console.log("message has sent!") })
      .catch(function (err) {
        response.status(200).json({
          status: "FAILED",
          message: err.message,
        });
        return;
      });

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
