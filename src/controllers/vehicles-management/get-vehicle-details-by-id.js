const vehicleServices = require('../../services/vehicleServices');

const getVehicleDetailsById = async (request, response) => {
  try {

    const id = request.body.id;

    const result = await vehicleServices.vehicleById(id);

    if (!!result) {
      response.status(200).json({
        status: "SUCCESS",
        message: 'Vehicle details fetched Successfully !',
        vehicle: result
      });
      return;

    }
    else {
      response.status(200).json({
        status: "FAILED",
        message: 'Vehicle details fetched Failed !',
        vehicle: {}
      });
      return;

    }

  } catch (error) {
    response.status(500).json({
      status: "ERROR",
      message: error.message,
    });
    return;
  }
};

module.exports = getVehicleDetailsById;