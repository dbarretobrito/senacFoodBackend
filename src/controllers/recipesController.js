// controllers/recipesController.js

const Recipe = require('../models/Recipe');

exports.getAll = async (req, res) => {
  try {
    const rows = await Recipe.getAll();
    res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar receitas' });
  }
};

exports.getByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const row = await Recipe.getByUserId(user_id);
    if (!row) return res.status(404).json({ error: 'Receita não encontrada' });
    res.json(row);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar receita' });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const row = await Recipe.getById(id);
    if (!row) return res.status(404).json({ error: 'Receita não encontrada' });
    res.json(row);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar receita' });
  }
};

// Modificada pelo Miguel
exports.create = async (req, res) => {
  const { title, ingredients, steps, category, difficulty } = req.body;
  const user_id = req.user.id;  // vem do middleware

  if (!title || !ingredients || !steps) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    const existingRecipe = await Recipe.findByTitle(title);
    if (existingRecipe) {
      return res.status(400).json({ error: 'Já existe uma receita com esse título' });
    }

    const result = await Recipe.create({ title, ingredients, steps, category, difficulty, user_id });
    res.status(201).json({ message: 'Receita criada com sucesso', id: result.lastID });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao salvar receita' });
  }
};


exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, steps, category, difficulty } = req.body;

  if (!title || !ingredients || !steps) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    const result = await Recipe.update(id, { title, ingredients, steps, category, difficulty });
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Receita não encontrada' });
    }

    res.json({ message: 'Receita atualizada com sucesso' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar receita' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Recipe.delete(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Receita não encontrada' });
    }

    res.json({ message: 'Receita deletada com sucesso' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao deletar receita' });
  }
};
