const express = require('express');
const router = express.Router();
const simuladoController = require('../controllers/simuladoController');
const { authenticateToken, authorizeAdmin, ownDataOrAdmin } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandlers');

router.use(authenticateToken);

// ROTA CORRIGIDA: Lida com GET /simulados E GET /simulados?id_usuario=ID
router.get('/', asyncHandler(async (req, res, next) => {
    
    // 1. Caso de uso: Requisição com filtro de usuário (GET /simulados?id_usuario=7)
    if (req.query.id_usuario) {
        
        // Mapeia o ID do query para o params para que o middleware 'ownDataOrAdmin' funcione
        req.params.id = req.query.id_usuario;

        // Usa o middleware para verificar se o usuário logado (token) é o admin OU é o dono do ID na query.
        ownDataOrAdmin(req, res, asyncHandler(async () => {
            const simulados = await simuladoController.getByUserId(req.query.id_usuario);
            res.json(simulados);
        }));
        
        return; 
    }

    // 2. Caso de uso: Requisição sem filtro (GET /simulados) - Exige Admin (Comportamento original)
    authorizeAdmin(req, res, asyncHandler(async () => {
        const simulado = await simuladoController.getAll();
        res.json(simulado);
    }));
}));

// Rotas originais abaixo (mantidas)

router.get('/:id', ownDataOrAdmin, asyncHandler(async (req, res) => {
    const simulado = await simuladoController.getById(req.params.id);
    res.json(simulado);
}));

router.get('/user/:id', ownDataOrAdmin, asyncHandler(async (req, res) => {
    const simulados = await simuladoController.getByUserId(req.params.id);
    res.json(simulados);
}));

router.post('/', asyncHandler(async (req, res) => {
    const { data_realizacao, id_usuario} = req.body
    const simulado = await simuladoController.create(req.body);
    res.status(201).json(simulado);
}));

router.put('/:id', authorizeAdmin, asyncHandler(async (req, res) => {
    const simulado = await simuladoController.update(req.params.id, req.body);
    res.json(simulado);
}));

router.delete('/:id',  authorizeAdmin, asyncHandler(async (req, res) => {
    const simulado = await simuladoController.delete(req.params.id);
    res.json({message: "Excluido com sucesso", simulado});
}));

module.exports = router;