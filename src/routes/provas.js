// src/routes/provas.js
const express = require('express');
const router = express.Router();
const provaController = require('../controllers/provaController');

router.get('/', async (req, res) => {
  try {
    const provas = await provaController.getAll();
    res.json({ success: true, provas });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const prova = await provaController.getById(req.params.id);
    res.json({ success: true, prova });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nova = await provaController.create(req.body);
    res.status(201).json({ success: true, prova: nova });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const atualizada = await provaController.update(req.params.id, req.body);
    res.json({ success: true, prova: atualizada });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletada = await provaController.delete(req.params.id);
    res.json({ success: true, message: 'Prova deletada com sucesso', prova: deletada });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

module.exports = router;
