const router = require('express').Router();
const upload = require('../../services/upload');
const ItemController = require('./Controller');

router.get('/', ItemController.getAll);
router.post('/', upload.single('image'), ItemController.create);
router.get('/:id', ItemController.get);
router.put('/:id', upload.single('image'), ItemController.update);
router.delete('/:id', ItemController.delete);

module.exports = router;