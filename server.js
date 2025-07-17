// // server.js
// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middlewares básicos
// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Log simples
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//   next();
// });

// // Rota principal
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'API Simulador ETEC funcionando!',
//     version: '1.0.0',
//     express: '4.x',
//     timestamp: new Date().toISOString()
//   });
// });

// // Rota de saúde
// app.get('/health', async (req, res) => {
//   try {
//     const { sequelize } = require('./models');
//     await sequelize.authenticate();
    
//     res.json({
//       status: 'ok',
//       database: 'connected',
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     res.status(503).json({
//       status: 'error',
//       database: 'disconnected',
//       error: error.message
//     });
//   }
// });

// // API Disciplinas
// app.get('/api/disciplinas', async (req, res) => {
//   try {
//     const { Disciplina, Materia } = require('./models');
    
//     const options = {
//       where: { ativo: true },
//       order: [['nome', 'ASC']]
//     };
    
//     if (req.query.incluir_materias === 'true') {
//       options.include = [{
//         model: Materia,
//         as: 'materias',
//         where: { ativo: true },
//         required: false
//       }];
//     }
    
//     const disciplinas = await Disciplina.findAll(options);
    
//     res.json(disciplinas)
//     // res.json({
//     //   success: true,
//     //   data: disciplinas,
//     //   total: disciplinas.length
//     // });
//   } catch (error) {
//     console.error('Erro:', error);
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// // Middleware de erro
// app.use((err, req, res, next) => {
//   console.error('Erro:', err);
//   res.status(500).json({ error: 'Erro interno' });
// });

// // 404
// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Rota não encontrada' });
// });

// // Função para inserir dados
// async function inserirDados() {
//   try {
//     const { Disciplina, Materia, Prova, Usuario, Questao, Alternativa } = require('./models');
    
//     const count = await Disciplina.count();
//     if (count > 0) {
//       console.log('✅ Dados já existem');
//       return;
//     }
    
//     console.log('🌱 Inserindo dados...');
    
//     // Disciplinas
//     await Disciplina.bulkCreate([
//       { nome: 'Matemática', descricao: 'Álgebra e geometria', ativo: true },
//       { nome: 'Português', descricao: 'Gramática e literatura', ativo: true },
//       { nome: 'História', descricao: 'História do Brasil', ativo: true }
//     ]);
    
//     // Matérias
//     await Materia.bulkCreate([
//       { id_disciplina: 1, nome: 'Álgebra', descricao: 'Equações', ativo: true },
//       { id_disciplina: 2, nome: 'Gramática', descricao: 'Regras', ativo: true }
//     ]);
    
//     // Provas
//     await Prova.bulkCreate([
//       { ano: 2024, semestre: '1', ativo: true },
//       { ano: 2024, semestre: '2', ativo: true }
//     ]);
    
//     // Usuários
//     const bcrypt = require('bcryptjs');
//     await Usuario.bulkCreate([
//       {
//         nome: 'Admin',
//         email: 'admin@teste.com',
//         senha: await bcrypt.hash('123456', 10),
//         nivel_acesso: 'admin',
//         ativo: true
//       }
//     ]);
    
//     // Questões
//     await Questao.bulkCreate([
//       {
//         id_materia: 1,
//         id_prova: 1,
//         enunciado: 'Quanto é 2 + 2?',
//         ativo: true
//       }
//     ]);
    
//     // Alternativas
//     await Alternativa.bulkCreate([
//       { id_questao: 1, alternativa_texto: '3', alternativa_correta: false, posicao: 'A' },
//       { id_questao: 1, alternativa_texto: '4', alternativa_correta: true, posicao: 'B' },
//       { id_questao: 1, alternativa_texto: '5', alternativa_correta: false, posicao: 'C' },
//       { id_questao: 1, alternativa_texto: '6', alternativa_correta: false, posicao: 'D' }
//     ]);
    
//     console.log('✅ Dados inseridos!');
    
//   } catch (error) {
//     console.error('❌ Erro ao inserir dados:', error.message);
//   }
// }

// // Iniciar servidor
// async function iniciar() {
//   try {
//     const { sequelize } = require('./models');
    
//     console.log('🔍 Conectando...');
//     await sequelize.authenticate();
//     console.log('✅ Conectado ao MySQL!');
    
//     console.log('🔄 Criando tabelas...');
//     await sequelize.sync({ alter: true });
//     console.log('✅ Tabelas criadas!');
    
//     await inserirDados();
    
//     app.listen(PORT, () => {
//       console.log(`🚀 Servidor: http://localhost:${PORT}`);
//       console.log(`🏥 Health: http://localhost:${PORT}/health`);
//       console.log(`📚 Disciplinas: http://localhost:${PORT}/api/disciplinas`);
//     });
    
//   } catch (error) {
//     console.error('❌ Erro:', error.message);
//     console.log('Verifique: MySQL rodando? Credenciais .env? Arquivo models/index.js existe?');
//   }
// }

// iniciar();
// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Importar configurações e utilitários
const { connectDatabase, syncDatabase } = require('./src/config/database');
const routes = require('./src/routes');
const { errorHandler, notFoundHandler } = require('./src/middleware/errorHandlers');
const { requestLogger } = require('./src/middleware/logger');
const { seedDatabase } = require('./src/utils/seedDatabase');

const app = express();
const PORT = process.env.PORT || 3000;

// === MIDDLEWARES GLOBAIS ===
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logger personalizado
app.use(requestLogger);

// === ROTAS PRINCIPAIS ===

// Rota de informações da API
app.get('/', (req, res) => {
  res.json({
    name: 'Simulador ETEC API',
    version: '1.0.0',
    description: 'API para sistema de simulados da ETEC',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    docs: {
      health: '/health',
      endpoints: '/api'
    }
  });
});

// Health check
app.get('/health', async (req, res) => {
  try {
    const { sequelize } = require('./models');
    await sequelize.authenticate();
    
    res.json({
      status: 'healthy',
      database: 'connected',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      memory: process.memoryUsage()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// === ROTAS DA API ===
app.use('/api', routes);

// === MIDDLEWARES DE ERRO ===
app.use(notFoundHandler);
app.use(errorHandler);

// === INICIALIZAÇÃO DO SERVIDOR ===
async function startServer() {
  try {
    console.log('🚀 Iniciando Simulador ETEC API...');
    
    // Conectar ao banco de dados
    await connectDatabase();
    
    // Sincronizar modelos
    await syncDatabase();
    
    // Inserir dados iniciais (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      await seedDatabase();
    }
    
    // Iniciar servidor
    const server = app.listen(PORT, () => {
      console.log('\n✅ Servidor iniciado com sucesso!');
      console.log(`📍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
      console.log(`📋 API Base: http://localhost:${PORT}/api`);
      console.log('\n🎯 API pronta para uso!\n');
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      console.log(`\n📝 Recebido sinal ${signal}, encerrando servidor...`);
      
      server.close(async () => {
        try {
          const { sequelize } = require('./models');
          await sequelize.close();
          console.log('✅ Conexões fechadas com sucesso');
          process.exit(0);
        } catch (error) {
          console.error('❌ Erro ao fechar conexões:', error);
          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Falha ao iniciar servidor:', error);
    console.log('\n🔧 Verifique:');
    console.log('• MySQL está rodando?');
    console.log('• Variáveis do .env estão corretas?');
    console.log('• Todas as dependências estão instaladas?');
    process.exit(1);
  }
}

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('💥 Erro não capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Promise rejeitada:', reason);
  process.exit(1);
});

// Iniciar aplicação
if (require.main === module) {
  startServer();
}

module.exports = app;