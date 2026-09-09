const express = require('express');
const router = express.Router();
const VereadorController = require('../controllers/VereadorController');
const { autenticar } = require('../middlewares/auth');

// Rotas públicas
router.get('/', VereadorController.listar);
router.get('/:id', VereadorController.obterPorId);

// Rotas protegidas
router.post('/', autenticar, VereadorController.criar);
router.put('/:id', autenticar, VereadorController.atualizar);
router.delete('/:id', autenticar, VereadorController.deletar);

module.exports = router;
