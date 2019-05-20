const router = require('express').Router();
const CreditCardType = require('../Controllers/CreditCardType');

router.get('/', CreditCardType.getAll);
router.get('/filter', CreditCardType.getByDate);
router.post('/', CreditCardType.create);
router.get('/:id', CreditCardType.get);
router.put('/:id', CreditCardType.update);
router.delete('/:id', CreditCardType.delete);

module.exports = router;
