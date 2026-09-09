const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Fonte = sequelize.define('Fonte', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    valor: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
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
    tableName: 'fontes',
    timestamps: true,
    underscored: true
  });

  return Fonte;
};
