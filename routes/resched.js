const express = require('express');
const router = express.Router();
const reschedController = require('../controllers/reschedController');

router.route('/')
    .patch(reschedController.changeDateTime)

    

module.exports = router;