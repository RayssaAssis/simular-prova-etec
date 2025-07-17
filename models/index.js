// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Configuração do banco
const sequelize = new Sequelize(
  process.env.DB_NAME || 'simulador_etec',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: false,
      freezeTableName: true
    }
  }
);

// Modelo Usuario
const Usuario = sequelize.define('usuarios', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  senha: { type: DataTypes.STRING(255), allowNull: false },
  nascimento: { type: DataTypes.DATEONLY },
  cidade: { type: DataTypes.STRING(100) },
  nivel_acesso: { type: DataTypes.ENUM('estudante', 'professor', 'admin'), defaultValue: 'estudante' },
  cpf: { type: DataTypes.STRING(14) },
  foto: { type: DataTypes.STRING(255) },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// Modelo Disciplina
const Disciplina = sequelize.define('disciplinas', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  descricao: { type: DataTypes.TEXT },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// Modelo Materia
const Materia = sequelize.define('materias', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_disciplina: { type: DataTypes.INTEGER, allowNull: false },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  descricao: { type: DataTypes.TEXT },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// Modelo Prova
const Prova = sequelize.define('provas', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ano: { type: DataTypes.INTEGER, allowNull: false },
  semestre: { type: DataTypes.ENUM('1', '2'), allowNull: false },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// Modelo Questao
const Questao = sequelize.define('questoes', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_materia: { type: DataTypes.INTEGER, allowNull: false },
  id_prova: { type: DataTypes.INTEGER, allowNull: false },
  enunciado: { type: DataTypes.TEXT, allowNull: false },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// Modelo Alternativa
const Alternativa = sequelize.define('alternativas', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_questao: { type: DataTypes.INTEGER, allowNull: false },
  alternativa_texto: { type: DataTypes.TEXT, allowNull: false },
  alternativa_correta: { type: DataTypes.BOOLEAN, defaultValue: false },
  posicao: { type: DataTypes.ENUM('A', 'B', 'C', 'D', 'E'), allowNull: false }
});

// Relacionamentos
Disciplina.hasMany(Materia, { foreignKey: 'id_disciplina', as: 'materias' });
Materia.belongsTo(Disciplina, { foreignKey: 'id_disciplina', as: 'disciplina' });

Materia.hasMany(Questao, { foreignKey: 'id_materia', as: 'questoes' });
Questao.belongsTo(Materia, { foreignKey: 'id_materia', as: 'materia' });

Prova.hasMany(Questao, { foreignKey: 'id_prova', as: 'questoes' });
Questao.belongsTo(Prova, { foreignKey: 'id_prova', as: 'prova' });

Questao.hasMany(Alternativa, { foreignKey: 'id_questao', as: 'alternativas' });
Alternativa.belongsTo(Questao, { foreignKey: 'id_questao', as: 'questao' });

module.exports = {
  sequelize,
  Usuario,
  Disciplina,
  Materia,
  Prova,
  Questao,
  Alternativa
};
