const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const HistoricoObra = sequelize.define('HistoricoObra', {
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
    usuario: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    acao: {
      type: DataTypes.ENUM('INSERT', 'UPDATE', 'DELETE'),
      allowNull: false
    },
    descricaoAlteracao: {
      type: DataTypes.TEXT,
      field: 'descricao_alteracao'
    },
    dadosAnteriores: {
      type: DataTypes.JSONB,
      field: 'dados_anteriores'
    },
    dadosNovos: {
      type: DataTypes.JSONB,
      field: 'dados_novos'
    },
    criadoEm: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'criado_em'
    }
  }, {
    tableName: 'historico_obras',
    timestamps: false,
    underscored: true
  });

  return HistoricoObra;
};
