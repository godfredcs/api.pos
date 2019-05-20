const router = require('express').Router();
const CreditCardPurchase = require('../Controllers/CreditCardPurchase');

router.get('/', CreditCardPurchase.getAll);
router.get('/filter', CreditCardPurchase.getByDate);
router.post('/', CreditCardPurchase.create);
router.get('/:id', CreditCardPurchase.get);
router.put('/:id', CreditCardPurchase.update);
router.delete('/:id', CreditCardPurchase.delete);

module.exports = router;
