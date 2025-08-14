'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('simulado_respostas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_simulado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'simulados',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_alternativa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'alternativas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_questao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'questoes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('simulado_respostas');
  }
};
