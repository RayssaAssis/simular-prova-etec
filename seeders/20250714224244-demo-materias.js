// seeders/02-materias.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('materias', [
      // Matemática (id_disciplina: 1)
      { id_disciplina: 1, nome: 'Álgebra', descricao: 'Equações e funções', ativo: true },
      { id_disciplina: 1, nome: 'Geometria', descricao: 'Formas e medidas', ativo: true },
      { id_disciplina: 1, nome: 'Estatística', descricao: 'Probabilidade e análise', ativo: true },
      
      // Linguagens (id_disciplina: 2)
      { id_disciplina: 2, nome: 'Português', descricao: 'Gramática e interpretação', ativo: true },
      { id_disciplina: 2, nome: 'Literatura', descricao: 'Literatura brasileira', ativo: true },
      { id_disciplina: 2, nome: 'Inglês', descricao: 'Língua inglesa', ativo: true },
      
      // Ciências Humanas (id_disciplina: 3)
      { id_disciplina: 3, nome: 'História', descricao: 'História do Brasil e mundial', ativo: true },
      { id_disciplina: 3, nome: 'Geografia', descricao: 'Geografia física e humana', ativo: true },
      { id_disciplina: 3, nome: 'Filosofia', descricao: 'Filosofia e ética', ativo: true },
      
      // Ciências da Natureza (id_disciplina: 4)
      { id_disciplina: 4, nome: 'Física', descricao: 'Mecânica e eletricidade', ativo: true },
      { id_disciplina: 4, nome: 'Química', descricao: 'Química geral e orgânica', ativo: true },
      { id_disciplina: 4, nome: 'Biologia', descricao: 'Biologia geral e genética', ativo: true },
      
      // Tecnologia (id_disciplina: 5)
      { id_disciplina: 5, nome: 'Informática', descricao: 'Conceitos de informática', ativo: true },
      { id_disciplina: 5, nome: 'Programação', descricao: 'Lógica de programação', ativo: true },
      
      // Conhecimentos Gerais (id_disciplina: 6)
      { id_disciplina: 6, nome: 'Atualidades', descricao: 'Acontecimentos atuais', ativo: true },
      { id_disciplina: 6, nome: 'Raciocínio Lógico', descricao: 'Problemas de lógica', ativo: true }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('materias', null, {});
  }
};

