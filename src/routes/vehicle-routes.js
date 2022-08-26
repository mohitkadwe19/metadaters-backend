const express = require('express');
const router = express.Router();

const ValidateAdminJwtMiddleware = require('..//utils/middlewares/validate-admin-jwt-middleware');
const createVehicle = require('../controllers/vehicles-management/create-vehicle');
const getVehicles = require('../controllers/vehicles-management/get-vehicles');
const updateVehicleWarning = require('../controllers/vehicles-management/update-vehicle-warning');
const getVehicleWarningDetailsForGraph = require('../controllers/vehicles-management/get-vehicle-warning-details-for-graph');
const updateVehicleDetails = require('../controllers/vehicles-management/update-vehicle-details');
const getVehicleDetailsById = require('../controllers/vehicles-management/get-vehicle-details-by-id');


// create vehicle  POST REQUEST
router.post('/create-vehicle', ValidateAdminJwtMiddleware, createVehicle);

// get vehicles  GET REQUEST
router.get('/get-vehicles', ValidateAdminJwtMiddleware, getVehicles);

// update vehicle  PATCH REQUEST
router.patch('/update-vehicle-warning', ValidateAdminJwtMiddleware, updateVehicleWarning);

// get vehicle warning details GET REQUEST
router.get('/get-vehicle-warning-details-for-graph', ValidateAdminJwtMiddleware, getVehicleWarningDetailsForGraph);

// update vehicle warning details PATCH REQUEST
router.patch('/update-vehicle-details', ValidateAdminJwtMiddleware, updateVehicleDetails);

// get vehicle details by id POST REQUEST
router.post('/get-vehicle-details-by-id', ValidateAdminJwtMiddleware, getVehicleDetailsById);


module.exports = router
