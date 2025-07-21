const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', async (req, res) => {
  try {
    const usuario = await authController.register(req.body);
    res.status(201).json({ success: true, usuario });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const resultado = await authController.login(req.body);
    res.json({ success: true, ...resultado });
  } catch (e) {
    res.status(401).json({ success: false, error: e.message });
  }
});

module.exports = router;
