const express = require('express');
const router = express.Router();
const getStudController = require('../controllers/getStudController');

router.route('/')
    .get(getStudController.getStud)
    

module.exports = router;