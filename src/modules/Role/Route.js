const router = require('express').Router();
const RoleController = require('./Controller');

router.get('/', RoleController.getAll);
router.post('/', RoleController.create);
router.get('/:id', RoleController.get);
router.put('/:id', RoleController.update);
router.delete('/:id', RoleController.delete);

module.exports = router;
