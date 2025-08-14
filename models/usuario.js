
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    senha: { type: DataTypes.STRING(255), allowNull: false },
    nascimento: { type: DataTypes.DATEONLY },
    foto: { type: DataTypes.STRING(255) },
    nivel_acesso: { type: DataTypes.ENUM('estudante', 'admin'), defaultValue: 'estudante' },
    ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
    reset_token: { type: DataTypes.STRING, allowNull: true },
    reset_expires: { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: 'usuarios',
    timestamps: false
  });

  // Associação com Simulado
  Usuario.associate = (models) => {
    Usuario.hasMany(models.Simulado, {
      foreignKey: 'id_usuario',
      as: 'simulados'
    });
  };

  return Usuario;
};
