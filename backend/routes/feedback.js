// backend/routes/feedback.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require("../middleware/auth"); // Import auth middleware

// @route   POST /api/feedback
// @desc    Submit new feedback with multiple questions
// @access  Private (requires authentication)
router.post("/", auth, async (req, res) => {
  const submitted_by = req.user.email; // Get email from authenticated user
  // Destructure the new question responses from the request body
  const {
    faculty_name,
    q1_clarity,
    q2_engagement,
    q3_support,
    q4_fairness,
    q5_overall,
    comment // Comment remains the same
  } = req.body;

  // Basic validation for new question fields
  if (!faculty_name || !q1_clarity || !q2_engagement || !q3_support || !q4_fairness || !q5_overall || !comment) {
    return res.status(400).json({ msg: "Please answer all questions and provide a comment." });
  }

  // Define allowed choices for validation (optional, but good practice)
  const allowedChoices = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];
  const validateChoice = (choice) => allowedChoices.includes(choice);

  if (!validateChoice(q1_clarity) || !validateChoice(q2_engagement) || !validateChoice(q3_support) || !validateChoice(q4_fairness) || !validateChoice(q5_overall)) {
      return res.status(400).json({ msg: "Invalid choice provided for one or more questions." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO feedback (faculty_name, q1_clarity, q2_engagement, q3_support, q4_fairness, q5_overall, comment, submitted_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [faculty_name, q1_clarity, q2_engagement, q3_support, q4_fairness, q5_overall, comment, submitted_by]
    );
    res.status(201).json({ message: "Feedback submitted successfully!", data: result.rows[0] });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).json({ error: "Failed to submit feedback", details: err.message });
  }
});

// @route   GET /api/feedback
// @desc    Get all feedback entries with new question fields
// @access  Private (requires authentication)
router.get("/", auth, async (req, res) => {
  try {
    // Select all columns including the new question fields
    const result = await pool.query("SELECT id, faculty_name, q1_clarity, q2_engagement, q3_support, q4_fairness, q5_overall, comment, submitted_by, submitted_at FROM feedback ORDER BY submitted_at DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).json({ error: "Failed to fetch feedback", details: err.message });
  }
});

module.exports = router;
