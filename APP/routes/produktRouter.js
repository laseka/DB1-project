var express = require('express');
var router = express.Router();

var produktController = require('../controllers/produktController');

router.get('/', produktController.getTable);
router.post('/', produktController.addProdukt);
router.post('/:id', produktController.updateProdukt);
router.delete('/:id', produktController.deleteProdukt);

module.exports = router;