// models/simulado_resposta.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SimuladoResposta = sequelize.define('SimuladoResposta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_simulado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'simulados',
        key: 'id'
      }
    },
    id_alternativa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'alternativas',
        key: 'id'
      }
    },
    id_questao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questoes',
        key: 'id'
      }
    }
  }, {
    tableName: 'simulado_respostas',
    timestamps: false
  });

  SimuladoResposta.associate = (models) => {
    SimuladoResposta.belongsTo(models.Simulado, {
      foreignKey: 'id_simulado',
      as: 'simulado'
    });
    
    SimuladoResposta.belongsTo(models.Alternativa, {
      foreignKey: 'id_alternativa',
      as: 'alternativa'
    });
    
    SimuladoResposta.belongsTo(models.Questao, {
      foreignKey: 'id_questao',
      as: 'questao'
    });
  };

  return SimuladoResposta;
};