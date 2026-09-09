const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Vereador = sequelize.define('Vereador', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
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
    tableName: 'vereadores',
    timestamps: true,
    underscored: true
  });

  return Vereador;
};
