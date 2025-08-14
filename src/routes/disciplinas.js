const { Disciplina } = require('../../models');
const express = require('express');
const disciplinaController = require('../controllers/disciplinaController');
const disciplina = require('../../models/disciplina');
const { response } = require('../../server');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', async (req, res) => {
    try {
        const disciplina = await disciplinaController.getAll();
        res.json(disciplina)

    } catch (error) {
        res.status(400).json({
            sucess: false,
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const disciplina = await disciplinaController.getById(id);
        console.log(disciplina)
        res.json(disciplina);
    } catch (error) {
        res.status(400).json({
            sucess: false,
            error: error.message
        });
    }
});


router.post('/', authorizeAdmin, async (req, res) => {
    try {
        const nome = req.body.nome;
        const descricao = req.body.descricao;
        const ativo = req.body.ativo;
        const disciplina = await disciplinaController.create(nome, descricao, ativo);
        res.status(201).json(disciplina);
    } catch (error) {
        res.status(400).json({
            sucess: false,
            error: error.message
        });
    }
});

router.delete('/:id', authorizeAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const disciplina = await disciplinaController.delete(id);
        res.json({ message: "Excluido com sucesso", disciplina });
    } catch (error) {
        res.status(400).json({
            sucess: false,
            error: error.message
        });
    }
});

router.put('/:id', authorizeAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const nome = req.body.nome;
        const descricao = req.body.descricao;
        const ativo = req.body.ativo;
        const disciplina = await disciplinaController.update( id, nome, descricao, ativo);
        res.json(disciplina);
    } catch (error) {
        res.status(400).json({
            sucess: false,
            error: error.message
        });
    }
});


module.exports = router;