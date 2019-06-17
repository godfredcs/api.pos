const router = require('express').Router();
const TransferStartOfDay = require('../Controllers/TransferStartOfDay');

router.get('/', TransferStartOfDay.getAll);
router.get('/filter', TransferStartOfDay.getByDate);
router.get('/filter_today', TransferStartOfDay.getForToday);
router.post('/', TransferStartOfDay.create);
router.get('/:id', TransferStartOfDay.get);
router.put('/:id', TransferStartOfDay.update);
router.delete('/:id', TransferStartOfDay.delete);

module.exports = router;
