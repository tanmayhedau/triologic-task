const express = require('express');
const dotenv = require('dotenv').config();
const db = require('./src/models/index.js');
const adminRouter = require('./src/routes/admin/adminRoute.js');
const employeeRouter = require('./src/routes/employee/employeeRoute.js');
const helmet = require('helmet');
const morgan = require('morgan');



const app = express();



// middlewares
app.use(helmet());     // sets the appropriate security headers to help protect your app from common security vulnerabilities.
app.use(morgan("dev"));  // Concise output format with status codes and response time for development.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/api/admin', adminRouter);
app.use('/api/employee', employeeRouter);


// testing the api
app.get('/', (req, res) => {
  res.json({ message: "Hello world!" });
});


// error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});


const PORT = process.env.PORT || 5000;

// listening the server at port 5000
app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});