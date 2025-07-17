// models/alternativa.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Alternativa = sequelize.define('Alternativa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_questao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questoes',
        key: 'id'
      }
    },
    alternativa_texto: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    alternativa_correta: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    posicao: {
      type: DataTypes.ENUM('A', 'B', 'C', 'D', 'E'),
      allowNull: false
    }
  }, {
    tableName: 'alternativas',
    timestamps: false
  });

  Alternativa.associate = (models) => {
    Alternativa.belongsTo(models.Questao, {
      foreignKey: 'id_questao',
      as: 'questao'
    });
  };

  return Alternativa;
};