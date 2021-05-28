var express = require('express');
var router = express.Router();

var zamowieniaInfoController = require('../controllers/zamowieniaInfoController');

router.get('/', zamowieniaInfoController.getTable);

module.exports = router;