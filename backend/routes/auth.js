// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For creating JSON Web Tokens
const pool = require("../db"); // Database connection pool
require("dotenv").config(); // Load environment variables, including JWT_SECRET

// Regex for USN validation: Must start with 1DA, then two digits, then 'CS', then three digits.
// Example: 1DA22CS016
const usnRegex = /^1DA\d{2}CS\d{3}$/;

// Regex for password validation: At least 8 characters, one uppercase, one lowercase, one number, one special char.
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
  const { email, password, roll_no, branch } = req.body;

  // Basic validation for input fields
  if (!email || !password || !roll_no || !branch) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ msg: "Please enter a valid email address" });
  }

  // Validate USN format
  if (!usnRegex.test(roll_no)) {
    return res.status(400).json({ msg: "Invalid Roll No format. Must be like 1DAXXCSYYY (e.g., 1DA22CS016)" });
  }

  // Validate password strength
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      msg: "Password must be at least 8 characters long, contain one uppercase, one lowercase, one number, and one special character.",
    });
  }

  try {
    // Check if user already exists
    let existingUser = await pool.query("SELECT * FROM users WHERE email = $1 OR roll_no = $2", [email, roll_no]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ msg: "User with this email or Roll No already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password with the salt

    // Insert new user into the database
    const newUserResult = await pool.query(
      "INSERT INTO users (email, password_hash, roll_no, branch) VALUES ($1, $2, $3, $4) RETURNING id, email, roll_no, branch, created_at",
      [email, hashedPassword, roll_no, branch]
    );

    const user = newUserResult.rows[0];

    // Create a JWT payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        roll_no: user.roll_no,
        branch: user.branch
      },
    };

    // Sign the JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Your secret key from .env
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) {
          console.error("Error signing JWT during registration:", err.message);
          return res.status(500).send("Server error: Token generation failed.");
        }
        res.status(201).json({ msg: "User registered successfully", token, user: payload.user });
      }
    );
  } catch (err) {
    console.error("Server error during registration:", err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check if user exists
    let userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ msg: "Invalid Credentials" }); // Generic message for security
    }

    const user = userResult.rows[0];

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        roll_no: user.roll_no,
        branch: user.branch
      },
    };

    // Sign the JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error("Error signing JWT during login:", err.message);
          return res.status(500).send("Server error: Token generation failed.");
        }
        res.json({ msg: "Logged in successfully", token, user: payload.user });
      }
    );
  } catch (err) {
    console.error("Server error during login:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;