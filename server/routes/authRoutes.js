const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, getMe, getUsers } = require('../controllers/AuthController');
const { protect, admin } = require('../middleware/authMiddleware');

// Validation rules
const registerValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['user', 'admin']).withMessage('Role must be either user or admin')
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);




module.exports = router;