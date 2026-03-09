import express from 'express';
import ProductController from '../controllers/productController.js';
import { authenticateToken, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);

// Admin-only routes
router.post('/', authenticateToken, admin, ProductController.createProduct);
router.put('/:id', authenticateToken, admin, ProductController.updateProduct);
router.delete('/:id', authenticateToken, admin, ProductController.deleteProduct);

export default router;
