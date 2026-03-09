import { OrderModel } from '../models/Order.js';

const OrderController = {
    checkout: async (req, res) => {
        try {
            const { items, totalAmount } = req.body; // items: [{productId, quantity, price}]
            if (!items || items.length === 0) {
                return res.status(400).json({ message: 'Cart is empty' });
            }

            // Create Order
            const order = await OrderModel.createOrder(req.user.user_id, totalAmount);

            // Create Order Items
            for (const item of items) {
                await OrderModel.addOrderItem(order.id, item.productId, item.quantity, item.price);
            }

            res.status(201).json({ message: 'Order created successfully', order });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUserOrders: async (req, res) => {
        try {
            const orders = await OrderModel.getUserOrders(req.user.user_id);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Admin: Get all orders
    getAllOrders: async (req, res) => {
        try {
            const orders = await OrderModel.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Admin: Update Status
    updateDeliveryStatus: async (req, res) => {
        try {
            const { delivery_status } = req.body;
            const order = await OrderModel.updateDeliveryStatus(req.params.id, delivery_status);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default OrderController;
