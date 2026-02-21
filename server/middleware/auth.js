import { verify } from 'jsonwebtoken';
import { UserModel } from '../models/User.js';

// Protect routes - verify token
export async function authenticateToken(req, res, next) {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify token
    const decoded = verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    const user = await UserModel.findUserById(decoded.user_id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      user_id: user.user_id,
      role: user.role
    };
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
}

// Admin middleware
export function admin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied, admin only' });
  }
}