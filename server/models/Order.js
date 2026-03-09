import pool from '../config/database.js';

export const OrderModel = {
    createOrder: async (userId, totalAmount) => {
        const result = await pool.query(
            'INSERT INTO orders (user_id, total_amount, status, delivery_status, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *',
            [userId, totalAmount, 'completed', 'processing']
        );
        return result.rows[0];
    },

    addOrderItem: async (orderId, productId, quantity, priceAtTime) => {
        const result = await pool.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES ($1, $2, $3, $4) RETURNING *',
            [orderId, productId, quantity, priceAtTime]
        );
        return result.rows[0];
    },

    getUserOrders: async (userId) => {
        const result = await pool.query(
            'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        return result.rows;
    },

    getAllOrders: async () => {
        const result = await pool.query(
            'SELECT orders.*, users.username, users.email FROM orders JOIN users ON orders.user_id = users.id ORDER BY orders.created_at DESC'
        );
        return result.rows;
    },

    updateDeliveryStatus: async (orderId, status) => {
        const result = await pool.query(
            'UPDATE orders SET delivery_status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
            [status, orderId]
        );
        return result.rows[0];
    }
};
