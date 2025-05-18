// routes/recipes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipesController');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/ensureAuthenticated');


// Rotas públicas
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/user/:user_id', controller.getByUserId);
router.post('/', ensureAuthenticated, controller.create);

// Rotas protegidas (usuário autenticado e admin)
router.delete('/:id', controller.delete);
router.put('/:id', ensureAuthenticated, controller.update);

module.exports = router;
