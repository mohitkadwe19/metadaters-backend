const vehicleServices = require('../../services/vehicleServices');

const getVehicleWarningDetailsForGraph = async (request, response) => {
  try {

    const result = await vehicleServices.getVehicleWarningDetailsForGraph();

    if (result.length > 0) {
      response.status(200).json({
        status: "SUCCESS",
        message: 'Vehicle details fetched Successfully !',
        vehicles: result
      });
    }
    else {
      response.status(200).json({
        status: "FAILED",
        message: 'Vehicle details fetched Failed !',
        vehicles: []
      });
    }

  } catch (error) {
    response.status(500).json({
      status: "ERROR",
      message: error.message,
    });
    next();
  }
};

module.exports = getVehicleWarningDetailsForGraph;