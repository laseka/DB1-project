var express = require('express');
var router = express.Router();

var liczbaProduktowKategoria = require('../controllers/liczbaProduktowKategoriaController');

router.get('/', liczbaProduktowKategoria.getTable);

module.exports = router;