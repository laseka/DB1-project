var express = require('express');
var router = express.Router();

var zamowienieProduktController = require('../controllers/zamowienieProduktController');

router.get('/', zamowienieProduktController.getTable);
router.post('/', zamowienieProduktController.addZamowienieProdukt);

module.exports = router;