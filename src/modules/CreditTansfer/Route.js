const router = require('express').Router();
const CreditTransferController = require('./Controller');

router.get('/', CreditTransferController.getAll);
router.get('/filter', CreditTransferController.getByDate);
router.post('/', CreditTransferController.create);
router.get('/:id', CreditTransferController.get);
router.put('/:id', CreditTransferController.update);
router.delete('/:id', CreditTransferController.delete);

module.exports = router;
