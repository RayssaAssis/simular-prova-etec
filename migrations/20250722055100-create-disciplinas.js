'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('disciplinas', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nome: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      descricao: { type: Sequelize.TEXT },
      ativo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('disciplinas');
  }
};
