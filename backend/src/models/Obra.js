const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Obra = sequelize.define('Obra', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vereadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'vereador_id',
      references: {
        model: 'vereadores',
        key: 'id'
      }
    },
    enderecoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'endereco_id',
      references: {
        model: 'enderecos',
        key: 'id'
      }
    },
    tipoObraId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'tipo_obra_id',
      references: {
        model: 'tipos_obra',
        key: 'id'
      }
    },
    andamento: {
      type: DataTypes.ENUM('EM ANDAMENTO', 'PARADA', 'CONCLUÍDA'),
      defaultValue: 'EM ANDAMENTO'
    },
    aditivo: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0
    },
    dataInicio: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'data_inicio'
    },
    dataConclusaoPrevista: {
      type: DataTypes.DATE,
      field: 'data_conclusao_prevista'
    },
    dataConclusaoReal: {
      type: DataTypes.DATE,
      field: 'data_conclusao_real'
    },
    status: {
      type: DataTypes.ENUM('ATIVO', 'INATIVO'),
      defaultValue: 'ATIVO'
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
    tableName: 'obras',
    timestamps: true,
    underscored: true
  });

  return Obra;
};
