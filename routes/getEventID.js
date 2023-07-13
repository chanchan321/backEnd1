const express = require('express');
const router = express.Router();
const getEventIDcontroller = require('../controllers/getEventIDcontroller');

router.route('/:eventID')
    .get(getEventIDcontroller.getEventbyID)



module.exports = router;