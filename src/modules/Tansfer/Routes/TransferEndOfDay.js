const router = require('express').Router();
const TransferEndOfDay = require('../Controllers/TransferEndOfDay');

router.get('/', TransferEndOfDay.getAll);
router.get('/filter', TransferEndOfDay.getByDate);
router.post('/', TransferEndOfDay.create);
router.get('/:id', TransferEndOfDay.get);
router.put('/:id', TransferEndOfDay.update);
router.delete('/:id', TransferEndOfDay.delete);

module.exports = router;
