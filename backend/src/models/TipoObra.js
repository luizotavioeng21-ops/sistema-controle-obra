const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TipoObra = sequelize.define('TipoObra', {
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
    descricao: {
      type: DataTypes.TEXT
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
    tableName: 'tipos_obra',
    timestamps: true,
    underscored: true
  });

  return TipoObra;
};
