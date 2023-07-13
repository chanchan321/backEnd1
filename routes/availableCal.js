const express = require('express');
const router = express.Router();
const availableCalController = require('../controllers/availableCalController');

router.route('/:date')
    .get(availableCalController.getAvailableCal)
    

module.exports = router;