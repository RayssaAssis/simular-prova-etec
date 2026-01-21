const { SimuladoResposta } = require('../../models');

class SimuladoEspecificoController {
  async getBySimuladoId(simuladoId) {
    try {
      const respostas = await SimuladoResposta.findAll({
        where: { id_simulado: simuladoId },
        order: [['id', 'ASC']]
      });

      return respostas;
    } catch (error) {
      throw new Error('Erro ao buscar respostas do simulado: ' + error.message);
    }
  }
}

module.exports = new SimuladoEspecificoController();