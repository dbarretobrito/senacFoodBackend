// controllers/usersController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'chaveSenacFood';

exports.register = async (req, res) => {
  const { name, email, password, is_admin } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    await User.create({ name, email, password, is_admin: is_admin || 0 });
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: user.id, is_admin: user.is_admin },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ message: 'Login bem-sucedido', token });
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    return res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

// 🚀 Função para listar todos os usuários
exports.listUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    return res.status(500).json({ error: 'Erro ao listar usuários' });
  }
};

// Função Miguel
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    console.error('Erro ao buscar usuário por ID:', err);
    return res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

