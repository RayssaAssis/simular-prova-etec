// src/middleware/logger.js

/**
 * Middleware de logging de requisições
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  
  // Capturar quando a resposta termina
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl, ip } = req;
    const { statusCode } = res;
    
    // Determinar cor baseada no status
    const getStatusColor = (status) => {
      if (status >= 500) return '\x1b[31m'; // Vermelho
      if (status >= 400) return '\x1b[33m'; // Amarelo
      if (status >= 300) return '\x1b[36m'; // Ciano
      if (status >= 200) return '\x1b[32m'; // Verde
      return '\x1b[37m'; // Branco
    };

    const resetColor = '\x1b[0m';
    const statusColor = getStatusColor(statusCode);
    
    // Log formatado
    console.log(
      `${timestamp} | ` +
      `${statusColor}${statusCode}${resetColor} | ` +
      `${duration.toString().padStart(4)}ms | ` +
      `${method.padEnd(6)} | ` +
      `${originalUrl} | ` +
      `${ip}`
    );
  });

  next();
};

/**
 * Logger para desenvolvimento (mais detalhado)
 */
const developmentLogger = (req, res, next) => {
  if (process.env.NODE_ENV !== 'development') {
    return next();
  }

  const start = Date.now();
  
  console.log('\n📥 Nova requisição:', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  if (Object.keys(req.body).length > 0) {
    console.log('📄 Body:', req.body);
  }

  if (Object.keys(req.query).length > 0) {
    console.log('🔍 Query:', req.query);
  }

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log('📤 Resposta:', {
      status: res.statusCode,
      duration: `${duration}ms`,
      contentType: res.get('Content-Type')
    });
  });

  next();
};

/**
 * Logger para erros
 */
const errorLogger = (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  
  console.error(`\n🚨 [${timestamp}] Erro capturado:`);
  console.error(`📍 Rota: ${req.method} ${req.originalUrl}`);
  console.error(`🔍 IP: ${req.ip}`);
  console.error(`❌ Erro: ${err.message}`);
  
  if (process.env.NODE_ENV === 'development') {
    console.error(`📚 Stack:\n${err.stack}`);
  }
  
  next(err);
};

/**
 * Logger personalizado para diferentes níveis
 */
const logger = {
  info: (message, data = {}) => {
    console.log(`ℹ️  [${new Date().toISOString()}] INFO: ${message}`, data);
  },
  
  warn: (message, data = {}) => {
    console.warn(`⚠️  [${new Date().toISOString()}] WARN: ${message}`, data);
  },
  
  error: (message, error = null) => {
    console.error(`❌ [${new Date().toISOString()}] ERROR: ${message}`);
    if (error) {
      console.error(error);
    }
  },
  
  success: (message, data = {}) => {
    console.log(`✅ [${new Date().toISOString()}] SUCCESS: ${message}`, data);
  },
  
  debug: (message, data = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🐛 [${new Date().toISOString()}] DEBUG: ${message}`, data);
    }
  }
};

module.exports = {
  requestLogger,
  developmentLogger,
  errorLogger,
  logger
};