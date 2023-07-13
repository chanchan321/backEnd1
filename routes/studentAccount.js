const express = require('express');
const router = express.Router();
const studentAccountController = require('../controllers/studentAccountController');


router.route('/')
    .post(studentAccountController.addStudentAcc)
    .patch(studentAccountController.editStudentAcc)
      

module.exports = router;