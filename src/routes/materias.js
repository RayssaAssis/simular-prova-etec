const express = require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController');

router.get('/', async (req, res) => {
  try {
    const materias = await materiaController.getAll();
    res.json({ success: true, materias });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const materia = await materiaController.getById(req.params.id);
    res.json({ success: true, materia });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nova = await materiaController.create(req.body);
    res.status(201).json({ success: true, materia: nova });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const atualizada = await materiaController.update(req.params.id, req.body);
    res.json({ success: true, materia: atualizada });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletada = await materiaController.delete(req.params.id);
    res.json({ success: true, message: 'Matéria deletada com sucesso', materia: deletada });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

module.exports = router;
