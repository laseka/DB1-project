var express = require('express');
var router = express.Router();

var producentController = require('../controllers/producentController');

router.get('/', producentController.getTable);
router.post('/', producentController.addProducent);

module.exports = router;