const express = require('express');
const router = express.Router();
const getstudeAccController = require('../controllers/getstudeAccController');


router.route('/:accID')
    .get(getstudeAccController.getstudDetails)

router.route('/')
    .patch(getstudeAccController.editstudDetails)

module.exports = router;