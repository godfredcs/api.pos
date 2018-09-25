const router = require('express').Router();
const multer = require('multer');
const FootballController = require('./FootballController');

router.get('/', FootballController.getAll);
router.get('/filter', FootballController.getByDate);
router.post('/', FootballController.create);
router.get('/:id', FootballController.get);
router.put('/:id', FootballController.update);
router.delete('/:id', FootballController.delete);

module.exports = router;