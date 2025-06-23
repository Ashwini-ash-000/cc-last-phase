// backend/index.js

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const feedbackRoutes = require("./routes/feedback");
const suggestionRoutes = require("./routes/suggestion");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- CRITICAL CHANGE: API ROUTES MUST COME BEFORE STATIC/WILDCARD ROUTES ---

// API Routes Mounting:
// These routes handle all requests starting with /api/
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/suggestions", suggestionRoutes);

// --- STATIC FILE SERVING CONFIGURATION ---
// These routes handle serving your frontend files.
// They should come AFTER your API routes.

// Serve static files from the 'frontend' directory.
// This will serve 'index.html' when accessing the root URL,
// and other static assets like 'style.css', 'dashboard.html', etc.
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Handle all other non-API routes by serving the 'index.html' file.
// This is important for "deep links" or direct URL access to frontend pages.
// It ensures that if a route doesn't match an API endpoint or a direct static file,
// it falls back to serving index.html, allowing your frontend routing (if any) to take over.
app.get('*', (req, res) => {
    // We explicitly check for '/api' paths here for robustness,
    // although if the API routes are defined first, they should already handle '/api' requests.
    // This provides a fallback if an API route isn't caught for some reason,
    // ensuring it doesn't serve index.html.
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
    } else {
        // If an /api path was not handled by any specific API route above,
        // it means it's an undefined API endpoint.
        // We'll still send a 404, but the key is that valid API calls
        // won't reach this block.
        res.status(404).json({ msg: 'API endpoint not found' }); // Send JSON error
    }
});


// The original simple root route is now entirely redundant and should be removed.
// The `express.static` middleware will handle serving `index.html` for the root path "/".
// app.get("/", (req, res) => {
//   res.send("Faculty Feedback Portal API is running");
// });


// Start the Server:
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});