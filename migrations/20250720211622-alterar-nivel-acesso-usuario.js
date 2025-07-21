'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('usuarios', 'nivel_acesso', {
      type: Sequelize.ENUM('estudante', 'admin'),
      allowNull: false,
      defaultValue: 'estudante'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Se quiser desfazer a mudança (rollback), volta o professor
    await queryInterface.changeColumn('usuarios', 'nivel_acesso', {
      type: Sequelize.ENUM('estudante', 'professor', 'admin'),
      allowNull: false,
      defaultValue: 'estudante'
    });
  }
};
