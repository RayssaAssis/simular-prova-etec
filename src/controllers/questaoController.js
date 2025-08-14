
const { Questao, Materia, Prova, Alternativa } = require('../../models');

class QuestaoController {
  // Buscar todas as questões ativas com include
  async getAll() {
    try {
      const questoes = await Questao.findAll({
        where: { ativo: true },
        include: [
          { model: Materia, as: 'materia' },
          { model: Prova, as: 'prova' },
          { model: Alternativa, as: 'alternativas' }
        ],
        order: [['id', 'ASC']]
      });
      return questoes;
    } catch (error) {
      throw new Error('Erro ao buscar questões: ' + error.message);
    }
  }

  // Buscar questão por ID com include
  async getById(id) {
    try {
      const questao = await Questao.findByPk(id, {
        include: [
          { model: Materia, as: 'materia' },
          { model: Prova, as: 'prova' },
          { model: Alternativa, as: 'alternativas' }
        ]
      });

      if (!questao) throw new Error('Questão não encontrada');
      return questao;
    } catch (error) {
      throw new Error('Erro ao buscar questão por ID: ' + error.message);
    }
  }

  // Criar nova questão
  async create(data) {
    try {
      const questao = await Questao.create(data);
      return questao;
    } catch (error) {
      throw new Error('Erro ao criar questão: ' + error.message);
    }
  }

  // Atualizar questão existente
  async update(id, data) {
    try {
      const questao = await Questao.findByPk(id);
      if (!questao) {
        throw new Error('Questão não encontrada');
      }
      
      await questao.update(data);
      return questao;
    } catch (error) {
      throw new Error('Erro ao atualizar questão: ' + error.message);
    }
  }

  // Deletar questão
  async delete(id) {
    try {
      const questao = await Questao.findByPk(id);
      if (!questao) {
        throw new Error('Questão não encontrada');
      }
      
      await questao.destroy();
       return questao; 
    } catch (error) {
      throw new Error('Erro ao deletar questão: ' + error.message);
    }
  }
}

module.exports = new QuestaoController();