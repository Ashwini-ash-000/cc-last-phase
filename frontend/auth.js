// frontend/auth.js

// Function to store the JWT token
export function setAuthToken(token) {
    if (token) {
        localStorage.setItem('token', token);
        console.log('Token stored:', token);
    } else {
        localStorage.removeItem('token');
        console.log('Token removed.');
    }
}

// Function to retrieve the JWT token
export function getAuthToken() {
    return localStorage.getItem('token');
}

// Function to remove the JWT token (e.g., on logout)
export function removeAuthToken() {
    localStorage.removeItem('token');
    console.log('Token removed from localStorage.');
}

// Function to check authentication and redirect if not logged in
export function requireAuth() {
    const token = getAuthToken();
    if (!token) {
        console.warn('No authentication token found. Redirecting to login.');
        // Redirect to your login page
        window.location.href = 'login.html'; // Adjust this to your actual login page
    }
    // Optional: You could also add a basic token validation here (e.g., check if it's expired)
    // However, full validation should happen on the backend.
}

// Function to log out the user
export function logout() {
    removeAuthToken();
    alert('You have been logged out.'); // Use built-in alert or your custom alert
    window.location.href = 'login.html'; // Redirect to login page after logout
}