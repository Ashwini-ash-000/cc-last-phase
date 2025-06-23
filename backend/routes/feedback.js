// backend/routes/feedback.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require("../middleware/auth"); // Import auth middleware

// @route   POST /api/feedback
// @desc    Submit new feedback with multiple questions
// @access  Private (requires authentication)
router.post("/", auth, async (req, res) => {
  // Get email from authenticated user, which is attached by the auth middleware
  const submitted_by = req.user.email;

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

  // Basic validation for all required fields
  if (!faculty_name || !q1_clarity || !q2_engagement || !q3_support || !q4_fairness || !q5_overall || !comment) {
    return res.status(400).json({ msg: "Please answer all questions and provide a comment." });
  }

  // Define allowed choices for validation
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

// @route   GET /api/feedback/my
// @desc    Get feedback entries submitted by the authenticated user
// @access  Private (requires authentication)
router.get("/my", auth, async (req, res) => {
  try {
    // The auth middleware attaches user information (like email) to req.user
    const userEmail = req.user.email;

    // Select all columns for feedback submitted by the current user
    const result = await pool.query(
      "SELECT id, faculty_name, q1_clarity, q2_engagement, q3_support, q4_fairness, q5_overall, comment, submitted_at FROM feedback WHERE submitted_by = $1 ORDER BY submitted_at DESC",
      [userEmail]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching user's feedback:", err);
    res.status(500).json({ error: "Failed to fetch your feedback", details: err.message });
  }
});


// Optional: @route   GET /api/feedback
// @desc    Get all feedback entries (consider restricting this to admin only)
// @access  Private (requires authentication)
// IMPORTANT: If this route is left as is, any authenticated user can still
// fetch ALL feedback if they know this endpoint. For true confidentiality,
// remove this route or add an isAdmin middleware if you have user roles.
router.get("/", auth, async (req, res) => {
  try {
    // Select all columns including the new question fields
    const result = await pool.query("SELECT id, faculty_name, q1_clarity, q2_engagement, q3_support, q4_fairness, q5_overall, comment, submitted_by, submitted_at FROM feedback ORDER BY submitted_at DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching all feedback:", err);
    res.status(500).json({ error: "Failed to fetch all feedback", details: err.message });
  }
});


module.exports = router;