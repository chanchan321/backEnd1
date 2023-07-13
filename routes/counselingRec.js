const express = require('express');
const router = express.Router();
const counselingrecController = require('../controllers/counselingrecController');

router.route('/')
    .post(counselingrecController.addcounselingRec)
    .patch(counselingrecController.updatecounsellingRec)

router.route('/:lrn')
    .get(counselingrecController.getcounsellingRec)
    


module.exports = router;