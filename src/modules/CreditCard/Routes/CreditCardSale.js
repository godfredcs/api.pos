const router = require('express').Router();
const CreditCardSale = require('../Controllers/CreditCardSale');

router.get('/', CreditCardSale.getAll);
router.get('/filter', CreditCardSale.getByDate);
router.post('/', CreditCardSale.create);
router.get('/:id', CreditCardSale.get);
router.put('/:id', CreditCardSale.update);
router.delete('/:id', CreditCardSale.delete);

module.exports = router;
