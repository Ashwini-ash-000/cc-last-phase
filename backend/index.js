// backend/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const feedbackRoutes = require("./routes/feedback"); // Import feedback routes
const suggestionRoutes = require("./routes/suggestion"); // Import suggestion routes

const app = express();
const PORT = process.env.PORT || 5000; // Use port from environment variable or default to 5000

// Middleware
app.use(cors()); // Enable CORS for all routes (important for frontend communication)
app.use(express.json()); // Parse JSON request bodies

// API Routes
app.use("/api/feedback", feedbackRoutes); // Mount feedback routes
app.use("/api/suggestions", suggestionRoutes); // Mount suggestion routes

// Simple root route to confirm API is running
app.get("/", (req, res) => {
  res.send("Faculty Feedback Portal API is running");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
