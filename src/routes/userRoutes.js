// src/routes/userRoutes.js
const { Router } = require('express');
const UserController = require('../controllers/UserController');

const routes = Router();

// Rota para cadastrar (POST /api/users)
routes.post('/', UserController.create);

// Rota para listar todos (GET /api/users)
routes.get('/', UserController.index);

module.exports = routes;