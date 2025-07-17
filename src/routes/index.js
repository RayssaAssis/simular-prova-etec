// src/routes/index.js
const express = require('express');
const router = express.Router();

// Lista de rotas disponíveis
const availableRoutes = [
  { path: '/auth', module: './auth', description: 'Autenticação e autorização' },
  { path: '/disciplinas', module: './disciplinas', description: 'Gerenciamento de disciplinas' },
  { path: '/materias', module: './materias', description: 'Gerenciamento de matérias' },
  { path: '/provas', module: './provas', description: 'Gerenciamento de provas' },
  { path: '/questoes', module: './questoes', description: 'Gerenciamento de questões' },
  { path: '/alternativas', module: './alternativas', description: 'Gerenciamento de alternativas' },
  { path: '/usuarios', module: './usuarios', description: 'Gerenciamento de usuários' },
  { path: '/simulados', module: './simulados', description: 'Sistema de simulados' }
];

// Carregar rotas dinamicamente
const loadedRoutes = [];
const failedRoutes = [];

availableRoutes.forEach(route => {
  try {
    const routeModule = require(route.module);
    router.use(route.path, routeModule);
    loadedRoutes.push({
      path: route.path,
      description: route.description,
      status: 'loaded'
    });
    console.log(`✅ Rotas ${route.path} carregadas`);
  } catch (error) {
    failedRoutes.push({
      path: route.path,
      description: route.description,
      status: 'failed',
      error: error.message
    });
    console.log(`⚠️ Rotas ${route.path} não encontradas`);
  }
});

// Rota de informações da API
router.get('/', (req, res) => {
  res.json({
    message: 'Simulador ETEC API',
    version: '1.0.0',
    endpoints: {
      loaded: loadedRoutes,
      failed: failedRoutes,
      total_loaded: loadedRoutes.length,
      total_failed: failedRoutes.length
    },
    documentation: {
      base_url: `${req.protocol}://${req.get('host')}/api`,
      health_check: `${req.protocol}://${req.get('host')}/health`
    }
  });
});

// Rota de status das rotas
router.get('/status', (req, res) => {
  res.json({
    routes_status: {
      loaded: loadedRoutes,
      failed: failedRoutes,
      summary: {
        total: availableRoutes.length,
        loaded: loadedRoutes.length,
        failed: failedRoutes.length,
        health: loadedRoutes.length > 0 ? 'healthy' : 'unhealthy'
      }
    }
  });
});

module.exports = router;