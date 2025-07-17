// src/controllers/disciplinaController.js
const { Disciplina, Materia, Questao } = require('../../models');

class DisciplinaController {
  // Listar todas as disciplinas
  async index(req, res) {
    try {
      const { incluir_materias = false } = req.query;

      const options = {
        where: { ativo: true },
        order: [['nome', 'ASC']]
      };

      if (incluir_materias === 'true') {
        options.include = [{
          model: Materia,
          as: 'materias',
          where: { ativo: true },
          required: false,
          attributes: ['id', 'nome', 'descricao']
        }];
      }

      const disciplinas = await Disciplina.findAll(options);

      res.json({
        success: true,
        data: disciplinas,
        total: disciplinas.length
      });
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
      res.status(500).json({ 
        success: false,
        error: 'Erro interno do servidor',
        message: error.message 
      });
    }
  }

  // Buscar disciplina por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const { incluir_materias = false, incluir_questoes = false } = req.query;

      const options = {
        where: { id, ativo: true }
      };

      if (incluir_materias === 'true') {
        options.include = [{
          model: Materia,
          as: 'materias',
          where: { ativo: true },
          required: false,
          attributes: ['id', 'nome', 'descricao']
        }];

        if (incluir_questoes === 'true') {
          options.include[0].include = [{
            model: Questao,
            as: 'questoes',
            where: { ativo: true },
            required: false,
            attributes: ['id', 'enunciado'],
            limit: 5 // Limitar para não sobrecarregar
          }];
        }
      }

      const disciplina = await Disciplina.findOne(options);

      if (!disciplina) {
        return res.status(404).json({ 
          success: false,
          error: 'Disciplina não encontrada' 
        });
      }

      res.json({
        success: true,
        data: disciplina
      });
    } catch (error) {
      console.error('Erro ao buscar disciplina:', error);
      res.status(500).json({ 
        success: false,
        error: 'Erro interno do servidor',
        message: error.message 
      });
    }
  }

  // Criar nova disciplina (apenas admin)
  async create(req, res) {
    try {
      const { nome, descricao } = req.body;

      const disciplina = await Disciplina.create({
        nome,
        descricao
      });

      res.status(201).json({
        success: true,
        data: disciplina,
        message: 'Disciplina criada com sucesso'
      });
    } catch (error) {
      console.error('Erro ao criar disciplina:', error);
      
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          detalhes: error.errors.map(e => ({
            campo: e.path,
            mensagem: e.message
          }))
        });
      }

      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          success: false,
          error: 'Já existe uma disciplina com este nome'
        });
      }
      
      res.status(500).json({ 
        success: false,
        error: 'Erro interno do servidor',
        message: error.message 
      });
    }
  }

  // Atualizar disciplina (apenas admin)
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, ativo } = req.body;

      const disciplina = await Disciplina.findByPk(id);

      if (!disciplina) {
        return res.status(404).json({ 
          success: false,
          error: 'Disciplina não encontrada' 
        });
      }

      await disciplina.update({
        nome: nome || disciplina.nome,
        descricao: descricao !== undefined ? descricao : disciplina.descricao,
        ativo: ativo !== undefined ? ativo : disciplina.ativo
      });

      res.json({
        success: true,
        data: disciplina,
        message: 'Disciplina atualizada com sucesso'
      });
    } catch (error) {
      console.error('Erro ao atualizar disciplina:', error);
      
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          detalhes: error.errors.map(e => ({
            campo: e.path,
            mensagem: e.message
          }))
        });
      }
      
      res.status(500).json({ 
        success: false,
        error: 'Erro interno do servidor',
        message: error.message 
      });
    }
  }

  // Desativar disciplina (soft delete)
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const disciplina = await Disciplina.findByPk(id);

      if (!disciplina) {
        return res.status(404).json({ 
          success: false,
          error: 'Disciplina não encontrada' 
        });
      }

      await disciplina.update({ ativo: false });

      res.json({
        success: true,
        message: 'Disciplina desativada com sucesso'
      });
    } catch (error) {
      console.error('Erro ao desativar disciplina:', error);
      res.status(500).json({ 
        success: false,
        error: 'Erro interno do servidor',
        message: error.message 
      });
    }
  }
}

module.exports = new DisciplinaController();