const express = require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

router.use(authenticateToken);


router.get('/', async (req, res) => {
  try {
    const materias = await materiaController.getAll();
    res.json(materias);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const materia = await materiaController.getById(req.params.id);
    res.json(materia);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/', authorizeAdmin, async (req, res) => {
  try {
    const materia = await materiaController.create(req.body);
    res.status(201).json(materia);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.put('/:id', authorizeAdmin, async (req, res) => {
  try {
    const materia = await materiaController.update(req.params.id, req.body);
    res.json(materia);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.delete('/:id', authorizeAdmin, async (req, res) => {
  try {
    const materia = await materiaController.delete(req.params.id);
    res.json(materia);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
