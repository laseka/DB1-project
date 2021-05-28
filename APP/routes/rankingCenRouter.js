var express = require('express');
var router = express.Router();

var rankingCenController = require('../controllers/rankingCenController');

router.get('/', rankingCenController.getTable);

module.exports = router;