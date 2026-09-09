const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Rotas públicas
router.post('/login', AuthController.login);
router.post('/registrar', AuthController.registrar);
router.post('/verificar-token', AuthController.verificarToken);

module.exports = router;
