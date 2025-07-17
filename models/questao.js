// models/questao.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Questao = sequelize.define('Questao', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_materia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'materias',
        key: 'id'
      }
    },
    id_prova: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'provas',
        key: 'id'
      }
    },
    enunciado: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'questoes',
    timestamps: false
  });

  Questao.associate = (models) => {
    Questao.belongsTo(models.Materia, {
      foreignKey: 'id_materia',
      as: 'materia'
    });
    
    Questao.belongsTo(models.Prova, {
      foreignKey: 'id_prova',
      as: 'prova'
    });
    
    Questao.hasMany(models.Alternativa, {
      foreignKey: 'id_questao',
      as: 'alternativas',
      onDelete: 'CASCADE'
    });
  };

  return Questao;
};