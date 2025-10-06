// ==========================================
// server.js - CÓDIGO FINAL COM BYPASS DE SINCRONIZAÇÃO E TODAS AS ROTAS CONECTADAS
// ==========================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Importar configurações e utilitários
const { connectDatabase, syncDatabase } = require('./src/config/database');
const { errorHandler, notFoundHandler } = require('./src/middleware/errorHandlers');
const { requestLogger } = require('./src/middleware/logger');
const { seedDatabase } = require('./src/utils/seedDatabase');

const app = express();
const PORT = process.env.PORT || 3000;

// --- DEFINIÇÃO E CARREGAMENTO DE ARQUIVOS DE ROTAS ---
try {
    // ROTAS DE AUTENTICAÇÃO E USUÁRIOS
    const authRoutes = require('./src/routes/auth.js'); 
    const usuariosRoutes = require('./src/routes/usuarios.js'); 
    
    // ROTAS DE SIMULADO
    const simuladosRoutes = require('./src/routes/simulados.js'); 
    const simuladoRespostaRoutes = require('./src/routes/simuladoRespostas.js'); 
    
    // ROTAS DE DADOS DA PÁGINA DE QUESTÕES (CORREÇÃO DE CONEXÃO APLICADA AQUI!)
    const questaoRoutes = require('./src/routes/questoes.js'); 
    const alternativaRoutes = require('./src/routes/alternativas.js'); 
    
    // NOVAS ROTAS NECESSÁRIAS (Ajuste o nome do arquivo se não for este!)
    const disciplinaRoutes = require('./src/routes/disciplinas.js'); // Assumido o nome 'disciplinas.js'
    const materiaRoutes = require('./src/routes/materias.js'); // Assumido o nome 'materias.js'
    const provaRoutes = require('./src/routes/provas.js'); // Assumido o nome 'provas.js'

    // Colocando as variáveis em um objeto para uso no try...catch
    global.routeFiles = { 
        authRoutes, usuariosRoutes, simuladosRoutes, simuladoRespostaRoutes, 
        questaoRoutes, alternativaRoutes, disciplinaRoutes, materiaRoutes, provaRoutes
    };

} catch (error) {
    console.error('❌ ERRO FATAL DE IMPORTAÇÃO DE ARQUIVOS DE ROTAS:', error.message);
    console.warn('⚠️ O servidor falhou ao carregar um arquivo de rotas. O caminho ou nome do arquivo está incorreto.');
    process.exit(1);
}


// === MIDDLEWARES GLOBAIS ===
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: "http://127.0.0.1:5500" || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logger personalizado
app.use(requestLogger);

// === AGREGAÇÃO E CONEXÃO DAS ROTAS DA API ===

const apiRouter = express.Router();

// ROTAS DE AUTENTICAÇÃO E USUÁRIOS
apiRouter.use('/auth', global.routeFiles.authRoutes);
apiRouter.use('/users', global.routeFiles.usuariosRoutes); 

// ROTAS DO SIMULADO/ESTATÍSTICAS
apiRouter.use('/simulados', global.routeFiles.simuladosRoutes);
apiRouter.use('/simuladoRespostas', global.routeFiles.simuladoRespostaRoutes);

// ROTAS DE DADOS DO QUIZ/FILTROS (CORREÇÃO APLICADA AQUI!)
apiRouter.use('/questoes', global.routeFiles.questaoRoutes); 
apiRouter.use('/alternativas', global.routeFiles.alternativaRoutes); 
apiRouter.use('/disciplinas', global.routeFiles.disciplinaRoutes); // CONECTADA
apiRouter.use('/materias', global.routeFiles.materiaRoutes); // CONECTADA
apiRouter.use('/provas', global.routeFiles.provaRoutes); // CONECTADA

// Conecta todas as rotas sob /api
app.use('/api', apiRouter);


// === ROTAS DE INFORMAÇÃO E CHECK ===
app.get('/', (req, res) => {
  // ...
});

app.get('/health', async (req, res) => {
  // ...
});


// === MIDDLEWARES DE ERRO ===
app.use(notFoundHandler);
app.use(errorHandler);

// === INICIALIZAÇÃO DO SERVIDOR ===
async function startServer() {
  try {
    console.log('🚀 Iniciando Simulador ETEC API...');
    
    // Conectar ao banco de dados
    await connectDatabase();
    
    // Sincronizar modelos (COM BYPASS DE ERRO DE CHAVES)
    try {
        console.log('🔄 Tentando sincronizar modelos do Sequelize...');
        await syncDatabase();
        console.log('✅ Sincronização de modelos bem-sucedida.');
    } catch (syncError) {
        console.warn('⚠️ Falha ao sincronizar modelos! O servidor ligará, mas verifique o Model de usuários.');
        console.error('❌ Erro de Sincronização Detalhado:', syncError.message);
    }
    
    // Iniciar servidor
    const server = app.listen(PORT, () => {
      console.log('\n✅ Servidor iniciado com sucesso!');
      console.log(`📍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`📋 API Base: http://localhost:${PORT}/api`);
      console.log('\n🎯 API pronta para uso!\n');
    });
    
    // ... (Graceful shutdown, etc.)

  } catch (error) {
    console.error('❌ Falha ao iniciar servidor:', error);
    console.log('\n🔧 Verifique:');
    console.log('• MySQL está rodando?');
    console.log('• Variáveis do .env estão corretas?');
    console.log('• Todas as dependências estão instaladas?');
    process.exit(1);
  }
}

// ... (Tratamento de erros não capturados, etc.)

// Iniciar aplicação
if (require.main === module) {
  startServer();
}

module.exports = app;