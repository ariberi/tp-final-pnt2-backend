import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

export const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  const tokenFromCookie = req.headers.cookies;

  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.id; // payload.userId; ?? TODO verificar esto
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};