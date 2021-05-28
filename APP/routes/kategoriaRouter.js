var express = require('express');
var router = express.Router();

var kategoriaController = require('../controllers/kategoriaController');

router.get('/', kategoriaController.getTable);
router.post('/', kategoriaController.addKategoria);

module.exports = router;