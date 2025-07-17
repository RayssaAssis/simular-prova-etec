// models/disciplina.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Disciplina = sequelize.define('Disciplina', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
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
    tableName: 'disciplinas',
    timestamps: false
  });

  Disciplina.associate = (models) => {
    Disciplina.hasMany(models.Materia, {
      foreignKey: 'id_disciplina',
      as: 'materias'
    });
  };

  return Disciplina;
};