// seeders/03-provas.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const provas = [];
    const anoAtual = new Date().getFullYear();
    
    // Criar provas dos últimos 3 anos
    for (let ano = anoAtual - 2; ano <= anoAtual; ano++) {
      provas.push(
        { ano: ano, semestre: '1', ativo: true },
        { ano: ano, semestre: '2', ativo: true }
      );
    }
    
    await queryInterface.bulkInsert('provas', provas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('provas', null, {});
  }
};