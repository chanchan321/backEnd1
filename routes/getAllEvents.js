const express = require('express');
const router = express.Router();
const getAllEventsController = require('../controllers/getAllEventsController');

router.route('/')
    .get(getAllEventsController.getAllEvents)
    

module.exports = router;