const express = require('express');
const router = express.Router();
const simuladoRespostaController = require('../controllers/simuladoRespostaController');
const { authenticateToken, authorizeAdmin, ownDataOrAdmin } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeAdmin, async (req, res) => {
  try {
    const simuladoResposta = await simuladoRespostaController.getAll();
    res.json(simuladoResposta);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/:id', ownDataOrAdmin, async (req, res) => {
  try {
    const simuladoResposta = await simuladoRespostaController.getById(req.params.id);
    res.json(simuladoResposta);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/', ownDataOrAdmin, async (req, res) => {
  try {
    // const { data_realizacao, id_usuario} = req.body
    const simuladoResposta = await simuladoRespostaController.create(req.body);
    res.status(201).json(simuladoResposta);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.put('/:id', authorizeAdmin, async (req, res) => {
  try{
    const simuladoResposta = await simuladoRespostaController.update(req.params.id, req.body);
    res.json(simuladoResposta);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.delete('/:id', authorizeAdmin, async (req, res) => {
  try {
    const simuladoResposta = await simuladoRespostaController.delete(req.params.id);
    res.json({message: "Excluido com sucesso", simuladoResposta});
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
