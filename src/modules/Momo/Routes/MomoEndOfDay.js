const router = require('express').Router();
const MomoEndOfDay = require('../Controllers/MomoEndOfDay');

router.get('/', MomoEndOfDay.getAll);
router.get('/filter', MomoEndOfDay.getByDate);
router.post('/', MomoEndOfDay.create);
router.get('/:id', MomoEndOfDay.get);
router.put('/:id', MomoEndOfDay.update);
router.delete('/:id', MomoEndOfDay.delete);

module.exports = router;
