const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ObraItem = sequelize.define('ObraItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    obraId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'obra_id',
      references: {
        model: 'obras',
        key: 'id'
      }
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    valorPrevisto: {
      type: DataTypes.DECIMAL(15, 2),
      field: 'valor_previsto'
    },
    valorRealizado: {
      type: DataTypes.DECIMAL(15, 2),
      field: 'valor_realizado'
    },
    status: {
      type: DataTypes.ENUM('PENDENTE', 'EM PROGRESSO', 'CONCLUÍDO'),
      defaultValue: 'PENDENTE'
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
    tableName: 'obra_itens',
    timestamps: true,
    underscored: true
  });

  return ObraItem;
};
