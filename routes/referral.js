const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');

router.route('/')
    .post(referralController.addReferral)

router.route('/')
    .get(referralController.getReferral)
    

module.exports = router;