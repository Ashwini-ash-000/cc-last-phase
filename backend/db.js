// backend/db.js
const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables from .env file

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Required for Render's PostgreSQL or other cloud providers
    rejectUnauthorized: false,
  },
});

// Test the database connection (optional, but good for debugging)
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected successfully:', res.rows[0].now);
  }
});

module.exports = pool;
