const validarDados = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        erro: 'Dados inválidos',
        detalhes: error.details.map(d => d.message)
      });
    }

    req.body = value;
    next();
  };
};

module.exports = validarDados;
