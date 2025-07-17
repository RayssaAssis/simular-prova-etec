// models/prova.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Prova = sequelize.define('Prova', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    semestre: {
      type: DataTypes.ENUM('1', '2'),
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'provas',
    timestamps: false
  });

  Prova.associate = (models) => {
    Prova.hasMany(models.Questao, {
      foreignKey: 'id_prova',
      as: 'questoes'
    });
  };

  return Prova;
};