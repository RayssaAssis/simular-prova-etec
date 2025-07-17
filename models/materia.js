// models/materia.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Materia = sequelize.define('Materia', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'disciplinas',
        key: 'id'
      }
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'materias',
    timestamps: false
  });

  Materia.associate = (models) => {
    Materia.belongsTo(models.Disciplina, {
      foreignKey: 'id_disciplina',
      as: 'disciplina'
    });
    
    Materia.hasMany(models.Questao, {
      foreignKey: 'id_materia',
      as: 'questoes'
    });
  };

  return Materia;
};