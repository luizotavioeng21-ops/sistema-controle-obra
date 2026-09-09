const { Sequelize } = require('sequelize');
const config = require('../../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    define: dbConfig.define
  }
);

const db = {};

// Importar todos os modelos
db.Vereador = require('./Vereador')(sequelize);
db.Endereco = require('./Endereco')(sequelize);
db.TipoObra = require('./TipoObra')(sequelize);
db.Recurso = require('./Recurso')(sequelize);
db.Fonte = require('./Fonte')(sequelize);
db.Obra = require('./Obra')(sequelize);
db.ObraRecurso = require('./ObraRecurso')(sequelize);
db.ObraItem = require('./ObraItem')(sequelize);
db.Usuario = require('./Usuario')(sequelize);
db.HistoricoObra = require('./HistoricoObra')(sequelize);

// Definir relacionamentos
db.Vereador.hasMany(db.Obra, { foreignKey: 'vereador_id' });
db.Obra.belongsTo(db.Vereador, { foreignKey: 'vereador_id' });

db.Endereco.hasMany(db.Obra, { foreignKey: 'endereco_id' });
db.Obra.belongsTo(db.Endereco, { foreignKey: 'endereco_id' });

db.TipoObra.hasMany(db.Obra, { foreignKey: 'tipo_obra_id' });
db.Obra.belongsTo(db.TipoObra, { foreignKey: 'tipo_obra_id' });

db.Obra.hasMany(db.ObraRecurso, { foreignKey: 'obra_id' });
db.ObraRecurso.belongsTo(db.Obra, { foreignKey: 'obra_id' });

db.Recurso.hasMany(db.ObraRecurso, { foreignKey: 'recurso_id' });
db.ObraRecurso.belongsTo(db.Recurso, { foreignKey: 'recurso_id' });

db.Fonte.hasMany(db.ObraRecurso, { foreignKey: 'fonte_id' });
db.ObraRecurso.belongsTo(db.Fonte, { foreignKey: 'fonte_id' });

db.Obra.hasMany(db.ObraItem, { foreignKey: 'obra_id' });
db.ObraItem.belongsTo(db.Obra, { foreignKey: 'obra_id' });

db.Obra.hasMany(db.HistoricoObra, { foreignKey: 'obra_id' });
db.HistoricoObra.belongsTo(db.Obra, { foreignKey: 'obra_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
