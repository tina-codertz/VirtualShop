import pool from '../config/database.js';

export const ProductModel = {
    createProduct: async (name, description, price, stock, category, image_url) => {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, stock, category, image_url, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *',
            [name, description, price, stock, category, image_url]
        );
        return result.rows[0];
    },

    getAllProducts: async (category) => {
        let query = 'SELECT * FROM products';
        let values = [];

        if (category) {
            query += ' WHERE category = $1';
            values.push(category);
        }

        query += ' ORDER BY created_at DESC';
        const result = await pool.query(query, values);
        return result.rows;
    },

    getProductById: async (id) => {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    },

    updateProduct: async (id, name, description, price, stock, category, image_url) => {
        const result = await pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, category = $5, image_url = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
            [name, description, price, stock, category, image_url, id]
        );
        return result.rows[0];
    },

    deleteProduct: async (id) => {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
        return result.rows[0];
    }
};
