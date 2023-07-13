const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

router.route('/')
    .patch(employeesController.updateAllEmployees)
    
router.route('/:name')
    .get(employeesController.getAllEmployees)
    

module.exports = router;