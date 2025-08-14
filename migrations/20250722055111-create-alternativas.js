'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alternativas', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      id_questao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'questoes', key: 'id' },
        onDelete: 'CASCADE'
      },
      alternativa_texto: { type: Sequelize.TEXT, allowNull: false },
      alternativa_correta: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      posicao: { type: Sequelize.ENUM('A', 'B', 'C', 'D', 'E'), allowNull: false }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('alternativas');
  }
};
