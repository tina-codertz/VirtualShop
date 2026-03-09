import pool from '../config/database.js';

export const UserModel = {
  createUser: async (username, email, password_hash, role = 'user') => {
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash, role, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, username, email, role',
      [username, email, password_hash, role]
    );
    return result.rows[0];
  },

  findUserByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  findUserById: async (id) => {
    const result = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },

  getAllUsers: async () => {
    const result = await pool.query('SELECT id, username, email, role FROM users');
    return result.rows;
  }
};
