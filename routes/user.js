const express = require('express');
const UserController = require('../controlmethod/userController.js'); 
const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.delete('/:userId', UserController.deleteUser);

module.exports = router;
