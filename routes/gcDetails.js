const express = require('express');
const router = express.Router();
const gcDetailsController = require('../controllers/gcDetailsController');


router.route('/:accID')
    .get(gcDetailsController.getgcDetails)
    
router.route('/')
    .patch(gcDetailsController.editgcDetails)
    

module.exports = router;