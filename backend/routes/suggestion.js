// backend/routes/suggestion.js
const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import the database connection pool

// POST /api/suggestions - Submit a new suggestion
router.post("/", async (req, res) => {
  const { title, suggestion, submitted_by } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO suggestions (title, suggestion, submitted_by) VALUES ($1, $2, $3) RETURNING *",
      [title, suggestion, submitted_by]
    );
    res.status(201).json({ message: "Suggestion submitted successfully!", data: result.rows[0] });
  } catch (err) {
    console.error("Error submitting suggestion:", err);
    res.status(500).json({ error: "Failed to submit suggestion", details: err.message });
  }
});

// GET /api/suggestions - Get all suggestion entries
router.get("/", async (req, res) => {
  try {
    // Order by submitted_at in descending order to show newest first
    const result = await pool.query("SELECT * FROM suggestions ORDER BY submitted_at DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    res.status(500).json({ error: "Failed to fetch suggestions", details: err.message });
  }
});

module.exports = router;
