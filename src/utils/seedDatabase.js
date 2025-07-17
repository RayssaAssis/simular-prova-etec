// src/utils/seedDatabase.js
const { logger } = require('../middleware/logger');

/**
 * Inserir dados iniciais no banco (apenas em desenvolvimento)
 */
async function seedDatabase() {
  // Só executar em desenvolvimento
  if (process.env.NODE_ENV === 'production') {
    logger.info('Ambiente de produção - pulando seed');
    return;
  }

  try {
    const { 
      Disciplina, 
      Materia, 
      Prova, 
      Usuario, 
      Questao, 
      Alternativa 
    } = require('../../models');

    // Verificar se já existem dados
    const disciplinasCount = await Disciplina.count();
    if (disciplinasCount > 0) {
      logger.info('Dados já existem no banco');
      return;
    }

    logger.info('Inserindo dados iniciais...');

    // Inserir disciplinas
    const disciplinas = await Disciplina.bulkCreate([
      { nome: 'Matemática', descricao: 'Álgebra, geometria e estatística', ativo: true },
      { nome: 'Português', descricao: 'Gramática, literatura e interpretação', ativo: true },
      { nome: 'História', descricao: 'História do Brasil e mundial', ativo: true },
      { nome: 'Geografia', descricao: 'Geografia física e humana', ativo: true },
      { nome: 'Física', descricao: 'Mecânica, eletricidade e óptica', ativo: true },
      { nome: 'Química', descricao: 'Química geral, orgânica e inorgânica', ativo: true }
    ]);

    // Inserir matérias
    await Materia.bulkCreate([
      { id_disciplina: 1, nome: 'Álgebra', descricao: 'Equações e funções', ativo: true },
      { id_disciplina: 1, nome: 'Geometria', descricao: 'Formas geométricas', ativo: true },
      { id_disciplina: 2, nome: 'Gramática', descricao: 'Regras da língua portuguesa', ativo: true },
      { id_disciplina: 2, nome: 'Literatura', descricao: 'Literatura brasileira e portuguesa', ativo: true },
      { id_disciplina: 3, nome: 'História do Brasil', descricao: 'História nacional', ativo: true },
      { id_disciplina: 4, nome: 'Geografia Física', descricao: 'Relevo, clima e hidrografia', ativo: true }
    ]);

    // Inserir provas
    const anoAtual = new Date().getFullYear();
    const provas = [];
    for (let ano = anoAtual - 2; ano <= anoAtual; ano++) {
      provas.push(
        { ano, semestre: '1', ativo: true },
        { ano, semestre: '2', ativo: true }
      );
    }
    await Prova.bulkCreate(provas);

    // Inserir usuários de exemplo
    const bcrypt = require('bcryptjs');
    await Usuario.bulkCreate([
      {
        nome: 'Administrador do Sistema',
        email: 'admin@simuladoretec.com',
        senha: await bcrypt.hash('admin123', 12),
        nivel_acesso: 'admin',
        cidade: 'São Paulo',
        ativo: true
      },
      {
        nome: 'Professor Silva',
        email: 'professor@simuladoretec.com',
        senha: await bcrypt.hash('prof123', 12),
        nivel_acesso: 'professor',
        cidade: 'São Paulo',
        ativo: true
      },
      {
        nome: 'João Estudante',
        email: 'joao@exemplo.com',
        senha: await bcrypt.hash('123456', 12),
        nivel_acesso: 'estudante',
        cidade: 'Santos',
        ativo: true
      }
    ]);

    // Inserir questões de exemplo
    await Questao.bulkCreate([
      {
        id_materia: 1, // Álgebra
        id_prova: 1,
        enunciado: 'Resolva a equação: 2x + 5 = 15',
        ativo: true
      },
      {
        id_materia: 3, // Gramática
        id_prova: 1,
        enunciado: 'Qual é a função sintática do termo "livro" na frase: "Li o livro ontem"?',
        ativo: true
      }
    ]);

    // Inserir alternativas
    await Alternativa.bulkCreate([
      // Questão 1 - Álgebra
      { id_questao: 1, alternativa_texto: 'x = 3', alternativa_correta: false, posicao: 'A' },
      { id_questao: 1, alternativa_texto: 'x = 5', alternativa_correta: true, posicao: 'B' },
      { id_questao: 1, alternativa_texto: 'x = 7', alternativa_correta: false, posicao: 'C' },
      { id_questao: 1, alternativa_texto: 'x = 10', alternativa_correta: false, posicao: 'D' },
      
      // Questão 2 - Gramática
      { id_questao: 2, alternativa_texto: 'Sujeito', alternativa_correta: false, posicao: 'A' },
      { id_questao: 2, alternativa_texto: 'Objeto direto', alternativa_correta: true, posicao: 'B' },
      { id_questao: 2, alternativa_texto: 'Predicado', alternativa_correta: false, posicao: 'C' },
      { id_questao: 2, alternativa_texto: 'Adjunto adverbial', alternativa_correta: false, posicao: 'D' }
    ]);

    logger.success('Dados iniciais inseridos com sucesso!', {
      disciplinas: disciplinas.length,
      materias: 6,
      provas: provas.length,
      usuarios: 3,
      questoes: 2,
      alternativas: 8
    });

  } catch (error) {
    logger.error('Erro ao inserir dados iniciais', error);
    throw error;
  }
}

/**
 * Limpar dados do banco (cuidado!)
 */
async function clearDatabase() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Não é possível limpar dados em produção');
  }

  const { 
    Alternativa, 
    Questao, 
    Usuario, 
    Prova, 
    Materia, 
    Disciplina 
  } = require('../../models');

  logger.warn('Limpando dados do banco...');

  await Alternativa.destroy({ where: {}, force: true });
  await Questao.destroy({ where: {}, force: true });
  await Usuario.destroy({ where: {}, force: true });
  await Prova.destroy({ where: {}, force: true });
  await Materia.destroy({ where: {}, force: true });
  await Disciplina.destroy({ where: {}, force: true });

  logger.success('Dados limpos com sucesso');
}

module.exports = {
  seedDatabase,
  clearDatabase
};