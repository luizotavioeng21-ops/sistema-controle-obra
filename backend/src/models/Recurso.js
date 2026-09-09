const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Recurso = sequelize.define('Recurso', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    descricao: {
      type: DataTypes.TEXT
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    criadoEm: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'criado_em'
    },
    atualizadoEm: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'atualizado_em'
    }
  }, {
    tableName: 'recursos',
    timestamps: true,
    underscored: true
  });

  return Recurso;
};
