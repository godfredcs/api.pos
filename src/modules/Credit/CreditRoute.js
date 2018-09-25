const router = require('express').Router();
const CreditController = require('./CreditController');

router.get('/', CreditController.getAll);
router.get('/filter', CreditController.getByDate);
router.post('/', CreditController.create);
router.get('/:id', CreditController.get);
router.put('/:id', CreditController.update);
router.delete('/:id', CreditController.delete);

module.exports = router;