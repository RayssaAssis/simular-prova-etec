
const { Simulado } = require('../../models'); // APENAS simulado

class SimuladoController {
  async getAll() {
    try {
      const result = await Simulado.findAll({
        order: [['id', 'ASC']]
      });
      return result;
    } catch (error) {
      throw new Error('Erro ao buscar simulado: ' + error.message);
    }
  }

  async getById(id) {
    try {
      const simulado = await Simulado.findByPk(id);
      if (!simulado) throw new Error('simulado não encontrada');
      return simulado;
    } catch (error) {
      throw new Error('Erro ao buscar simulado por ID: ' + error.message);
    }
  }

  async getByUserId(userId) {
  try {
    const simulados = await Simulado.findAll({
      where: { id_usuario: userId },
      order: [['id', 'DESC']]
    });
    return simulados;
  } catch (error) {
    throw new Error('Erro ao buscar simulados do usuário: ' + error.message);
  }
}

  async create(dados) {
    try {
      return await Simulado.create(dados);
    } catch (error) {
      throw new Error('Erro ao criar simulado: ' + error.message);
    }
  }

  async update(id, dados) {
    try {
      const simulado = await Simulado.findByPk(id);
      if (!simulado) throw new Error('simulado não encontrada');
      return await simulado.update(dados);
    } catch (error) {
      throw new Error('Erro ao atualizar simulado: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const simulado = await Simulado.findByPk(id);
      if (!simulado) throw new Error('simulado não encontrada');
      await simulado.destroy();
      return simulado;
    } catch (error) {
      throw new Error('Erro ao deletar simulado: ' + error.message);
    }
  }
}

module.exports = new SimuladoController();