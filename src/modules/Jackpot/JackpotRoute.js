const router = require('express').Router();
const multer = require('multer');
const JackpotController = require('./JackpotController');

router.get('/', JackpotController.getAll);
router.get('/filter', JackpotController.getByDate);
router.post('/', JackpotController.create);
router.get('/:id', JackpotController.get);
router.put('/:id', JackpotController.update);
router.delete('/:id', JackpotController.delete);

module.exports = router;