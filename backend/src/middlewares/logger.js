const express = require('express');

const loggerMiddleware = (req, res, next) => {
  const inicio = Date.now();

  res.on('finish', () => {
    const duracao = Date.now() - inicio;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - ${duracao}ms`);
  });

  next();
};

module.exports = loggerMiddleware;
