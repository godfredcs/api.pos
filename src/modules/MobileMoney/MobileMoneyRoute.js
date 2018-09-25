const router = require('express').Router();
const multer = require('multer');
const MobileMoneyController = require('./MobileMoneyController');

router.get('/', MobileMoneyController.getAll);
router.get('/filter', MobileMoneyController.getByDate);
router.post('/', MobileMoneyController.create);
router.get('/:id', MobileMoneyController.get);
router.put('/:id', MobileMoneyController.update);
router.delete('/:id', MobileMoneyController.delete);

module.exports = router;