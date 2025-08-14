'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('materias', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      id_disciplina: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'disciplinas', key: 'id' },
        onDelete: 'CASCADE'
      },
      nome: { type: Sequelize.STRING(100), allowNull: false },
      descricao: { type: Sequelize.TEXT },
      ativo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('materias');
  }
};
