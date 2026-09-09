const express = require('express');
const router = express.Router();

const vereadorRoutes = require('./vereadores');
const obraRoutes = require('./obras');
const recursoRoutes = require('./recursos');
const usuarioRoutes = require('./usuarios');
const authRoutes = require('./auth');

// Rotas da API
router.use('/api/vereadores', vereadorRoutes);
router.use('/api/obras', obraRoutes);
router.use('/api/recursos', recursoRoutes);
router.use('/api/usuarios', usuarioRoutes);
router.use('/api/auth', authRoutes);

// Rota de saúde
router.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = router;
