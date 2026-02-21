import pool from '../database/db.js';

export const UserModel = {
  createUser: async (name, username, email, password_hash, role = 'user') => {
    const result = await pool.query(
      'INSERT INTO users (name, username, email, password_hash, role, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING user_id, name, username, email, role',
      [name, username, email, password_hash, role]
    );
    return result.rows[0];
  },

  findUserByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  findUserById: async (userId) => {
    const result = await pool.query('SELECT user_id, name, email, role FROM users WHERE user_id = $1', [userId]);
    return result.rows[0];
  },

  getAllUsers: async () => {
    const result = await pool.query('SELECT user_id, name, email, role FROM users');
    return result.rows;
  }
};
