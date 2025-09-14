// seeders/20240101000001-simulados.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('simulados', [
      {
        id: 1,
        data_realizacao: new Date('2024-01-15 10:30:00'),
        id_usuario: 1 // admin
      },
      {
        id: 2,
        data_realizacao: new Date('2024-01-16 14:20:00'),
        id_usuario: 2 // Silva Lima
      },
      {
        id: 3,
        data_realizacao: new Date('2024-01-17 09:15:00'),
        id_usuario: 3 // João Santos
      },
      {
        id: 4,
        data_realizacao: new Date('2024-01-18 16:45:00'),
        id_usuario: 1 // admin
      },
      {
        id: 5,
        data_realizacao: new Date('2024-01-19 11:00:00'),
        id_usuario: 2 // Silva Lima
      },
      {
        id: 6,
        data_realizacao: new Date('2024-01-20 13:30:00'),
        id_usuario: 3 // João Santos
      },
      {
        id: 7,
        data_realizacao: new Date('2024-01-21 08:45:00'),
        id_usuario: 1 // admin
      },
      {
        id: 8,
        data_realizacao: new Date('2024-01-22 15:20:00'),
        id_usuario: 2 // Silva Lima
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.sequelize.query('TRUNCATE TABLE simulados');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};