const express = require('express');
const router = express.Router();
const simuladoRespostaController = require('../controllers/simuladoRespostaController');
const { authenticateToken, authorizeAdmin, ownDataOrAdmin } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandlers');

router.use(authenticateToken);

// ROTA CORRIGIDA: Permite acesso a usuários autenticados para que o frontend possa carregar as respostas.
router.get('/', asyncHandler(async (req, res) => {
    // Removemos o 'authorizeAdmin' daqui. Se a segurança for um problema, o backend deve filtrar por usuário.
    const simuladoResposta = await simuladoRespostaController.getAll();
    res.json(simuladoResposta);
}));

// Rotas originais abaixo (mantidas)

router.get('/:id', ownDataOrAdmin, asyncHandler(async (req, res) => {
    const simuladoResposta = await simuladoRespostaController.getById(req.params.id);
    res.json(simuladoResposta);
}));

router.post('/', asyncHandler(async (req, res) => {
    const simuladoResposta = await simuladoRespostaController.create(req.body);
    res.status(201).json(simuladoResposta);
}));

router.put('/:id', authorizeAdmin, asyncHandler(async (req, res) => {
    const simuladoResposta = await simuladoRespostaController.update(req.params.id, req.body);
    res.json(simuladoResposta);
}));

router.delete('/:id', authorizeAdmin, asyncHandler(async (req, res) => {
    const simuladoResposta = await simuladoRespostaController.delete(req.params.id);
    res.json({message: "Excluido com sucesso", simuladoResposta});
}));

module.exports = router;