// seeders/01-disciplinas.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('disciplinas', [
      { nome: 'Matemática', descricao: 'Álgebra, geometria e estatística', ativo: true },
      { nome: 'Linguagens', descricao: 'Português, literatura e inglês', ativo: true },
      { nome: 'Ciências Humanas', descricao: 'História, geografia e filosofia', ativo: true },
      { nome: 'Ciências da Natureza', descricao: 'Física, química e biologia', ativo: true },
      { nome: 'Tecnologia', descricao: 'Informática e programação', ativo: true },
      { nome: 'Conhecimentos Gerais', descricao: 'Atualidades e cultura geral', ativo: true }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('disciplinas', null, {});
  }
};