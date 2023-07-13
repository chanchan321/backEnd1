const express = require('express');
const router = express.Router();
const getCounselingRecControllers = require('../controllers/getCounselingRecControllers');

router.route('/')
    .get(getCounselingRecControllers.getCounseling)
    

module.exports = router;