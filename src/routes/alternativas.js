// src/routes/alternativaRoutes.js
const express = require('express');
const router = express.Router();
const alternativaController = require('../controllers/alternativaController');

router.get('/', async (req, res) => {
  try {
    const alternativas = await alternativaController.getAll();
    res.json({ success: true, alternativas });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const alternativa = await alternativaController.getById(req.params.id);
    res.json({ success: true, alternativa });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nova = await alternativaController.create(req.body);
    res.status(201).json({ success: true, alternativa: nova });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const atualizada = await alternativaController.update(req.params.id, req.body);
    res.json({ success: true, alternativa: atualizada });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletada = await alternativaController.delete(req.params.id);
    res.json({ success: true, message: 'Alternativa deletada com sucesso', alternativa: deletada });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

module.exports = router;
