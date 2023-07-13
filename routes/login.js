const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.route('/:uname/:pass')
    .get(loginController.loginAccount)
    

module.exports = router;