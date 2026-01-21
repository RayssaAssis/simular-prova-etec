
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nome: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      senha: { type: Sequelize.STRING(255), allowNull: false },
      nascimento: { type: Sequelize.DATEONLY },
      foto: { type: Sequelize.STRING(255) },
      nivel_acesso: { type: Sequelize.ENUM('estudante', 'admin'), defaultValue: 'estudante' },
      ativo: { type: Sequelize.BOOLEAN, defaultValue: true }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('usuarios');
  }
};

