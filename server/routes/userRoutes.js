import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticateToken, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, admin, UserController.getAllUsers);

export default router;
