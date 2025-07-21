const { Usuario } = require('../../models');

class UsuarioController {
  // buscar todos os usuários
  async getAll() {
    try {
      const usuarios = await Usuario.findAll({
        where: { ativo: true },
        order: [['nome', 'ASC']]
      });
      return usuarios;
    } catch (error) {
      throw new Error('Erro ao buscar usuário: ' + error.message);
    }
  }

  // buscar usuário por id
  async getById(id) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }
      return usuario;
    } catch (error) {
      throw new Error('Erro ao buscar usuário por id: ' + error.message);
    }
  }

  // criar novo usuário
  async create(dados) {
    try {
      // dados é um objeto com todos os atributos do usuário
      const usuario = await Usuario.create(dados);
      return usuario;
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error.message);
    }
  }

  // atualizar usuário
  async update(id, dados) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }
      const atualizado = await usuario.update(dados);
      return atualizado;
    } catch (error) {
      throw new Error('Erro ao atualizar usuário: ' + error.message);
    }
  }

  // deletar usuário
  async delete(id) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }
      await usuario.destroy();
      return usuario;
    } catch (error) {
      throw new Error('Erro ao deletar usuário: ' + error.message);
    }
  }
}

module.exports = new UsuarioController();
