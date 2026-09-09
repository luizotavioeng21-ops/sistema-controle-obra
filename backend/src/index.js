require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('express-async-errors');

const config = require('./config/app');

// Importar rotas
const vereadorRoutes = require('./src/routes/vereadores');
const obrasRoutes = require('./src/routes/obras');
const recursosRoutes = require('./src/routes/recursos');
const usuariosRoutes = require('./src/routes/usuarios');
const authRoutes = require('./src/routes/auth');

// Inicializar aplicação
const app = express();

// =====================================================
// Middleware de Segurança e Parsing
// =====================================================
app.use(helmet());
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================================
// Middleware de Logging
// =====================================================
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// =====================================================
// Rotas da API
// =====================================================
app.use('/api/auth', authRoutes);
app.use('/api/vereadores', vereadorRoutes);
app.use('/api/obras', obrasRoutes);
app.use('/api/recursos', recursosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// =====================================================
// Health Check
// =====================================================
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// =====================================================
// Tratamento de Erros 404
// =====================================================
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.path,
    method: req.method
  });
});

// =====================================================
// Tratamento Global de Erros
// =====================================================
app.use((err, req, res, next) => {
  console.error('[ERRO]', err);

  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(status).json({
    error: message,
    status,
    timestamp: new Date().toISOString()
  });
});

// =====================================================
// Iniciar Servidor
// =====================================================
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║  🚀 API do Sistema de Controle de Obra           ║
║  Servidor iniciado na porta ${PORT}               ║
║  URL: ${config.server.apiUrl}                    ║
╚═══════════════════════════════════════════════════╝
  `);
});

module.exports = app;
