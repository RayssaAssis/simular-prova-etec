
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    senha: { type: DataTypes.STRING(255), allowNull: false },
    nascimento: { type: DataTypes.DATEONLY },
    cidade: { type: DataTypes.STRING(100) },
    nivel_acesso: { type: DataTypes.ENUM('estudante', 'admin'), defaultValue: 'estudante' },
    cpf: { type: DataTypes.STRING(14) },
    foto: { type: DataTypes.STRING(255) },
    ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    tableName: 'usuarios',
    timestamps: false
  });
};
