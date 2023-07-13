const express = require('express');
const router = express.Router();
const markAsDoneController = require('../controllers/markAsDoneController');

router.route('/')
    .post(markAsDoneController.addcounselingRec)


module.exports = router;