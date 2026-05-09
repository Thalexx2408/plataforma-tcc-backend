// src/controllers/ProjectController.js
const prisma = require('../config/db');

module.exports = {
  // 1. CRIAR NOVO PROJETO
  async create(req, res) {
    try {
      const { title, description, tags, authorId } = req.body;

      // Cria o projeto associando-o ao ID do autor (User)
      const project = await prisma.project.create({
        data: {
          title,
          description,
          tags, // Ex: ["React", "Node.js"]
          authorId,
        },
      });

      return res.status(201).json(project);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar projeto.' });
    }
  },

  // 2. LISTAR TODOS OS PROJETOS (Com dados do autor)
  async index(req, res) {
    try {
      const projects = await prisma.project.findMany({
        include: {
          author: {
            select: {
              name: true,
              role: true,
            }
          }
        }
      });
      return res.json(projects);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao procurar projetos.' });
    }
  },

  // 3. PROCURAR PROJETOS POR TAG (Funcionalidade de Busca do MVP)
  async findByTag(req, res) {
    try {
      const { tag } = req.query;
      const projects = await prisma.project.findMany({
        where: {
          tags: {
            has: tag
          }
        },
        include: {
          author: { select: { name: true } }
        }
      });
      return res.json(projects);
    } catch (error) {
      return res.status(500).json({ error: 'Erro na busca.' });
    }
  }
};