// backend/index.js

// Import the Express.js framework, which is used to build the web application.
const express = require("express");
// Import the 'cors' middleware, which enables Cross-Origin Resource Sharing.
// This is essential for allowing your frontend (running on a different domain/port)
// to make requests to your backend API.
const cors = require("cors");
// Import the 'path' module, a core Node.js module for working with file and directory paths.
const path = require("path");
// Load environment variables from a .env file into process.env.
// This allows you to configure sensitive information like database URLs and server ports
// without hardcoding them directly into the source code.
require("dotenv").config();

// Import the route modules for feedback, suggestions, and authentication.
// These modules define the API endpoints related to each functionality.
const feedbackRoutes = require("./routes/feedback");
const suggestionRoutes = require("./routes/suggestion");
const authRoutes = require("./routes/auth");

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

// --- STATIC FILE SERVING CONFIGURATION ---
// This is the core change to display your frontend.

// Serve static files from the 'frontend' directory.
// `__dirname` is the absolute path to the directory where the current script (index.js) is located (i.e., 'backend').
// `path.join(__dirname, '..', 'frontend')` constructs the correct absolute path to your 'frontend' folder:
// It goes up one level from 'backend' (to your project root 'cc mini proj') and then down into 'frontend'.
// Express will now look for requested files (like index.html, style.css, dashboard.html) in this directory.
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Handle all other non-API routes by serving the 'index.html' file.
// This is crucial for single-page application (SPA) behavior or to ensure that direct access
// to specific paths (like /dashboard or /login) in your browser still loads your main HTML file.
// It checks if the requested path does NOT start with '/api'. If it doesn't, it sends 'index.html'.
// This prevents your frontend routes from being mistaken for backend API routes.
app.get('*', (req, res) => {
    // If the request path does not begin with '/api', it's likely a frontend route.
    if (!req.path.startsWith('/api')) {
        // Send the main 'index.html' file from your frontend directory.
        res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
    } else {
        // If it starts with '/api' but doesn't match any defined API route,
        // send a 404 response indicating the API endpoint was not found.
        res.status(404).send('API endpoint not found');
    }
});

// --- END STATIC FILE SERVING CONFIGURATION ---


// API Routes Mounting:
// Mount the authentication routes under the '/api/auth' path.
// All routes defined in authRoutes will be prefixed with /api/auth.
app.use("/api/auth", authRoutes);
// Mount the feedback routes under the '/api/feedback' path.
// All routes defined in feedbackRoutes will be prefixed with /api/feedback.
app.use("/api/feedback", feedbackRoutes);
// Mount the suggestion routes under the '/api/suggestions' path.
// All routes defined in suggestionRoutes will be prefixed with /api/suggestions.
app.use("/api/suggestions", suggestionRoutes);


// The original root route `app.get("/")` is now commented out/removed
// because the `app.use(express.static(...))` middleware and `app.get('*', ...)`
// will handle requests to '/' by serving 'index.html' from your frontend.
// If you leave both, the static middleware will take precedence for '/',
// but it's cleaner to remove the redundant API root route.
// app.get("/", (req, res) => {
//   res.send("Faculty Feedback Portal API is running");
// });


// Start the Server:
// Make the Express app listen for incoming requests on the specified port.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});