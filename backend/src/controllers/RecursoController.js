const db = require('../models');

class RecursoController {
  // Listar todos os recursos
  static async listar(req, res) {
    try {
      const recursos = await db.Recurso.findAll({
        order: [['nome', 'ASC']]
      });
      res.status(200).json(recursos);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Obter recurso por ID
  static async obterPorId(req, res) {
    try {
      const { id } = req.params;
      const recurso = await db.Recurso.findByPk(id);

      if (!recurso) {
        return res.status(404).json({ erro: 'Recurso não encontrado' });
      }

      res.status(200).json(recurso);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Criar novo recurso
  static async criar(req, res) {
    try {
      const { nome, descricao } = req.body;

      if (!nome) {
        return res.status(400).json({ erro: 'Nome é obrigatório' });
      }

      const recurso = await db.Recurso.create({ nome, descricao });
      res.status(201).json(recurso);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Atualizar recurso
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, ativo } = req.body;

      const recurso = await db.Recurso.findByPk(id);
      if (!recurso) {
        return res.status(404).json({ erro: 'Recurso não encontrado' });
      }

      await recurso.update({ nome, descricao, ativo });
      res.status(200).json(recurso);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Deletar recurso
  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const recurso = await db.Recurso.findByPk(id);

      if (!recurso) {
        return res.status(404).json({ erro: 'Recurso não encontrado' });
      }

      await recurso.destroy();
      res.status(204).send();
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = RecursoController;
