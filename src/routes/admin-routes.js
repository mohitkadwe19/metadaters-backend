const express = require('express');
const router = express.Router();

const registerAdmin = require('../controllers/admin-auth/admin-registration');
const adminLogin = require('../controllers/admin-auth/admin-login');
const getAdminAuthenticateByJwt = require('../controllers/admin-auth/get-admin-authenticate-by-jwt');
const ValidateAdminJwtMiddleware = require('../utils/middlewares/validate-admin-jwt-middleware');


// Register Admin POST REQUEST
router.post('/register-admin', registerAdmin);

// Admin Login POST REQUEST
router.post('/admin-login', adminLogin);

// Admin Authentication GET REQUESTED
router.get('/get-admin-authenticate-by-jwt', ValidateAdminJwtMiddleware, getAdminAuthenticateByJwt)

// export routes
module.exports = router