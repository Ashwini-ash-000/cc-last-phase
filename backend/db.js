// backend/db.js

// Import the Pool class from the 'pg' (node-postgres) library.
// The Pool manages connections to the PostgreSQL database, handling connection pooling.
const { Pool } = require("pg");

// Load environment variables from a .env file into process.env.
// This is used to securely access the DATABASE_URL without hardcoding it.
require("dotenv").config();

// Create a new Pool instance.
// The connectionString is fetched from environment variables, which is best practice
// for sensitive information like database credentials.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // The 'ssl' property is crucial for connecting to cloud-hosted databases like Render's PostgreSQL.
    // 'rejectUnauthorized: false' is often required because cloud providers might use
    // self-signed certificates or certificates not automatically trusted by Node.js.
    // In a production environment with strict security requirements, you might want to
    // configure proper CA certificates instead of setting this to false.
    rejectUnauthorized: false,
  },
});

// Optional: Test the database connection when the application starts.
// This query simply selects the current timestamp from the database.
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    // If an error occurs during the connection test, log the error.
    console.error('Error connecting to the database:', err);
  } else {
    // If the connection is successful, log a confirmation message and the timestamp.
    console.log('Database connected successfully:', res.rows[0].now);
  }
});

// Export the configured pool object.
// This allows other modules (like your routes) to import and use this pool
// to interact with the database without needing to re-establish connections.
module.exports = pool;
