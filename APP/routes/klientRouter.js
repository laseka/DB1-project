var express = require('express');
var router = express.Router();

var klientController = require('../controllers/klientController');

router.get('/', klientController.getTable);
router.post('/', klientController.addKlient);

module.exports = router;