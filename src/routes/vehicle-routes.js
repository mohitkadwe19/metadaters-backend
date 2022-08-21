const express = require('express');
const router = express.Router();

const ValidateAdminJwtMiddleware = require('..//utils/middlewares/validate-admin-jwt-middleware');
const createVehicle = require('../controllers/vehicles-management/create-vehicle');
const getVehicles = require('../controllers/vehicles-management/get-vehicles');
const updateVehicleWarning = require('../controllers/vehicles-management/update-vehicle-warning');

// create vehicle  POST REQUEST
router.post('/create-vehicle', ValidateAdminJwtMiddleware, createVehicle);

// get vehicles  GET REQUEST
router.get('/get-vehicles', ValidateAdminJwtMiddleware, getVehicles);

// update vehicle  PUT REQUEST
router.put('/update-vehicle-warning', ValidateAdminJwtMiddleware, updateVehicleWarning);


module.exports = router
