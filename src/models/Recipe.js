// models/Recipe.js

const db = require('../database/db');

module.exports = {
  // Função para obter todas as receitas
  async getAll() {
    const query = 'SELECT * FROM recipes';
    return await db.allQuery(query);
  },

 // Função para obter todas as receitas de um usuario
  async getByUserId(user_id) {
    const query = 'SELECT * FROM recipes WHERE user_id = ?';
    return await db.allQuery(query, [user_id]);
  },

  // Função para obter uma receita por ID
  async getById(id) {
    const query = 'SELECT * FROM recipes WHERE id = ?';
    return await db.getQuery(query, [id]);
  },

  // Função para buscar receitas por título
  async findByTitle(title) {
    const query = 'SELECT * FROM recipes WHERE title = ?';
    return await db.getQuery(query, [title]);
  },


  // miguel mudança para criar
  async create({ title, ingredients, steps, category, difficulty, user_id }) {
  const query = `
    INSERT INTO recipes (title, ingredients, steps, category, difficulty, user_id) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  return await db.runQuery(query, [title, ingredients, steps, category, difficulty, user_id]);
},


  // Função para atualizar uma receita
  async update(id, { title, ingredients, steps, category, difficulty }) {
    const query = `
      UPDATE recipes 
      SET title = ?, ingredients = ?, steps = ?, category = ?, difficulty = ? 
      WHERE id = ?
    `;
    return await db.runQuery(query, [title, ingredients, steps, category, difficulty, id]);
  },

  // Função para deletar uma receita
  async delete(id) {
    const query = 'DELETE FROM recipes WHERE id = ?';
    return await db.runQuery(query, [id]);
  }
};
