const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ObraRecurso = sequelize.define('ObraRecurso', {
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
    recursoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'recurso_id',
      references: {
        model: 'recursos',
        key: 'id'
      }
    },
    valorRecurso: {
      type: DataTypes.DECIMAL(15, 2),
      field: 'valor_recurso'
    },
    valorObra: {
      type: DataTypes.DECIMAL(15, 2),
      field: 'valor_obra'
    },
    valorComplementar: {
      type: DataTypes.DECIMAL(15, 2),
      field: 'valor_complementar'
    },
    fonteId: {
      type: DataTypes.INTEGER,
      field: 'fonte_id',
      references: {
        model: 'fontes',
        key: 'id'
      }
    },
    observacoes: {
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
    tableName: 'obra_recursos',
    timestamps: true,
    underscored: true
  });

  return ObraRecurso;
};
