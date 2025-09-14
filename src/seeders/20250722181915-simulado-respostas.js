// seeders/20240101000002-simulado-respostas.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('simulado_respostas', [
      // Simulado 1 - Admin (questões 1, 2, 3)
      {
        id: 1,
        id_simulado: 1,
        id_questao: 1, // Álgebra: 2x + 5 = 15
        id_alternativa: 2  // x = 5 (correta)
      },
      {
        id: 2,
        id_simulado: 1,
        id_questao: 2, // Português: pronome relativo
        id_alternativa: 7  // Pronome relativo (correta)
      },
      {
        id: 3,
        id_simulado: 1,
        id_questao: 3, // Geometria: área do círculo
        id_alternativa: 11 // 25π cm² (correta)
      },

      // Simulado 2 - Silva Lima (questões 1, 2, 3)
      {
        id: 4,
        id_simulado: 2,
        id_questao: 1, // Álgebra
        id_alternativa: 1  // x = 3 (incorreta)
      },
      {
        id: 5,
        id_simulado: 2,
        id_questao: 2, // Português
        id_alternativa: 7  // Pronome relativo (correta)
      },
      {
        id: 6,
        id_simulado: 2,
        id_questao: 3, // Geometria
        id_alternativa: 9  // 20π cm² (incorreta)
      },

      // Simulado 3 - João Santos (questões 1, 2, 3)
      {
        id: 7,
        id_simulado: 3,
        id_questao: 1, // Álgebra
        id_alternativa: 2  // x = 5 (correta)
      },
      {
        id: 8,
        id_simulado: 3,
        id_questao: 2, // Português
        id_alternativa: 5  // Sujeito (incorreta)
      },
      {
        id: 9,
        id_simulado: 3,
        id_questao: 3, // Geometria
        id_alternativa: 11 // 25π cm² (correta)
      },

      // Simulado 4 - Admin (questões 1, 2, 3)
      {
        id: 10,
        id_simulado: 4,
        id_questao: 1, // Álgebra
        id_alternativa: 3  // x = 7 (incorreta)
      },
      {
        id: 11,
        id_simulado: 4,
        id_questao: 2, // Português
        id_alternativa: 6  // Objeto direto (incorreta)
      },
      {
        id: 12,
        id_simulado: 4,
        id_questao: 3, // Geometria
        id_alternativa: 11 // 25π cm² (correta)
      },

      // Simulado 5 - Silva Lima (questões 1, 2, 3)
      {
        id: 13,
        id_simulado: 5,
        id_questao: 1, // Álgebra
        id_alternativa: 2  // x = 5 (correta)
      },
      {
        id: 14,
        id_simulado: 5,
        id_questao: 2, // Português
        id_alternativa: 8  // Adjunto adnominal (incorreta)
      },
      {
        id: 15,
        id_simulado: 5,
        id_questao: 3, // Geometria
        id_alternativa: 10 // 20π cm² (incorreta)
      },

      // Simulado 6 - João Santos (questões 1, 2, 3)
      {
        id: 16,
        id_simulado: 6,
        id_questao: 1, // Álgebra
        id_alternativa: 4  // x = 10 (incorreta)
      },
      {
        id: 17,
        id_simulado: 6,
        id_questao: 2, // Português
        id_alternativa: 7  // Pronome relativo (correta)
      },
      {
        id: 18,
        id_simulado: 6,
        id_questao: 3, // Geometria
        id_alternativa: 12 // 30π cm² (incorreta)
      },

      // Simulado 7 - Admin (questões 1, 2, 3)
      {
        id: 19,
        id_simulado: 7,
        id_questao: 1, // Álgebra
        id_alternativa: 2  // x = 5 (correta)
      },
      {
        id: 20,
        id_simulado: 7,
        id_questao: 2, // Português
        id_alternativa: 7  // Pronome relativo (correta)
      },
      {
        id: 21,
        id_simulado: 7,
        id_questao: 3, // Geometria
        id_alternativa: 11 // 25π cm² (correta)
      },

      // Simulado 8 - Silva Lima (questões 1, 2, 3)
      {
        id: 22,
        id_simulado: 8,
        id_questao: 1, // Álgebra
        id_alternativa: 1  // x = 3 (incorreta)
      },
      {
        id: 23,
        id_simulado: 8,
        id_questao: 2, // Português
        id_alternativa: 5  // Sujeito (incorreta)
      },
      {
        id: 24,
        id_simulado: 8,
        id_questao: 3, // Geometria
        id_alternativa: 11 // 25π cm² (correta)
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.sequelize.query('TRUNCATE TABLE simulado_respostas');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};