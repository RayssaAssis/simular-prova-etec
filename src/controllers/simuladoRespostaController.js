const { SimuladoResposta } = require('../../models');

class SimuladoRespostaController {
  async getAll() {
    try {
      const result = await SimuladoResposta.findAll({
        order: [['id', 'ASC']]
      });
      return result;
    } catch (error) {
      throw new Error('Erro ao buscar respostas do simulado: ' + error.message);
    }
  }

  async getById(id) {
    try {
      const resposta = await SimuladoResposta.findByPk(id);
      if (!resposta) throw new Error('Resposta de simulado não encontrada');
      return resposta;
    } catch (error) {
      throw new Error('Erro ao buscar resposta por ID: ' + error.message);
    }
  }

  async create(dados) {
    try {
      return await SimuladoResposta.create(dados);
    } catch (error) {
      throw new Error('Erro ao criar resposta do simulado: ' + error.message);
    }
  }

  async update(id, dados) {
    try {
      const resposta = await SimuladoResposta.findByPk(id);
      if (!resposta) throw new Error('Resposta de simulado não encontrada');
      return await resposta.update(dados);
    } catch (error) {
      throw new Error('Erro ao atualizar resposta do simulado: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const resposta = await SimuladoResposta.findByPk(id);
      if (!resposta) throw new Error('Resposta de simulado não encontrada');
      await resposta.destroy();
      return resposta;
    } catch (error) {
      throw new Error('Erro ao deletar resposta do simulado: ' + error.message);
    }
  }
}

module.exports = new SimuladoRespostaController();
