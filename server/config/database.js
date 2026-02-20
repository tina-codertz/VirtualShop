import pkg from 'pg';
const { Pool } = pkg;

import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,

  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// Handle connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Verify connection at startup
(async () => {
  try {
    const client = await pool.connect();
    console.log(" Database connected successfully");
    client.release();
  } catch (err) {
    console.error(" Error connecting to database", err);
  }
})();

export default pool;