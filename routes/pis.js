const express = require('express');
const router = express.Router();
const pisController = require('../controllers/pisController');

router.route('/')
    .patch(pisController.updatePIS)
    .post(pisController.addPIS)
    
    
router.route('/:id')
    .get(pisController.getAllPIS)
    


module.exports = router;