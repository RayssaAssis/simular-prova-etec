
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Usuario } = require('../../models');

class AuthController {
  async register(data) {
    try {
      const email= data.email; 
      data.senha = await bcrypt.hash(data.senha, 12);

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
      console.log(usuario.senha);
      console.log(senha);
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

  async esqueciSenha(data) {
    try {
      const { email } = data;

      const usuario = await Usuario.findOne({ where: { email, ativo: true } });
      if (!usuario) throw new Error('Email não encontrado');

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetExpires = new Date(Date.now() + 3600000); // 1 hora

      await usuario.update({
        reset_token: resetToken,
        reset_expires: resetExpires
      });

      return { message: 'Token gerado', token: resetToken };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async resetSenha(data) {
    try {
      const { token, novaSenha } = data;

      const usuario = await Usuario.findOne({
        where: {
          reset_token: token,
          reset_expires: { [require('sequelize').Op.gt]: new Date() }
        }
      });

      if (!usuario) throw new Error('Token inválido ou expirado');

      const senhaHash = await bcrypt.hash(novaSenha, 12);
      await usuario.update({
        senha: senhaHash,
        reset_token: null,
        reset_expires: null
      });

      return { message: 'Senha alterada com sucesso' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new AuthController();
