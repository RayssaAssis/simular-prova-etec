// seeders/05-questoes-alternativas.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserir questões
    await queryInterface.bulkInsert('questoes', [
      {
        id: 1,
        id_materia: 1, // Álgebra
        id_prova: 1,
        enunciado: 'Qual é o valor de x na equação 2x + 5 = 15?',
        ativo: true
      },
      {
        id: 2,
        id_materia: 4, // Português
        id_prova: 1,
        enunciado: 'Qual é a função sintática do termo destacado: "O livro QUE comprei é interessante"?',
        ativo: true
      },
      {
        id: 3,
        id_materia: 2, // Geometria
        id_prova: 2,
        enunciado: 'A área de um círculo com raio de 5 cm é:',
        ativo: true
      }
    ], {});

    // Inserir alternativas
    await queryInterface.bulkInsert('alternativas', [
      // Questão 1 - Álgebra
      { id_questao: 1, alternativa_texto: 'x = 3', alternativa_correta: false, posicao: 'A' },
      { id_questao: 1, alternativa_texto: 'x = 5', alternativa_correta: true, posicao: 'B' },
      { id_questao: 1, alternativa_texto: 'x = 7', alternativa_correta: false, posicao: 'C' },
      { id_questao: 1, alternativa_texto: 'x = 10', alternativa_correta: false, posicao: 'D' },

      // Questão 2 - Português
      { id_questao: 2, alternativa_texto: 'Sujeito', alternativa_correta: false, posicao: 'A' },
      { id_questao: 2, alternativa_texto: 'Objeto direto', alternativa_correta: false, posicao: 'B' },
      { id_questao: 2, alternativa_texto: 'Pronome relativo', alternativa_correta: true, posicao: 'C' },
      { id_questao: 2, alternativa_texto: 'Adjunto adnominal', alternativa_correta: false, posicao: 'D' },

      // Questão 3 - Geometria
      { id_questao: 3, alternativa_texto: '15π cm²', alternativa_correta: false, posicao: 'A' },
      { id_questao: 3, alternativa_texto: '20π cm²', alternativa_correta: false, posicao: 'B' },
      { id_questao: 3, alternativa_texto: '25π cm²', alternativa_correta: true, posicao: 'C' },
      { id_questao: 3, alternativa_texto: '30π cm²', alternativa_correta: false, posicao: 'D' },
      { id_questao: 3, alternativa_texto: '35π cm²', alternativa_correta: false, posicao: 'E' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('alternativas', null, {});
    await queryInterface.bulkDelete('questoes', null, {});
  }
};