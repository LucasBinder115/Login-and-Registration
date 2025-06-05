import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const gerarAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
};

const gerarRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
};

const verificarAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verificarRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

export { gerarAccessToken, gerarRefreshToken, verificarAccessToken, verificarRefreshToken };