const express = require('express');
const router = express.Router();
const getEventsController = require('../controllers/getEventsController');

router.route('/')
    .post(getEventsController.addEvents)
    .patch(getEventsController.editEvents)

router.route('/:date')
    .get(getEventsController.getEvents)

router.route('/:eventID')
    .delete(getEventsController.delEvents)


    

module.exports = router;