// backend/routes/feedback.js
const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import the database connection pool

// POST /api/feedback - Submit new feedback
// This route handles incoming POST requests to save new feedback entries.
router.post("/", async (req, res) => {
  // Destructure feedback data from the request body
  const { faculty_name, rating, comment, submitted_by } = req.body;
  try {
    // Execute an SQL INSERT query to add the new feedback to the 'feedback' table.
    // RETURNING * sends back the newly inserted row, including its generated 'id' and 'submitted_at' timestamp.
    const result = await pool.query(
      "INSERT INTO feedback (faculty_name, rating, comment, submitted_by) VALUES ($1, $2, $3, $4) RETURNING *",
      [faculty_name, rating, comment, submitted_by]
    );
    // Send a 201 Created status and the new feedback data as a JSON response.
    res.status(201).json({ message: "Feedback submitted successfully!", data: result.rows[0] });
  } catch (err) {
    // Catch any errors during the database operation.
    console.error("Error submitting feedback:", err); // Log the error for debugging.
    // Send a 500 Internal Server Error status with a user-friendly message and error details.
    res.status(500).json({ error: "Failed to submit feedback", details: err.message });
  }
});

// GET /api/feedback - Get all feedback entries
// This route handles incoming GET requests to retrieve all feedback entries.
router.get("/", async (req, res) => {
  try {
    // Execute an SQL SELECT query to retrieve all data from the 'feedback' table.
    // ORDER BY submitted_at DESC ensures the newest feedback appears first.
    const result = await pool.query("SELECT * FROM feedback ORDER BY submitted_at DESC");
    // Send a 200 OK status and the fetched feedback data as a JSON response.
    res.status(200).json(result.rows);
  } catch (err) {
    // Catch any errors during the database operation.
    console.error("Error fetching feedback:", err); // Log the error for debugging.
    // Send a 500 Internal Server Error status with a user-friendly message and error details.
    res.status(500).json({ error: "Failed to fetch feedback", details: err.message });
  }
});

// Export the router to be used in the main Express application (backend/index.js).
module.exports = router;
