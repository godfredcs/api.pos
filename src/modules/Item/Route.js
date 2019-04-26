const router = require('express').Router();
const upload = require('../../services/upload');
const Item = require('./Controller');

router.get('/', Item.all);
router.post('/', upload.single('image'), Item.create);
router.get('/:id', Item.show);
router.put('/:id', upload.single('image'), Item.update);
router.delete('/:id', Item.delete);

module.exports = router;
