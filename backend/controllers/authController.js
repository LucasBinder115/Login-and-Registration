import User from '../Models/User_model.js';
import bcrypt from 'bcryptjs';
import {
  gerarAccessToken,
  gerarRefreshToken,
  verificarRefreshToken
} from '../services/tokenService.js';

const register = async (req, res) => {
  try {
    const { email, username, password, tipo } = req.body;

    // Validate required fields
    if (!email || !username || !password) {
      return res.status(400).json({ error: "Campos email, username e password são obrigatórios" });
    }

    // Check if email or username already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(409).json({ error: "Email já existe" });

    const usernameExists = await User.findOne({ username });
    if (usernameExists) return res.status(409).json({ error: "Username já existe" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const novoUsuario = await User.create({
      email,
      username,
      password: hashedPassword,
      tipo: tipo || "comum",
    });

    // Generate tokens
    const payload = { id: novoUsuario._id, email, tipo: novoUsuario.tipo };
    const accessToken = gerarAccessToken(payload);
    const refreshToken = gerarRefreshToken(payload);

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "Usuário registrado", id: novoUsuario._id });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
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
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
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
      secure: process.env.NODE_ENV === "production",
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