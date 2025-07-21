
const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

// GET /usuarios - Buscar todos os usuários ativos
router.get('/', async (req, res) => {
  try {
    const usuarios = await usuarioController.getAll();
    res.json({ success: true, usuarios });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// GET /usuarios/:id - Buscar usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioController.getById(id);
    res.json({ success: true, usuario });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// POST /usuarios - Criar novo usuário
router.post('/', async (req, res) => {
  try {
    const dados = req.body;
    const usuario = await usuarioController.create(dados);
    res.status(201).json({ success: true, usuario });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT /usuarios/:id - Atualizar usuário
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const dados = req.body;
    const usuarioAtualizado = await usuarioController.update(id, dados);
    res.json({ success: true, usuario: usuarioAtualizado });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE /usuarios/:id - Deletar usuário
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const usuarioDeletado = await usuarioController.delete(id);
    res.json({ success: true, message: 'Usuário deletado com sucesso', usuario: usuarioDeletado });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
