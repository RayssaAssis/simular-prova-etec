// seeders/04-usuarios.js
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Administrador',
        email: 'admin@simuladoretec.com',
        senha: await bcrypt.hash('admin123', 12),
        nascimento: '1990-01-01',
        cidade: 'São Paulo',
        nivel_acesso: 'admin',
        cpf: '000.000.000-00',
        foto: null,
        ativo: true
      },
      {
        nome: 'Silva Lima',
        email: 'silva@simuladoretec.com',
        senha: await bcrypt.hash('prof123', 12),
        nascimento: '1985-05-15',
        cidade: 'São Paulo',
        nivel_acesso: 'estudante', // mudou de 'professor' para 'estudante'
        cpf: '111.111.111-11',
        foto: null,
        ativo: true
      },
      {
        nome: 'João Santos',
        email: 'joao@exemplo.com',
        senha: await bcrypt.hash('123456', 12),
        nascimento: '2000-03-20',
        cidade: 'Santos',
        nivel_acesso: 'estudante',
        cpf: '222.222.222-22',
        foto: null,
        ativo: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
