const express = require('express');
const router = express.Router();
const eventsDcalendar = require('../controllers/eventsDcalendar');


router.route('/:eventID/:eventName')
    .get(eventsDcalendar.getEventDcalendar)
    

module.exports = router;