const { errorHandler } = require("../../middlewares/errorMiddleware");
const db = require("../../models");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

// create main model
const Admin = db.admins;


// register the admin
const registerAdmin = async (req, res, next) => {
  try {
    const { name, email_id, password } = req.body;
    // validation
    if (!name || !email_id || !password) {
      throw errorHandler(400, "All fields are mandatory to fill.");
    }

    // check if email is already being used
    const existingAdmin = await Admin.findOne({ where: { email_id: email_id } });
    if (existingAdmin) {
      throw errorHandler(409, "This email id is already been used");
    }

    // hashing the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const admin = await Admin.create({ name, email_id, password: hashedPassword });

    return res.status(201).send({
      success: true,
      message: 'Admin registered successfully',
    });


  } catch (error) {
    next(error);
  }
};


// logged in admin
const loginAdmin = async (req, res, next) => {
  try {
    const { email_id, password } = req.body;
    // validation
    if (!email_id || !password) {
      throw errorHandler(400, "All fields are mandatory to fill.");
    }

    // Check if admin exists with given email id
    const admin = await Admin.findOne({ where: { email_id: email_id } });

    if (!admin) {
      throw errorHandler(404, "Admin not found");
    }

    // Compare password with hashedPassword
    const isPasswordValid = await bcryptjs.compare(password, admin.password);

    if (!isPasswordValid) {
      throw errorHandler(401, "Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id, email_id: admin.email_id }, process.env.JWT_SECRET, {
      expiresIn: '7d' // You can set expiration time as needed
    });

    // Send token in response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token
    });

  } catch (error) {
    next(error);
  }
};


module.exports = { registerAdmin, loginAdmin };