const router = require('express').Router();
const MomoStartOfDay = require('../Controllers/MomoStartOfDay');

router.get('/', MomoStartOfDay.getAll);
router.get('/filter', MomoStartOfDay.getByDate);
router.post('/', MomoStartOfDay.create);
router.get('/:id', MomoStartOfDay.get);
router.put('/:id', MomoStartOfDay.update);
router.delete('/:id', MomoStartOfDay.delete);

module.exports = router;
