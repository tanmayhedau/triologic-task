const express = require('express');
const { bulkInsert, insertSingleEmployee, getAllEmployee, getSingleEmployeeById, updateEmployeeById, deleteEmployeeById } = require('../../controllers/employee/employeeController');
const { authenticateAdmin } = require('../../middlewares/authMiddleware');
const router = express.Router();


// bulk insert api
router.post('/bulk-insert', bulkInsert);

// insert single data
router.post('/insert', authenticateAdmin, insertSingleEmployee);

// get all employee data
router.get('/get-all', authenticateAdmin, getAllEmployee);

// get employee data by its id
router.get('/:employeeId', authenticateAdmin, getSingleEmployeeById);

// update employee data by its id
router.put('/:employeeId', authenticateAdmin, updateEmployeeById);

// delete employee data by its id
router.delete('/:employeeId', authenticateAdmin, deleteEmployeeById);


module.exports = router;