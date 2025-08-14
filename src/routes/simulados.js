const express = require('express');
const router = express.Router();
const simuladoController = require('../controllers/simuladoController');
const { authenticateToken, authorizeAdmin, ownDataOrAdmin } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeAdmin, async (req, res) => {
  try {
    const simulado = await simuladoController.getAll();
    res.json(simulado);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/:id', ownDataOrAdmin, async (req, res) => {
  try {
    const simulado = await simuladoController.getById(req.params.id);
    res.json(simulado);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/user/:id', ownDataOrAdmin, async (req, res) => {
  try {
    const simulados = await simuladoController.getByUserId(req.params.id);
    res.json(simulados);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { data_realizacao, id_usuario} = req.body
    const simulado = await simuladoController.create(req.body);
    res.status(201).json(simulado);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.put('/:id', authorizeAdmin, async (req, res) => {
  try{
    const simulado = await simuladoController.update(req.params.id, req.body);
    res.json(simulado);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.delete('/:id',  authorizeAdmin, async (req, res) => {
  try {
    const simulado = await simuladoController.delete(req.params.id);
    res.json({message: "Excluido com sucesso", simulado});
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
