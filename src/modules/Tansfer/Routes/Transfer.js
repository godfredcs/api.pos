const router = require('express').Router();
const Transfer = require('../Controllers/Transfer');

router.get('/', Transfer.getAll);
router.get('/filter', Transfer.getByDate);
router.post('/', Transfer.create);
router.get('/:id', Transfer.get);
router.put('/:id', Transfer.update);
router.delete('/:id', Transfer.delete);

module.exports = router;
