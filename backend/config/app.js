// =====================================================
// Configuração Central da Aplicação
// =====================================================

module.exports = {
  // Servidor
  server: {
    port: process.env.PORT || 3000,
    apiUrl: process.env.API_URL || 'http://localhost:3000'
  },

  // Banco de Dados
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'sistema_controle_obra',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres'
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'chave-secreta-desenvolvimento',
    expiration: process.env.JWT_EXPIRE || '7d'
  },

  // CORS
  cors: {
    origin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',')
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  },

  // Features
  features: {
    enableSwagger: true,
    enableCors: true,
    enableHelmet: true
  }
};
