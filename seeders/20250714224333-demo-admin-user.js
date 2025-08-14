const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Administrador',
        email: 'admin@simuladoretec.com',
        senha: await bcrypt.hash('admin123', 12),
        nascimento: '1990-01-01',
        foto: null,
        nivel_acesso: 'admin',
        ativo: true
      },
      {
        nome: 'Silva Lima',
        email: 'silva@simuladoretec.com',
        senha: await bcrypt.hash('prof123', 12),
        nascimento: '1985-05-15',
        foto: null,
        nivel_acesso: 'estudante',
        ativo: true
      },
      {
        nome: 'João Santos',
        email: 'joao@exemplo.com',
        senha: await bcrypt.hash('123456', 12),
        nascimento: '2000-03-20',
        foto: null,
        nivel_acesso: 'estudante',
        ativo: true
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.sequelize.query('TRUNCATE TABLE usuarios');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};
