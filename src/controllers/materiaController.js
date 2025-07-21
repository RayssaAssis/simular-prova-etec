
const { Materia } = require('../../models'); // APENAS Materia

class MateriaController {
  async getAll() {
    try {
      console.log('=== DEBUG: Tentando buscar matérias ===');
      const result = await Materia.findAll({
        where: { ativo: true },
        order: [['nome', 'ASC']]
      });
      console.log('=== DEBUG: Encontradas', result.length, 'matérias ===');
      return result;
    } catch (error) {
      console.log('=== DEBUG: Erro ===', error.message);
      throw new Error('Erro ao buscar matérias: ' + error.message);
    }
  }

  async getById(id) {
    try {
      const materia = await Materia.findByPk(id);
      if (!materia) throw new Error('Matéria não encontrada');
      return materia;
    } catch (error) {
      throw new Error('Erro ao buscar matéria por ID: ' + error.message);
    }
  }

  async create(dados) {
    try {
      return await Materia.create(dados);
    } catch (error) {
      throw new Error('Erro ao criar matéria: ' + error.message);
    }
  }

  async update(id, dados) {
    try {
      const materia = await Materia.findByPk(id);
      if (!materia) throw new Error('Matéria não encontrada');
      return await materia.update(dados);
    } catch (error) {
      throw new Error('Erro ao atualizar matéria: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const materia = await Materia.findByPk(id);
      if (!materia) throw new Error('Matéria não encontrada');
      await materia.destroy();
      return materia;
    } catch (error) {
      throw new Error('Erro ao deletar matéria: ' + error.message);
    }
  }
}

module.exports = new MateriaController();