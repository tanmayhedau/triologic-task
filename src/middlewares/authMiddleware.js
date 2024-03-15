const jwt = require("jsonwebtoken");
const { errorHandler } = require("./errorMiddleware");
const db = require("../models");


const Admin = db.admins;


const authenticateAdmin = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers["authorization"].split(' ')[1];

    // Check if token is provided
    if (!token) {
      throw errorHandler(401, "Access denied. No token provided.");
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch admin details from the database using the decoded token
    const admin = await Admin.findByPk(decoded.id);

    // Check if admin exists
    if (!admin) {
      throw errorHandler(401, "Access denied. Invalid token.");
    }

    // Attach admin information to the request object for further use
    req.admin = admin;

    // Proceed to the next middleware
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticateAdmin };