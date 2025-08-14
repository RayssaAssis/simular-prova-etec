// models/simulado.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Simulado = sequelize.define('Simulado', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    data_realizacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    }
  }, {
    tableName: 'simulados',
    timestamps: false
  });

  Simulado.associate = (models) => {
    Simulado.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario',
      as: 'usuario',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Simulado.hasMany(models.SimuladoResposta, {
      foreignKey: 'id_simulado',
      as: 'respostas',
      onDelete: 'CASCADE'
    });
  };

  return Simulado;
};