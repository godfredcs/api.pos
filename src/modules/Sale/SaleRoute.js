const router = require('express').Router();
const multer = require('multer');
const SaleController = require('./SaleController');

router.get('/', SaleController.getAll);
router.get('/filter', SaleController.getByDate);
router.post('/', SaleController.create);
router.get('/:id', SaleController.get);
router.put('/:id', SaleController.update);
router.delete('/:id', SaleController.delete);

module.exports = router;
