var express = require('express');
var router = express.Router();

var zamowienieController = require('../controllers/zamowienieController');

router.get('/', zamowienieController.getTable);
router.post('/', zamowienieController.addZamowienie);

module.exports = router;