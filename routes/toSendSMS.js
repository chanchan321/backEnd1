const express = require('express');
const router = express.Router();
const toSendSMSController = require('../controllers/toSendSMSController');

router.route('/')
    .post(toSendSMSController.postSendSMS)

module.exports = router;