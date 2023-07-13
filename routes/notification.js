const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');


router.route('/:type')
    .get(notificationController.getNotification)

router.route('/')
    .patch(notificationController.updateNotification)

router.route('/')
    .post(notificationController.insertNotification)
    
    
module.exports = router;