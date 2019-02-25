const router = require('express').Router();
const upload = require('../../services/upload');

// Import middlewares.
const checkAuth = require('../../middlewares/checkAuth');

// Import usersController.
const usersController = require('./Controller');

// Routes.
router.get('/', checkAuth, usersController.getUsers);
router.post('/register', usersController.createUser);
router.post('/login', usersController.login);
router.get('/:id', checkAuth, usersController.showUser);
router.put('/:id', checkAuth, upload.single('profile_image'), usersController.updateUser);
router.delete('/:id', checkAuth, usersController.deleteUser);

module.exports = router;