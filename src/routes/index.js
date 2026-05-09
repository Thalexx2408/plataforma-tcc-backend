const { Router } = require('express');
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

const routes = Router();

routes.get('/status', (req, res) => {
  res.json({ status: 'API Online', date: new Date() });
});

// Rotas da aplicação
routes.use('/users', userRoutes);
routes.use('/projects', projectRoutes);

module.exports = routes;