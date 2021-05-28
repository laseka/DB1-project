var express = require('express');
var router = express.Router();

var kurierController = require('../controllers/kurierController');

router.get('/', kurierController.getTable);
router.post('/', kurierController.addKurier);

module.exports = router;