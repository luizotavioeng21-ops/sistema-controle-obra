const express = require('express');
const router = express.Router();
const RecursoController = require('../controllers/RecursoController');
const { autenticar } = require('../middlewares/auth');

// Rotas públicas
router.get('/', RecursoController.listar);
router.get('/:id', RecursoController.obterPorId);

// Rotas protegidas
router.post('/', autenticar, RecursoController.criar);
router.put('/:id', autenticar, RecursoController.atualizar);
router.delete('/:id', autenticar, RecursoController.deletar);

module.exports = router;
