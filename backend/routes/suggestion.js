// backend/routes/suggestion.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require("../middleware/auth"); // Import auth middleware

// @route   POST /api/suggestions
// @desc    Submit a new suggestion
// @access  Private (requires authentication)
router.post("/", auth, async (req, res) => {
  // Get submitted_by from the authenticated user's email (from JWT payload)
  const submitted_by = req.user.email; // Use authenticated user's email
  const { title, suggestion } = req.body; // Submitted_by is no longer in body

  // Basic validation
  if (!title || !suggestion) {
      return res.status(400).json({ msg: "Please enter both title and suggestion details." });
  }

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

// @route   GET /api/suggestions/my
// @desc    Get suggestion entries submitted by the authenticated user
// @access  Private (requires authentication)
// This is the new route needed to support frontend's fetchSuggestions
router.get("/my", auth, async (req, res) => {
  try {
    const userEmail = req.user.email; // Get email from authenticated user

    const result = await pool.query(
      "SELECT id, title, suggestion, submitted_by, submitted_at, status FROM suggestions WHERE submitted_by = $1 ORDER BY submitted_at DESC",
      [userEmail]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching user's suggestions:", err);
    res.status(500).json({ error: "Failed to fetch your suggestions", details: err.message });
  }
});

// @route   GET /api/suggestions
// @desc    Get all suggestion entries (consider restricting this to admin only)
// @access  Private (requires authentication)
// IMPORTANT: For production, this route should likely be restricted to admin users
// or removed if only user-specific suggestions are to be displayed.
router.get("/", auth, async (req, res) => {
  try {
    const result = await pool.query("SELECT id, title, suggestion, submitted_by, submitted_at, status FROM suggestions ORDER BY submitted_at DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching all suggestions:", err);
    res.status(500).json({ error: "Failed to fetch all suggestions", details: err.message });
  }
});

module.exports = router;