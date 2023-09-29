const express = require('express');
const UserController = require('../controlmethod/userController.js'); 
const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/:userId', UserController.getUserById);

module.exports = router;