import express from 'express';
import OrderController from '../controllers/orderController.js';
import { authenticateToken, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/checkout', authenticateToken, OrderController.checkout);
router.get('/myorders', authenticateToken, OrderController.getUserOrders);

// Admin
router.get('/', authenticateToken, admin, OrderController.getAllOrders);
router.put('/:id/status', authenticateToken, admin, OrderController.updateDeliveryStatus);

export default router;
