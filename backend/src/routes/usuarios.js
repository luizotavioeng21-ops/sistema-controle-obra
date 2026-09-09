const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const { autenticar, admin } = require('../middlewares/auth');

// Rotas protegidas (apenas admin)
router.get('/', autenticar, admin, UsuarioController.listar);
router.get('/:id', autenticar, UsuarioController.obterPorId);
router.post('/', autenticar, admin, UsuarioController.criar);
router.put('/:id', autenticar, UsuarioController.atualizar);
router.delete('/:id', autenticar, admin, UsuarioController.deletar);

module.exports = router;
