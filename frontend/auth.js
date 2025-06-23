// frontend/auth.js
// This file provides utility functions for handling user authentication on the frontend.

/**
 * Stores the JWT token and user information in local storage.
 * @param {string} token - The JSON Web Token received from the backend.
 * @param {object} user - The user object (e.g., {id, email, roll_no, branch}).
 */
export function saveAuthData(token, user) {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
}

/**
 * Retrieves the JWT token from local storage.
 * @returns {string | null} The JWT token or null if not found.
 */
export function getAuthToken() {
    return localStorage.getItem('jwtToken');
}

/**
 * Retrieves the current authenticated user's information from local storage.
 * @returns {object | null} The user object or null if not found.
 */
export function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

/**
 * Removes authentication data from local storage (logs out the user).
 */
export function clearAuthData() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentUser');
}

/**
 * Checks if a user is currently authenticated by verifying the presence of a token.
 * @returns {boolean} True if a token exists, false otherwise.
 */
export function isAuthenticated() {
    return !!getAuthToken();
}

/**
 * Redirects to the login page if the user is not authenticated.
 * Call this at the top of pages that require authentication (e.g., dashboard, feedback, suggestion).
 */
export function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html'; // Redirect to login page
    }
}

/**
 * Redirects to the dashboard if the user is already authenticated.
 * Call this on login/register pages to prevent authenticated users from seeing them.
 */
export function redirectToDashboardIfAuthenticated() {
    if (isAuthenticated()) {
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    }
}
