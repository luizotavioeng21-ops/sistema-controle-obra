const express = require('express');
const router = express.Router();
const ObraController = require('../controllers/ObraController');
const { autenticar } = require('../middlewares/auth');

// Rotas públicas
router.get('/', ObraController.listar);
router.get('/estatisticas', ObraController.obterEstatisticas);
router.get('/:id', ObraController.obterPorId);

// Rotas protegidas
router.post('/', autenticar, ObraController.criar);
router.put('/:id', autenticar, ObraController.atualizar);
router.delete('/:id', autenticar, ObraController.deletar);

module.exports = router;
