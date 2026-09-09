const jwt = require('jsonwebtoken');
const config = require('../../config/app');

// Middleware de autenticação
const autenticar = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ erro: 'Token não fornecido' });
    }

    const decodificado = jwt.verify(token, config.jwt.secret);
    req.usuario = decodificado;
    next();
  } catch (erro) {
    res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};

// Middleware de verificação de admin
const admin = (req, res, next) => {
  if (req.usuario.tipoUsuario !== 'ADMIN') {
    return res.status(403).json({ erro: 'Acesso negado. Apenas administradores.' });
  }
  next();
};

// Middleware de tratamento de erros
const tratarErros = (erro, req, res, next) => {
  console.error('Erro:', erro);
  res.status(erro.status || 500).json({
    erro: erro.message || 'Erro interno do servidor'
  });
};

module.exports = {
  autenticar,
  admin,
  tratarErros
};
