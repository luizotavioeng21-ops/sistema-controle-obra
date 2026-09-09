const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Endereco = sequelize.define('Endereco', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rua: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    numero: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    complemento: {
      type: DataTypes.STRING(255)
    },
    bairro: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cidade: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    cep: {
      type: DataTypes.STRING(9),
      allowNull: false
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
    tableName: 'enderecos',
    timestamps: true,
    underscored: true
  });

  return Endereco;
};
