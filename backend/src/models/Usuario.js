const { DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    senhaHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'senha_hash'
    },
    tipoUsuario: {
      type: DataTypes.ENUM('ADMINISTRADOR', 'GESTOR', 'VISUALIZADOR'),
      defaultValue: 'GESTOR',
      field: 'tipo_usuario'
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
    tableName: 'usuarios',
    timestamps: true,
    underscored: true
  });

  // Hook para criptografar senha antes de salvar
  Usuario.beforeCreate(async (usuario) => {
    if (usuario.senhaHash) {
      const salt = await bcryptjs.genSalt(10);
      usuario.senhaHash = await bcryptjs.hash(usuario.senhaHash, salt);
    }
  });

  // Método para verificar senha
  Usuario.prototype.verificarSenha = async function(senha) {
    return bcryptjs.compare(senha, this.senhaHash);
  };

  return Usuario;
};
