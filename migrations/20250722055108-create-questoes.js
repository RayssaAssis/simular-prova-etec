'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questoes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      id_materia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'materias', key: 'id' },
        onDelete: 'CASCADE'
      },
      id_prova: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'provas', key: 'id' },
        onDelete: 'CASCADE'
      },
      id_disciplina: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'disciplinas', key: 'id' },
        onDelete: 'CASCADE'
      },
      numero_questao: { type: Sequelize.INTEGER, allowNull: false },
      enunciado: { type: Sequelize.TEXT, allowNull: false },
      ativo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('questoes');
  }
};
