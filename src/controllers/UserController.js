// src/controllers/UserController.js
const prisma = require('../config/db');
const bcrypt = require('bcryptjs');

module.exports = {
  // 1. CADASTRAR USUÁRIO
  async create(req, res) {
    try {
      const { name, email, password, bio, role } = req.body;

      // Verifica se o e-mail já está cadastrado no banco
      const userExists = await prisma.user.findUnique({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Este e-mail já está em uso.' });
      }

      // Cria o hash da senha para não salvar em texto puro
      const hashedPassword = await bcrypt.hash(password, 10);

      // Salva o usuário no banco de dados
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          bio,
          role: role || 'STUDENT', // Se não enviar papel, vira estudante por padrão
        },
      });

      // Remove a senha do objeto de retorno por segurança
      user.password = undefined;

      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno ao criar usuário.' });
    }
  },

  // 2. LISTAR USUÁRIOS (Para a busca de perfis)
  async index(req, res) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          bio: true,
          role: true,
          createdAt: true,
          // Não selecionamos a senha aqui para não vazar no Front-End
        },
      });

      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  },
};