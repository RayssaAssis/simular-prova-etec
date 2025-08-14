
const { Sequelize } = require('sequelize');
require('dotenv').config();

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
    }
  }
);

const Usuario = require('./usuario')(sequelize);
const Disciplina = require('./disciplina')(sequelize);
const Materia = require('./materia')(sequelize);
const Prova = require('./prova')(sequelize);
const Questao = require('./questao')(sequelize);
const Alternativa = require('./alternativa')(sequelize);
const Simulado = require('./simulado')(sequelize);
const SimuladoResposta = require('./simulado_resposta')(sequelize);

const db = {
  Sequelize,
  sequelize,
  Usuario,
  Disciplina,
  Materia,
  Prova,
  Questao,
  Alternativa,
  Simulado,
  SimuladoResposta
};

// ✅ Executar as associações
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
