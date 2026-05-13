// src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes'); // Puxa as rotas que criamos

const app = express();

// Configurações da API
app.use(cors());
app.use(express.json()); // Permite receber JSON no Body

// Conecta as rotas no prefixo /api
app.use('/api', routes);

// Define a porta (puxa do .env ou usa a 3002 por padrão)
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});