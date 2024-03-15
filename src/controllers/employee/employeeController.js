const { errorHandler } = require("../../middlewares/errorMiddleware");
const db = require("../../models");
const XLSX = require('xlsx');


// create main model
const Employee = db.employees;

// insert sample data in bulk
module.exports.bulkInsert = async (req, res, next) => {
  // Read the Excel file
  const workbook = XLSX.readFile('sample_data.xlsx');
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  const mappedData = data.map(row => ({
    name: row.Name,
    company_name: row['Company Name'],
    designation: row.Designation,
    email_id: row['Email ID']
  }));
  try {
    // Insert data
    await Employee.bulkCreate(mappedData);

    console.log('Data inserted successfully!');
    return res.status(200).send('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
    next(error);
  }
};


// insert single data
module.exports.insertSingleEmployee = async (req, res, next) => {
  try {
    const { name, company_name, designation, email_id } = req.body;

    // validation
    if (!name || !company_name || !designation || !email_id) {
      throw errorHandler(400, "All fields are mandatory to fill.");
    }

    // check if email is already being used
    const existingAdmin = await Employee.findOne({ where: { email_id: email_id } });
    if (existingAdmin) {
      throw errorHandler(409, "This email id is already been used");
    }

    const employee = await Employee.create({ name, company_name, designation, email_id });

    return res.status(201).send({
      success: true,
      message: 'Employee data inserted successfully',
      data: employee
    });

  } catch (error) {
    next(error);
  }
};


// get all employee data
module.exports.getAllEmployee = async (req, res, next) => {
  try {
    const allEmployee = await Employee.findAll({});
    if (!allEmployee) {
      throw errorHandler(404, "Employee not found");
    }

    return res.status(200).send({
      success: true,
      message: "Fetched total employee data",
      totalCount: allEmployee.length,
      data: allEmployee
    });
  } catch (error) {
    next(error);
  }
};


// get employee data by id
module.exports.getSingleEmployeeById = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    if (!employeeId) {
      throw errorHandler(400, "Employee Id is missing from params");
    }

    const employee = await Employee.findOne({ where: { id: employeeId } });
    if (!employee) {
      throw errorHandler(404, "Employee not found")
    }
    return res.status(200).send({
      success: true,
      message: "Fetched employee data",
      data: employee
    });

  } catch (error) {
    next(error);
  }
};


// update employee by id
module.exports.updateEmployeeById = async (req, res, next) => {
  try {
    const { name, company_name, designation, email_id } = req.body;
    const { employeeId } = req.params;

    // validation
    if (!employeeId) {
      throw errorHandler(400, "Employee Id is missing from params");
    }

    // Check if the employee exists
    const existingEmployee = await Employee.findOne({ where: { id: employeeId } });
    if (!existingEmployee) {
      throw errorHandler(404, "Employee not found");
    }

    const updatedEmployee = await Employee.update({ name, company_name, designation, email_id }, { where: { id: employeeId } });

    return res.status(200).send({
      success: true,
      message: 'Employee data updated successfully',
    });

  } catch (error) {
    next(error);
  }
};


// delete employee by id
module.exports.deleteEmployeeById = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    // validation
    if (!employeeId) {
      throw errorHandler(400, "Employee Id is missing from params");
    }

    // Check if the employee exists
    const existingEmployee = await Employee.findOne({ where: { id: employeeId } });
    if (!existingEmployee) {
      throw errorHandler(404, "Employee not found");
    }

    const deletedEmployee = await Employee.destroy({ where: { id: employeeId } });
    return res.status(200).send({
      success: true,
      message: 'Employee data deleted successfully'
    });

  } catch (error) {
    next(error);
  }
};

