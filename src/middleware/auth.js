// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { Usuario } = require('../../models');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader;
  console.log(token);

  if (!token) {
    return res.status(401).json({ 
      error: 'Token de acesso requerido',
      codigo: 'TOKEN_REQUERIDO'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // Verificar se o usuário ainda existe e está ativo
    const usuario = await Usuario.findOne({
      where: { 
        id: decoded.userId,
        ativo: true 
      },
      attributes: ['id', 'nome', 'email', 'nivel_acesso', 'foto']
    });

      console.log(usuario);
    if (!usuario) {
      return res.status(401).json({ 
        error: 'Usuário não encontrado ou inativo',
        codigo: 'USUARIO_NAO_ENCONTRADO'
      });
    }

    req.user = usuario;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expirado',
        codigo: 'TOKEN_EXPIRADO'
      });
    }
    
    return res.status(403).json({ 
      error: 'Token inválido',
      codigo: 'TOKEN_INVALIDO'
    });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.nivel_acesso !== 'admin') {
    return res.status(403).json({ 
      error: 'Acesso negado. Privilégios de administrador requeridos',
      codigo: 'ACESSO_NEGADO'
    });
  }
  next();
};


const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findOne({
      where: { 
        id: decoded.userId,
        ativo: true 
      },
      attributes: ['id', 'nome', 'email', 'nivel_acesso', 'cidade', 'foto']
    });

    if (usuario) {
      req.user = usuario;
    }
  } catch (error) {
    // Ignora erros de token em autenticação opcional
  }

  next();
};
const ownDataOrAdmin = (req, res, next) => {
  const userId = req.params.id;
  console.log(req.params.id);
  console.log(userId);

  if (req.user.nivel_acesso === 'admin' || String(req.user.id) === String(userId)) {
    return next()
  }

  return res.status(403).json({
    success: false,
    error: 'Você só pode acessar seus próprios dados ou precisa ser administrador.',
    codigo: 'ACESSO_NEGADO'
  });
};


module.exports = { 
  authenticateToken, 
  authorizeAdmin, 
  optionalAuth,
  ownDataOrAdmin  //teste com a função
};