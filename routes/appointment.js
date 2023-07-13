const express = require('express');
const router = express.Router();
const addAppointmentController = require('../controllers/addAppointmentController');

router.route('/')
    .post(addAppointmentController.addAppointmentReq)
    .patch(addAppointmentController.editAppointmentReq)
router.route('/:id')
    .delete(addAppointmentController.deleteAppointmentReq)
    

router.route('/:lrn')
    .get(addAppointmentController.getAppointmentReq)
    

module.exports = router;