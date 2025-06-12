// backend/routes/feedback.js
const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import the database connection pool

// POST /api/feedback - Submit new feedback
router.post("/", async (req, res) => {
  const { faculty_name, rating, comment, submitted_by } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO feedback (faculty_name, rating, comment, submitted_by) VALUES ($1, $2, $3, $4) RETURNING *",
      [faculty_name, rating, comment, submitted_by]
    );
    res.status(201).json({ message: "Feedback submitted successfully!", data: result.rows[0] });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).json({ error: "Failed to submit feedback", details: err.message });
  }
});

// GET /api/feedback - Get all feedback entries
router.get("/", async (req, res) => {
  try {
    // Order by submitted_at in descending order to show newest first
    const result = await pool.query("SELECT * FROM feedback ORDER BY submitted_at DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).json({ error: "Failed to fetch feedback", details: err.message });
  }
});

module.exports = router;
