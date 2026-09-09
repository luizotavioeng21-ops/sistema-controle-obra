const db = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../../config/app');

class AuthController {
  // Login
  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
      }

      const usuario = await db.Usuario.findOne({ where: { email } });
      if (!usuario || !usuario.ativo) {
        return res.status(401).json({ erro: 'Email ou senha inválidos' });
      }

      const senhaValida = await usuario.verificarSenha(senha);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Email ou senha inválidos' });
      }

      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
          tipoUsuario: usuario.tipo_usuario
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiration }
      );

      res.status(200).json({
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipoUsuario: usuario.tipo_usuario
        }
      });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Registrar novo usuário
  static async registrar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
      }

      const usuarioExistente = await db.Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(409).json({ erro: 'Email já está registrado' });
      }

      const usuario = await db.Usuario.create({
        nome,
        email,
        senha_hash: senha,
        tipo_usuario: 'GESTOR'
      });

      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
          tipoUsuario: usuario.tipo_usuario
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiration }
      );

      res.status(201).json({
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipoUsuario: usuario.tipo_usuario
        }
      });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Verificar token
  static async verificarToken(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ erro: 'Token não fornecido' });
      }

      const decodificado = jwt.verify(token, config.jwt.secret);
      res.status(200).json({
        valido: true,
        usuario: decodificado
      });
    } catch (erro) {
      res.status(401).json({ erro: 'Token inválido' });
    }
  }
}

module.exports = AuthController;
