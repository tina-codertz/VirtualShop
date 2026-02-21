import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModels.js';


const AuthService = {
  register: async (name, username, email, password) => {
    const existingUser = await UserModel.findUserByEmail(email);
    if (existingUser) throw new Error('Email already exists');

    const password_hash = await bcrypt.hash(password, 10);
    const user = await UserModel.createUser(name, username, email, password_hash);
    const token = jwt.sign({ user_id: user.user_id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    await LogModel.createLog(user.user_id, 'User registered');
    return { token, user };
  },

  login: async (email, password) => {
    const user = await UserModel.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ user_id: user.user_id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    await LogModel.createLog(user.user_id, 'User logged in');
    return { token, user };
  },

  getUser: async (userId) => {
    const user = await UserModel.findUserById(userId);
    if (!user) throw new Error('User not found');
    return user;
  }
};

export default AuthService;