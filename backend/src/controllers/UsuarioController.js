const db = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../../config/app');

class UsuarioController {
  // Listar todos os usuários
  static async listar(req, res) {
    try {
      const usuarios = await db.Usuario.findAll({
        attributes: { exclude: ['senhaHash'] },
        order: [['nome', 'ASC']]
      });
      res.status(200).json(usuarios);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Obter usuário por ID
  static async obterPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await db.Usuario.findByPk(id, {
        attributes: { exclude: ['senhaHash'] }
      });

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      res.status(200).json(usuario);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Criar novo usuário
  static async criar(req, res) {
    try {
      const { nome, email, senhaHash, tipoUsuario } = req.body;

      if (!nome || !email || !senhaHash) {
        return res.status(400).json({ erro: 'Dados obrigatórios faltando' });
      }

      const usuario = await db.Usuario.create({
        nome,
        email,
        senha_hash: senhaHash,
        tipo_usuario: tipoUsuario || 'GESTOR'
      });

      res.status(201).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipoUsuario: usuario.tipo_usuario
      });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Atualizar usuário
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, tipoUsuario, ativo } = req.body;

      const usuario = await db.Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      await usuario.update({
        nome,
        email,
        tipo_usuario: tipoUsuario,
        ativo
      });

      res.status(200).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipoUsuario: usuario.tipo_usuario
      });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Deletar usuário
  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const usuario = await db.Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      await usuario.destroy();
      res.status(204).send();
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = UsuarioController;
