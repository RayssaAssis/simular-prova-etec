// src/controllers/provaController.js
const { Prova } = require('../../models');

class ProvaController {
  async getAll() {
    try {
      return await Prova.findAll({
        where: { ativo: true },
        order: [['ano', 'DESC'], ['semestre', 'DESC']]
      });
    } catch (error) {
      throw new Error('Erro ao buscar provas: ' + error.message);
    }
  }

  async getById(id) {
    try {
      const prova = await Prova.findByPk(id);
      if (!prova) throw new Error('Prova não encontrada');
      return prova;
    } catch (error) {
      throw new Error('Erro ao buscar prova por ID: ' + error.message);
    }
  }

  async create(data) {
    try {
      return await Prova.create(data);
    } catch (error) {
      throw new Error('Erro ao criar prova: ' + error.message);
    }
  }

  async update(id, data) {
    try {
      const prova = await Prova.findByPk(id);
      if (!prova) throw new Error('Prova não encontrada');
      return await prova.update(data);
    } catch (error) {
      throw new Error('Erro ao atualizar prova: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const prova = await Prova.findByPk(id);
      if (!prova) throw new Error('Prova não encontrada');
      await prova.destroy();
      return prova;
    } catch (error) {
      throw new Error('Erro ao deletar prova: ' + error.message);
    }
  }
}

module.exports = new ProvaController();
