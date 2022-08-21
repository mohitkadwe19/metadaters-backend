
const getAdminAuthenticateByJwt = async (request, response, next) => {
  try {

    const UserDetails = {
      name: request.name,
      email: request.email,
      isAdmin: request.isAdmin,
    }

    response.status(200).json({
      status: "SUCCESS",
      message: 'Admin Verified Successfully ✅!',
      UserDetails
    });
    next();

  } catch (error) {
    response.status(500).json({
      status: "ERROR",
      message: error.message,
    });
    next();
  }
};

module.exports = getAdminAuthenticateByJwt;