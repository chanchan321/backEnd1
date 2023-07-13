const express = require('express');
const router = express.Router();
const forDashboard = require('../controllers/forDashboard');

router.route('/')
    .get(forDashboard.getRecords)
    

module.exports = router;