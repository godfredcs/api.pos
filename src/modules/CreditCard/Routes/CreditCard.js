const router = require('express').Router();
const CreditCard = require('../Controllers/CreditCard');

router.get('/', CreditCard.getAll);
router.get('/filter', CreditCard.getByDate);
router.post('/', CreditCard.create);
router.get('/:id', CreditCard.get);
router.put('/:id', CreditCard.update);
router.delete('/:id', CreditCard.delete);

module.exports = router;
