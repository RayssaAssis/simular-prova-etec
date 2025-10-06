// src/routes/alternativaRoutes.js
const express = require('express');
const router = express.Router();
const alternativaController = require('../controllers/alternativaController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandlers'); 

router.use(authenticateToken);

// ROTA CORRIGIDA: Retorna o Array de dados DIRETAMENTE para o frontend
router.get('/', asyncHandler(async (req, res) => {
    const alternativas = await alternativaController.getAll();
    // CORREÇÃO: Retorna o array de alternativas sem encapsulamento.
    res.json(alternativas); 
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const alternativa = await alternativaController.getById(req.params.id);
    res.json({ success: true, alternativa });
}));

router.post('/', authorizeAdmin, asyncHandler(async (req, res) => {
    const nova = await alternativaController.create(req.body);
    res.status(201).json({ success: true, alternativa: nova });
}));

router.put('/:id', authorizeAdmin, asyncHandler(async (req, res) => {
    const atualizada = await alternativaController.update(req.params.id, req.body);
    res.json({ success: true, alternativa: atualizada });
}));

router.delete('/:id', authorizeAdmin, asyncHandler(async (req, res) => {
    const deletada = await alternativaController.delete(req.params.id);
    res.json({ success: true, message: 'Alternativa deletada com sucesso', alternativa: deletada });
}));

module.exports = router;

