// backend/middleware/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load JWT_SECRET from .env

// Middleware function to authenticate user requests using JWT
const auth = (req, res, next) => {
  // Get the token from the request header
  // It's usually sent as "Bearer YOUR_TOKEN_STRING"
  const token = req.header("x-auth-token"); // Common header name for JWT

  // Check if no token is provided
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" }); // 401 Unauthorized
  }

  try {
    // Verify the token using the JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user payload (e.g., user ID, email) to the request object.
    // This makes user information available in subsequent route handlers.
    req.user = decoded.user;
    next(); // Pass control to the next middleware/route handler
  } catch (err) {
    // If token verification fails (e.g., token is invalid or expired)
    res.status(401).json({ msg: "Token is not valid" }); // 401 Unauthorized
  }
};

module.exports = auth;
