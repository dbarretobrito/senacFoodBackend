// routes/users.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/listarUsers', usersController.listUsers);

// Adicione esta linha:
router.get('/:id', usersController.getUserById);

module.exports = router;

