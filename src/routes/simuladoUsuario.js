const express = require('express');
const router = express.Router();
const simuladoUsuarioController = require('../controllers/simuladoUsuarioController');
const { authenticateToken, authorizeAdmin, ownDataOrAdmin } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/:id', ownDataOrAdmin, async (req, res) => {
  try {
    const respostas = await simuladoUsuarioController.getByUserId(req.params.id);
    res.json(respostas);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;