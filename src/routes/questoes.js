const express = require('express');
const router = express.Router();
const questaoController = require('../controllers/questaoController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', async (req, res) => {
  try {
    const questoes = await questaoController.getAll();
    res.json({ success: true, questoes });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const questao = await questaoController.getById(req.params.id);
    res.json({ success: true, questao });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.post('/', authorizeAdmin, async (req, res) => {
  try {
    const nova = await questaoController.create(req.body);
    res.status(201).json({ success: true, questao: nova });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.put('/:id', authorizeAdmin, async (req, res) => {
  try {
    const atualizada = await questaoController.update(req.params.id, req.body);
    res.json({ success: true, questao: atualizada });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.delete('/:id', authorizeAdmin, async (req, res) => {
  try {
    const deletada = await questaoController.delete(req.params.id);
    res.json({ success: true, message: 'Questão deletada com sucesso', questao: deletada });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

module.exports = router;