'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete('disciplinas', null, {}); // 🧹 limpa a tabela antes

    await queryInterface.bulkInsert('disciplinas', [
      { nome: 'Matemática', descricao: 'Álgebra, geometria e estatística', ativo: true },
      { nome: 'Linguagens', descricao: 'Português, literatura e inglês', ativo: true },
      { nome: 'Ciências Humanas', descricao: 'História, geografia e filosofia', ativo: true },
      { nome: 'Ciências da Natureza', descricao: 'Física, química e biologia', ativo: true },
      { nome: 'Tecnologia', descricao: 'Informática e programação', ativo: true },
      { nome: 'Conhecimentos Gerais', descricao: 'Atualidades e cultura geral', ativo: true }
    ], { validate: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.sequelize.query('TRUNCATE TABLE disciplinas');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};
