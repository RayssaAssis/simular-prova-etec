// src/controllers/disciplinaController.js
const { Disciplina, Materia, Questao } = require('../../models');

class DisciplinaController {

  // buscar todas as disciplinas

  async getAll() {
    try {
      const disciplinas = await Disciplina.findAll({
        // where: { ativo: true },
        order: [['nome', 'ASC']]
      });
      return disciplinas;
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao buscar disciplinas', detalhes: error.message });
    }
  }

  // Buscar uma disciplina por ID
  async getById(id) {
    try {
      const disciplina = await Disciplina.findByPk(id);
      if (!disciplina) {
        return res.status(404).json({ erro: 'Disciplina não encontrada' });
      }
      return disciplina;
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao buscar disciplina por id', detalhes: error.message });
    }
  }

  // // Criar nova disciplina
  async create(nome, descricao, ativo) {
    try {
      const disciplina = await Disciplina.create({ nome, descricao, ativo });
      return disciplina;
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao criar disciplina', detalhes: error.message });
    }
  }

  // // Atualizar disciplina existente

  async update(id, nome, descricao, ativo) {
    try {
      const disciplina = await Disciplina.findByPk(id);
      if (!disciplina) {
        return res.status(404).json({ erro: 'Disciplina não encontrada' });
      }
      const atualizacao = await disciplina.update({
        nome: nome || disciplina.nome,
        descricao: descricao !== undefined ? descricao : disciplina.descricao,
        ativo: ativo !== undefined ? ativo : disciplina.ativo
      });
      return atualizacao;
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao atualizar disciplina', detalhes: error.message });
    }
  }


  // Deletar disciplina

  async delete(id) {
    try {
      const disciplina = await Disciplina.findByPk(id);
      if (!disciplina) {
        return res.status(404).json({ erro: 'Disciplina não encontrada' });
      }
      await disciplina.destroy();
      return disciplina;
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar disciplina', detalhes: error.message });
    }
  }

}

module.exports = new DisciplinaController();