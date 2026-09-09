const db = require('../models');

class VereadorController {
  // Listar todos os vereadores
  static async listar(req, res) {
    try {
      const vereadores = await db.Vereador.findAll({
        order: [['nome', 'ASC']]
      });
      res.status(200).json(vereadores);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Obter vereador por ID
  static async obterPorId(req, res) {
    try {
      const { id } = req.params;
      const vereador = await db.Vereador.findByPk(id, {
        include: [{
          model: db.Obra,
          as: 'obras'
        }]
      });

      if (!vereador) {
        return res.status(404).json({ erro: 'Vereador não encontrado' });
      }

      res.status(200).json(vereador);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Criar novo vereador
  static async criar(req, res) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ erro: 'Nome é obrigatório' });
      }

      const vereador = await db.Vereador.create({ nome });
      res.status(201).json(vereador);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Atualizar vereador
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, ativo } = req.body;

      const vereador = await db.Vereador.findByPk(id);
      if (!vereador) {
        return res.status(404).json({ erro: 'Vereador não encontrado' });
      }

      await vereador.update({ nome, ativo });
      res.status(200).json(vereador);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Deletar vereador
  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const vereador = await db.Vereador.findByPk(id);

      if (!vereador) {
        return res.status(404).json({ erro: 'Vereador não encontrado' });
      }

      await vereador.destroy();
      res.status(204).send();
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = VereadorController;
