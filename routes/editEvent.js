const express = require('express');
const router = express.Router();
const editeventController = require('../controllers/editeventController');

router.route('/')
    .patch(editeventController.editevent)


module.exports = router;