// scripts/verificar.js
const { sequelize, Usuario, Disciplina, Materia, Prova, Questao, Alternativa } = require('../models');

async function verificarTudo() {
  try {
    console.log('🔍 Verificando conexão com o banco...');
    await sequelize.authenticate();
    console.log('✅ Conexão estabelecida com sucesso!');
    
    console.log('\n📊 Contando registros em cada tabela...');
    
    const tabelas = [
      { nome: 'Usuários', model: Usuario },
      { nome: 'Disciplinas', model: Disciplina },
      { nome: 'Matérias', model: Materia },
      { nome: 'Provas', model: Prova },
      { nome: 'Questões', model: Questao },
      { nome: 'Alternativas', model: Alternativa }
    ];
    
    for (const tabela of tabelas) {
      const count = await tabela.model.count();
      console.log(`✅ ${tabela.nome.padEnd(15)} | ${count.toString().padStart(3)} registros`);
    }
    
    console.log('\n🔗 Testando relacionamentos...');
    
    // Testar disciplina com matérias
    const disciplinaComMaterias = await Disciplina.findOne({
      include: [{ model: Materia, as: 'materias' }]
    });
    
    if (disciplinaComMaterias && disciplinaComMaterias.materias.length > 0) {
      console.log('✅ Relacionamento Disciplina → Matéria OK');
    } else {
      console.log('❌ Relacionamento Disciplina → Matéria com problema');
    }
    
    // Testar questão com alternativas
    const questaoComAlternativas = await Questao.findOne({
      include: [{ model: Alternativa, as: 'alternativas' }]
    });
    
    if (questaoComAlternativas && questaoComAlternativas.alternativas.length > 0) {
      console.log('✅ Relacionamento Questão → Alternativa OK');
    } else {
      console.log('❌ Relacionamento Questão → Alternativa com problema');
    }
    
    console.log('\n✅ Verificação concluída com sucesso!');
    console.log('\n🚀 Próximos comandos disponíveis:');
    console.log('   npm run dev          - Iniciar servidor');
    console.log('   npm run db:check     - Verificar conexão');
    
    // Teste de API
    console.log('\n🌐 URLs para testar:');
    console.log('   http://localhost:3000');
    console.log('   http://localhost:3000/health');
    console.log('   http://localhost:3000/api/disciplinas');
    console.log('   http://localhost:3000/api/questoes');
    
  } catch (error) {
    console.error('❌ Erro na verificação:', error.message);
  } finally {
    await sequelize.close();
  }
}

verificarTudo();