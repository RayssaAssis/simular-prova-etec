const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../../models');

class AuthController {
  async register(data) {
    try {
      const { email, senha } = data;

      // Verificar usuário existente
      const existingUser = await Usuario.findOne({ where: { email } });
      if (existingUser) throw new Error('Email já cadastrado');

      // Criar usuário (senha criptografada via hook no model)
      const usuario = await Usuario.create(data);

      // Retirar senha antes de retornar
      const userObj = usuario.toJSON();
      delete userObj.senha;

      return userObj;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(data) {
    try {
      const { email, senha } = data;

      const usuario = await Usuario.findOne({ where: { email, ativo: true } });
      if (!usuario) throw new Error('Usuário não encontrado ou inativo');

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) throw new Error('Senha incorreta');

      const token = jwt.sign(
        { userId: usuario.id, nivel_acesso: usuario.nivel_acesso },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      const userObj = usuario.toJSON();
      delete userObj.senha;

      return { token, usuario: userObj };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new AuthController();
