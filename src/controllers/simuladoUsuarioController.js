const { SimuladoResposta, Simulado } = require('../../models');

class SimuladoUsuarioController {
  async getByUserId(userId) {
    try {
      const simulados = await Simulado.findAll({
        where: { id_usuario: userId },
        attributes: ['id']
      });

      if (simulados.length === 0) {
        return [];
      }

      const simuladoIds = simulados.map(s => s.id);

      const respostas = await SimuladoResposta.findAll({
        where: { id_simulado: simuladoIds },
        order: [['id', 'ASC']]
      });

      return respostas;
    } catch (error) {
      throw new Error('Erro ao buscar respostas do usuário: ' + error.message);
    }
  }
}

module.exports = new SimuladoUsuarioController();