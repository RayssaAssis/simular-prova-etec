'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('provas', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      ano: { type: Sequelize.INTEGER, allowNull: false },
      semestre: { type: Sequelize.ENUM('1', '2'), allowNull: false },
      ativo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('provas');
  }
};
