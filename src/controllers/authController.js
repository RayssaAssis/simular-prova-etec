const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const { Usuario } = require('../../models'); // ajuste se necessário

// Configura Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: { rejectUnauthorized: false } // ignora SSL para desenvolvimento/TCC
});

class AuthController {
  // === REGISTER ===
  async register(data) {
    try {
      const email = data.email;
      data.senha = await bcrypt.hash(data.senha, 12);

      const existingUser = await Usuario.findOne({ where: { email } });
      if (existingUser) throw new Error('Email já cadastrado');

      const usuario = await Usuario.create(data);

      const userObj = usuario.toJSON();
      delete userObj.senha;

      return userObj;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // === LOGIN ===
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

  // === ESQUECI SENHA ===
  async esqueciSenha(data) {
    try {
      const { email } = data;

      const usuario = await Usuario.findOne({ where: { email, ativo: true } });
      if (!usuario) throw new Error('Email não encontrado');

      // Gera código de 4 dígitos único
      const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
      const resetExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

      await usuario.update({ reset_token: resetCode, reset_expires: resetExpires });

      // Envia e-mail
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: usuario.email,
        subject: 'Código de recuperação de senha',
        text: `Seu código de recuperação é: ${resetCode}. Ele expira em 5 minutos e só pode ser usado uma vez.`
      });

      return { message: 'Código enviado para o e-mail.' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // === RESET SENHA ===
  async resetSenha(data) {
    try {
      const { email, code, novaSenha } = data;

      const usuario = await Usuario.findOne({
        where: {
          email,
          reset_token: code,
          reset_expires: { [Op.gt]: new Date() }
        }
      });

      // Mensagem diferenciada para erros
      if (!usuario) {
        const existeEmail = await Usuario.findOne({ where: { email } });
        if (!existeEmail) throw new Error('Email não encontrado');
        else throw new Error('Código expirado ou incorreto');
      }

      // Evita reutilizar a mesma senha
      const senhaIgual = await bcrypt.compare(novaSenha, usuario.senha);
      if (senhaIgual) throw new Error('Você deve escolher uma senha diferente da atual');

      const senhaHash = await bcrypt.hash(novaSenha, 12);
      await usuario.update({ senha: senhaHash, reset_token: null, reset_expires: null });

      return { message: 'Senha alterada com sucesso' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new AuthController();
