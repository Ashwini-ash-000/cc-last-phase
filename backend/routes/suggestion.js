// backend/routes/suggestion.js
const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import the database connection pool

// POST /api/suggestions - Submit a new suggestion
// This route handles incoming POST requests to save new suggestion entries.
router.post("/", async (req, res) => {
  // Destructure suggestion data (title, suggestion text, submitted_by) from the request body.
  const { title, suggestion, submitted_by } = req.body;
  try {
    // Execute an SQL INSERT query to add the new suggestion to the 'suggestions' table.
    // The 'status' column will default to 'Pending' as defined in the SQL schema.
    // RETURNING * sends back the newly inserted row, including its generated 'id' and 'submitted_at' timestamp.
    const result = await pool.query(
      "INSERT INTO suggestions (title, suggestion, submitted_by) VALUES ($1, $2, $3) RETURNING *",
      [title, suggestion, submitted_by]
    );
    // Send a 201 Created status and the new suggestion data as a JSON response.
    res.status(201).json({ message: "Suggestion submitted successfully!", data: result.rows[0] });
  } catch (err) {
    // Catch any errors that occur during the database operation.
    console.error("Error submitting suggestion:", err); // Log the error for debugging.
    // Send a 500 Internal Server Error status with a user-friendly message and error details.
    res.status(500).json({ error: "Failed to submit suggestion", details: err.message });
  }
});

// GET /api/suggestions - Get all suggestion entries
// This route handles incoming GET requests to retrieve all suggestion entries.
router.get("/", async (req, res) => {
  try {
    // Execute an SQL SELECT query to retrieve all data from the 'suggestions' table.
    // ORDER BY submitted_at DESC ensures the newest suggestions appear first in the list.
    const result = await pool.query("SELECT * FROM suggestions ORDER BY submitted_at DESC");
    // Send a 200 OK status and the fetched suggestion data as a JSON response.
    res.status(200).json(result.rows);
  } catch (err) {
    // Catch any errors that occur during the database operation.
    console.error("Error fetching suggestions:", err); // Log the error for debugging.
    // Send a 500 Internal Server Error status with a user-friendly message and error details.
    res.status(500).json({ error: "Failed to fetch suggestions", details: err.message });
  }
});

// Export the router to be used in the main Express application (backend/index.js).
module.exports = router;
