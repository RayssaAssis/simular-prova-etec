// src/middleware/errorHandlers.js

/**
 * Middleware para rotas não encontradas (404)
 */
const notFoundHandler = (req, res, next) => {
  const error = {
    success: false,
    error: 'Endpoint não encontrado',
    message: `A rota ${req.method} ${req.originalUrl} não existe`,
    timestamp: new Date().toISOString(),
    suggestion: 'Verifique a documentação da API em /api'
  };

  res.status(404).json(error);
};

/**
 * Middleware global de tratamento de erros
 */
const errorHandler = (err, req, res, next) => {
  // Log do erro (em produção, usar um logger apropriado)
  console.error(`[${new Date().toISOString()}] Erro capturado:`, {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip
  });

  // Determinar status code
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || 'Erro interno do servidor';

  // Tratar erros específicos do Sequelize
  if (err.name === 'SequelizeValidationError') {
    statusCode = 400;
    return res.status(statusCode).json({
      success: false,
      error: 'Dados inválidos',
      details: err.errors.map(e => ({
        field: e.path,
        message: e.message,
        value: e.value
      })),
      timestamp: new Date().toISOString()
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    return res.status(statusCode).json({
      success: false,
      error: 'Conflito de dados',
      details: err.errors.map(e => ({
        field: e.path,
        message: 'Este valor já está em uso',
        value: e.value
      })),
      timestamp: new Date().toISOString()
    });
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = 400;
    message = 'Referência inválida - o recurso relacionado não existe';
  }

  if (err.name === 'SequelizeConnectionError') {
    statusCode = 503;
    message = 'Erro de conexão com o banco de dados';
  }

  // Tratar erros de JWT
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token inválido';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expirado';
  }

  // Resposta de erro padronizada
  const errorResponse = {
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  };

  // Em desenvolvimento, incluir stack trace
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
    errorResponse.details = {
      name: err.name,
      originalMessage: err.message
    };
  }

  // Adicionar código de erro se disponível
  if (err.code) {
    errorResponse.code = err.code;
  }

  res.status(statusCode).json(errorResponse);
};

/**
 * Middleware para capturar erros assíncronos
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Middleware para validar IDs numéricos
 */
const validateNumericId = (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      error: 'ID inválido',
      message: 'O ID deve ser um número inteiro positivo',
      received: req.params.id
    });
  }
  
  req.params.id = id;
  next();
};

module.exports = {
  notFoundHandler,
  errorHandler,
  asyncHandler,
  validateNumericId
};