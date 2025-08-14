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
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
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
      // await seedDatabase(); desativada para poder acrescentar informações no seeders com sequelize-cli
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