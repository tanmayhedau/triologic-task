const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../../controllers/admin/adminController');


// register an admin
router.post('/register', registerAdmin);

// loggedIN admin
router.post('/login', loginAdmin);

module.exports = router;