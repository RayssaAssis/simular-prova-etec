// src/controllers/alternativaController.js
const { Alternativa } = require('../../models');

class AlternativaController {
  async getAll() {
    try {
      return await Alternativa.findAll({
        order: [['id', 'ASC']]
      });
    } catch (error) {
      throw new Error('Erro ao buscar alternativas: ' + error.message);
    }
  }

  async getById(id) {
    try {
      const alternativa = await Alternativa.findByPk(id);
      if (!alternativa) throw new Error('Alternativa não encontrada');
      return alternativa;
    } catch (error) {
      throw new Error('Erro ao buscar alternativa por ID: ' + error.message);
    }
  }

  async create(data) {
    try {
      return await Alternativa.create(data);
    } catch (error) {
      throw new Error('Erro ao criar alternativa: ' + error.message);
    }
  }

  async update(id, data) {
    try {
      const alternativa = await Alternativa.findByPk(id);
      if (!alternativa) throw new Error('Alternativa não encontrada');
      return await alternativa.update(data);
    } catch (error) {
      throw new Error('Erro ao atualizar alternativa: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const alternativa = await Alternativa.findByPk(id);
      if (!alternativa) throw new Error('Alternativa não encontrada');
      await alternativa.destroy();
      return alternativa;
    } catch (error) {
      throw new Error('Erro ao deletar alternativa: ' + error.message);
    }
  }
}

module.exports = new AlternativaController();
