var express = require('express');
var router = express.Router();

var opinieController = require('../controllers/opinieController');

router.get('/', opinieController.getTable);
router.post('/', opinieController.addOpinia);

module.exports = router;