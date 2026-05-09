// src/routes/projectRoutes.js
const { Router } = require('express');
const ProjectController = require('../controllers/ProjectController');

const routes = Router();

// Rota para criar projeto (POST /api/projects)
routes.post('/', ProjectController.create);

// Rota para listar todos os projetos (GET /api/projects)
routes.get('/', ProjectController.index);

// Rota para pesquisar por tag (GET /api/projects/search?tag=React)
routes.get('/search', ProjectController.findByTag);

module.exports = routes;