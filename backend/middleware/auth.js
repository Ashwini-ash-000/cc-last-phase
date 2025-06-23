// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
require("dotenv").config(); // Load environment variables, including JWT_SECRET

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        // Use process.env.JWT_SECRET which is loaded via dotenv
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure the payload structure matches what's set during login/registration
        // Your auth.js routes set payload as { user: { id, email, roll_no, branch } }
        req.user = decoded.user;
        next();
    } catch (err) {
        // Log specific JWT errors for debugging
        if (err.name === 'TokenExpiredError') {
            console.error("Token verification failed: Token Expired");
            return res.status(401).json({ msg: 'Token is expired. Please log in again.' });
        } else if (err.name === 'JsonWebTokenError') {
            console.error("Token verification failed: Invalid Token", err.message);
            return res.status(401).json({ msg: 'Token is not valid' }); // This is the error you saw
        } else {
            console.error("Token verification failed:", err.message);
            return res.status(500).json({ msg: 'Server error during token verification.' });
        }
    }
};