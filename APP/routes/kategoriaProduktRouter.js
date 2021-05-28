var express = require('express');
var router = express.Router();

var kategoriaProduktController = require('../controllers/kategoriaProduktController');

router.get('/', kategoriaProduktController.getTable);
router.post('/', kategoriaProduktController.addKategoriaProdukt);

module.exports = router;