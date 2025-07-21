// src/routes/index.js
const express = require('express');
const router = express.Router();
const path = require('path');

const availableRoutes = [ 
  { path: '/auth', module: path.join(__dirname, 'auth.js'), description: 'Autenticação e autorização' },
  { path: '/disciplinas', module: path.join(__dirname, 'disciplinas.js'), description: 'Gerenciamento de disciplinas' },
  { path: '/materias', module: path.join(__dirname, 'materias.js'), description: 'Gerenciamento de matérias' },
  { path: '/provas', module: path.join(__dirname, 'provas.js'), description: 'Gerenciamento de provas' },
  { path: '/questoes', module: path.join(__dirname, 'questoes.js'), description: 'Gerenciamento de questões' },
  { path: '/alternativas', module: path.join(__dirname, 'alternativas.js'), description: 'Gerenciamento de alternativas' },
  { path: '/usuarios', module: path.join(__dirname, 'usuarios.js'), description: 'Gerenciamento de usuários' },
  { path: '/simulados', module: path.join(__dirname, 'simulados.js'), description: 'Sistema de simulados' }
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
    console.log(`⚠️ Erro ao carregar ${route.path}:`, error.stack || error.message);
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