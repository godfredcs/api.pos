const router = require('express').Router();
const CreditCardController = require('./Controller');

router.get('/', CreditCardController.getAll);
router.get('/filter', CreditCardController.getByDate);
router.post('/', CreditCardController.create);
router.get('/:id', CreditCardController.get);
router.put('/:id', CreditCardController.update);
router.delete('/:id', CreditCardController.delete);

module.exports = router;