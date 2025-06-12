// backend/index.js

// Import the Express.js framework, which is used to build the web application.
const express = require("express");
// Import the 'cors' middleware, which enables Cross-Origin Resource Sharing.
// This is essential for allowing your frontend (running on a different domain/port)
// to make requests to your backend API.
const cors = require("cors");
// Load environment variables from a .env file into process.env.
// This allows you to configure sensitive information like database URLs and server ports
// without hardcoding them directly into the source code.
require("dotenv").config();

// Import the route modules for feedback and suggestions.
// These modules define the API endpoints related to each functionality.
const feedbackRoutes = require("./routes/feedback");
const suggestionRoutes = require("./routes/suggestion");
const authRoutes = require("./routes/auth"); // <-- NEW: Import auth routes

// Initialize the Express application.
const app = express();
// Define the port the server will listen on.
// It tries to use the PORT environment variable (e.g., set by Render) or defaults to 5000 for local development.
const PORT = process.env.PORT || 5000;

// Middleware Setup:
// 1. Use 'cors' middleware to enable CORS for all incoming requests.
//    This allows your frontend to send requests to this backend.
app.use(cors());
// 2. Use 'express.json()' middleware to parse incoming JSON request bodies.
//    This allows you to access JSON data sent from the frontend via `req.body`.
app.use(express.json());

// API Routes Mounting:
// Mount the feedback routes under the '/api/feedback' path.
// All routes defined in feedbackRoutes (e.g., POST /, GET /) will be prefixed with /api/feedback.
app.use("/api/auth", authRoutes);       // <-- NEW: Mount auth routes
app.use("/api/feedback", feedbackRoutes);
// Mount the suggestion routes under the '/api/suggestions' path.
// All routes defined in suggestionRoutes (e.g., POST /, GET /) will be prefixed with /api/suggestions.
app.use("/api/suggestions", suggestionRoutes);

// Root Route:
// Define a simple GET route for the root URL ("/").
// This is often used to quickly check if the API server is running.
app.get("/", (req, res) => {
  res.send("Faculty Feedback Portal API is running");
});

// Start the Server:
// Make the Express app listen for incoming requests on the specified port.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
