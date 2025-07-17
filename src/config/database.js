// src/config/database.js
const { sequelize } = require('../../models');

/**
 * Conectar ao banco de dados
 */
async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao banco de dados MySQL');
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco:', error.message);
    throw error;
  }
}

/**
 * Sincronizar modelos com o banco
 */
async function syncDatabase() {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      // Em produção, apenas verificar se as tabelas existem
      await sequelize.sync({ alter: false });
      console.log('✅ Modelos verificados (produção)');
    } else {
      // Em desenvolvimento, sincronizar com alterações
      await sequelize.sync({ alter: true });
      console.log('✅ Modelos sincronizados (desenvolvimento)');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao sincronizar modelos:', error.message);
    throw error;
  }
}

/**
 * Fechar conexão com o banco
 */
async function closeDatabase() {
  try {
    await sequelize.close();
    console.log('✅ Conexão com banco fechada');
  } catch (error) {
    console.error('❌ Erro ao fechar conexão:', error.message);
    throw error;
  }
}

/**
 * Verificar saúde do banco
 */
async function checkDatabaseHealth() {
  try {
    await sequelize.authenticate();
    return {
      status: 'healthy',
      dialect: sequelize.getDialect(),
      database: sequelize.config.database
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message
    };
  }
}

module.exports = {
  connectDatabase,
  syncDatabase,
  closeDatabase,
  checkDatabaseHealth
};