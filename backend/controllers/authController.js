import User from '../Models/User_model.js';
import bcrypt from 'bcryptjs';
import {
  gerarAccessToken,
  gerarRefreshToken,
  verificarRefreshToken
} from '../services/tokenService.js';

const register = async (req, res) => {
  const { fullName, email, tipo } = req.body;

  if (!fullName || !email)
    return res.status(400).json({ error: "Campos fullName e email são obrigatórios" });

  const existe = await User.findOne({ email });
  if (existe) return res.status(409).json({ error: "Email já existe" });

  const novoUsuario = await User.create({ fullName, email, tipo: tipo || 'comum' });

  const payload = { id: novoUsuario._id, email, tipo: novoUsuario.tipo };
  const accessToken = gerarAccessToken(payload);
  const refreshToken = gerarRefreshToken(payload);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({ message: "Usuário registrado", id: novoUsuario._id });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const usuario = await User.findOne({ username });

  if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const payload = { id: usuario._id, username: usuario.username, tipo: usuario.tipo };
  const accessToken = gerarAccessToken(payload);
  const refreshToken = gerarRefreshToken(payload);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Login realizado" });
};

const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: "Refresh token ausente" });

  try {
    const payload = verificarRefreshToken(refreshToken);
    const novoAccess = gerarAccessToken(payload);

    res.cookie("accessToken", novoAccess, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: "Novo token gerado" });
  } catch {
    res.status(403).json({ error: "Refresh token inválido" });
  }
};

const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout realizado" });
};

export default { register, login, refresh, logout };