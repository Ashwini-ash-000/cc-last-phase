<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Faculty Suggestions</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        dark: {
                            900: '#0f172a',
                            800: '#1e293b',
                            700: '#334155',
                            600: '#475569',
                            500: '#64748b',
                        },
                        primary: {
                            900: '#14532d',
                            800: '#166534',
                            700: '#15803d',
                            600: '#16a34a',
                            500: '#22c55e',
                        }
                    },
                    boxShadow: {
                        'glow': '0 0 15px rgba(34, 197, 94, 0.3)',
                        'glow-lg': '0 0 25px rgba(34, 197, 94, 0.5)'
                    }
                }
            }
        }
    </script>

    <style>
        /* Custom styles */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0f172a;
            color: #e2e8f0;
        }
        h1, h2 {
            font-family: 'Montserrat', sans-serif;
        }

        /* Glass morphism effect */
        .glass-card {
            background: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Input field styling */
        .input-field {
            @apply bg-dark-800 border-dark-600 text-gray-200 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50;
        }

        /* Button hover effect */
        .btn-hover-effect {
            @apply transition-all duration-300 transform hover:scale-105 hover:shadow-glow-lg;
        }

        /* Feedback card hover effect */
        .feedback-card {
            @apply transition-all duration-300 hover:scale-[1.02] hover:shadow-glow;
        }

        /* Modal backdrop */
        .modal-backdrop-blur {
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
        }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center py-12 px-4">
<div class="max-w-4xl w-full glass-card p-10 lg:p-12 rounded-2xl border-l-8 border-primary-500 shadow-xl transform transition-all duration-500">
    <h1 class="text-4xl lg:text-5xl font-extrabold mb-8 text-center tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-cyan-400">
        Submit a Suggestion
    </h1>

    <form id="suggestionForm" class="space-y-8">
        <div>
            <label for="title" class="block text-gray-300 text-lg font-bold mb-2">Suggestion Title:</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-7 w-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 12h14M5 16h14"></path></svg>
                </div>
                <input type="text" id="title" name="title" required
                       placeholder="A concise summary of your suggestion"
                       class="input-field pl-12 pr-4 py-3 border-2 rounded-xl w-full leading-tight focus:outline-none transition duration-300 ease-in-out text-base font-medium">
            </div>
        </div>

        <div>
            <label for="suggestion" class="block text-gray-300 text-lg font-bold mb-2">Suggestion Details:</label>
            <div class="relative">
                <div class="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-7 w-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h10M7 16h10M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <textarea id="suggestion" name="suggestion" rows="6" required
                          placeholder="Describe your suggestion in detail..."
                          class="input-field pl-12 pr-4 py-3 border-2 rounded-xl w-full leading-tight focus:outline-none resize-y text-base font-medium"></textarea>
            </div>
        </div>

        <button type="submit" id="submitButton"
                class="w-full bg-gradient-to-r from-primary-600 to-cyan-600 text-white font-extrabold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 btn-hover-effect text-lg tracking-wide uppercase">
            Submit Suggestion
        </button>
    </form>

    <hr class="my-14 border-t-2 border-gray-700">

    <h2 class="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-primary-400 mb-8">Your Recent Suggestions</h2>
    <div id="suggestionList" class="space-y-8">
        <p class="text-gray-400 text-center text-xl animate-pulse py-8" id="loadingMessage">Loading your suggestions...</p>
    </div>
</div>

<div id="customAlert" class="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center p-4 hidden z-50 transition-opacity duration-300 ease-in-out opacity-0 modal-backdrop-blur">
    <div class="bg-dark-800 p-8 rounded-xl shadow-2xl max-w-md w-full text-center transform scale-90 transition-all duration-300 ease-out border-l-8 border-primary-500">
        <div id="alertIcon" class="text-5xl mb-6 mx-auto w-20 h-20 flex items-center justify-center rounded-full"></div>
        <p id="alertMessage" class="text-2xl font-bold text-gray-100 mb-6 leading-relaxed"></p>
        <button id="alertCloseButton" class="bg-gradient-to-r from-primary-600 to-cyan-600 hover:from-primary-700 hover:to-cyan-700 text-white font-bold py-3 px-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-200 btn-hover-effect">
            Got It!
        </button>
    </div>
</div>

<script type="module">
    // Import authentication utilities
    import { requireAuth, getAuthToken, redirectToLogin } from './auth.js';

    // Ensure user is authenticated before proceeding
    try {
        await requireAuth();
    } catch (error) {
        showCustomAlert("You need to be logged in to access this page. Redirecting to login...", 'error');
        setTimeout(() => {
            redirectToLogin();
        }, 3000);
        throw error; // Stop execution
    }

    const BACKEND_URL = "https://faculty-feedback-backend-n6st.onrender.com";

    // --- Custom Alert System (Enhanced) ---
    function showCustomAlert(message, type = 'info') {
        const customAlert = document.getElementById('customAlert');
        const alertMessage = document.getElementById('alertMessage');
        const alertIcon = document.getElementById('alertIcon');

        // Reset classes
        alertIcon.className = 'text-5xl mb-6 mx-auto w-20 h-20 flex items-center justify-center rounded-full';

        // Apply type-specific styling
        if (type === 'success') {
            alertIcon.classList.add('bg-emerald-900/30', 'text-emerald-400');
            alertIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
        } else if (type === 'error') {
            alertIcon.classList.add('bg-rose-900/30', 'text-rose-400');
            alertIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.174 3.35 1.9 3.35h13.713c1.726 0 2.766-1.85 1.9-3.35L13.73 7.82c-.774-1.342-2.694-1.342-3.468 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>';
        } else { // 'info' or default
            alertIcon.classList.add('bg-primary-900/30', 'text-primary-400');
            alertIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.02M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>';
        }

        alertMessage.textContent = message;
        customAlert.classList.remove('hidden');
        setTimeout(() => {
            customAlert.classList.remove('opacity-0');
            customAlert.querySelector('div').classList.remove('scale-90');
            customAlert.querySelector('div').classList.add('scale-100');
        }, 10);
    }

    document.getElementById('alertCloseButton').addEventListener('click', () => {
        const customAlert = document.getElementById('customAlert');
        customAlert.classList.add('opacity-0');
        customAlert.querySelector('div').classList.add('scale-90');
        customAlert.querySelector('div').classList.remove('scale-100');
        setTimeout(() => {
            customAlert.classList.add('hidden');
        }, 300);
    });

    async function fetchSuggestions() {
        const suggestionList = document.getElementById('suggestionList');
        const loadingMessage = document.getElementById('loadingMessage');
        suggestionList.innerHTML = '';
        loadingMessage.classList.remove('hidden');

        const token = getAuthToken();

        if (!token) {
            showCustomAlert("Authentication token not found. Please log in.", 'error');
            loadingMessage.classList.add('hidden');
            suggestionList.innerHTML = '<p class="text-rose-500 text-center text-lg py-8">Please log in to view your suggestions.</p>';
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/suggestions/my`, {
                headers: {
                    'x-auth-token': token
                }
            });

            if (response.status === 401) {
                // Token is invalid or expired
                showCustomAlert("Your session has expired. Please log in again.", 'error');
                setTimeout(() => {
                    redirectToLogin();
                }, 3000);
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || `HTTP error! status: ${response.status}`);
            }

            const suggestionEntries = await response.json();
            loadingMessage.classList.add('hidden');

            if (suggestionEntries.length === 0) {
                suggestionList.innerHTML = '<p class="text-gray-400 text-center text-xl py-8 font-medium">You have not submitted any suggestions yet. Be the first!</p>';
            } else {
                suggestionEntries.forEach(entry => {
                    const suggestionCard = document.createElement('div');
                    suggestionCard.className = 'feedback-card bg-dark-800 p-7 rounded-xl shadow-lg border-l-4 border-primary-500 hover:shadow-glow transition duration-300';
                    suggestionCard.innerHTML = `
                        <p class="text-2xl font-extrabold text-primary-400 mb-3">${entry.title}</p>
                        <p class="text-gray-300 leading-relaxed text-base">${entry.suggestion}</p>
                        <div class="flex justify-between items-center mt-4">
                            <span class="text-sm ${getStatusColorClass(entry.status)} px-3 py-1 rounded-full">
                                ${entry.status}
                            </span>
                            <p class="text-gray-500 text-xs font-light">
                                Submitted on ${new Date(entry.submitted_at).toLocaleString()}
                            </p>
                        </div>
                    `;
                    suggestionList.appendChild(suggestionCard);
                });
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            loadingMessage.classList.add('hidden');
            showCustomAlert(error.message || "Failed to load your suggestions. Please check your network and server status.", 'error');
            suggestionList.innerHTML = '<p class="text-rose-500 text-center text-lg py-8">Failed to load your suggestions. Please try again later.</p>';
        }
    }

    function getStatusColorClass(status) {
        switch (status) {
            case 'Approved':
                return 'bg-green-900/30 text-green-400';
            case 'Rejected':
                return 'bg-rose-900/30 text-rose-400';
            case 'In Review':
                return 'bg-yellow-900/30 text-yellow-400';
            default: // 'Pending'
                return 'bg-blue-900/30 text-blue-400';
        }
    }

    document.getElementById('suggestionForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitButton = document.getElementById('submitButton');
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        submitButton.classList.add('opacity-70', 'cursor-not-allowed');

        const formData = new FormData(this);
        const body = Object.fromEntries(formData.entries());

        if (!body.title.trim() || !body.suggestion.trim()) {
            showCustomAlert("Please enter both title and suggestion details.", 'error');
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Suggestion';
            submitButton.classList.remove('opacity-70', 'cursor-not-allowed');
            return;
        }

        const token = getAuthToken();
        if (!token) {
            showCustomAlert("You must be logged in to submit a suggestion.", 'error');
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Suggestion';
            submitButton.classList.remove('opacity-70', 'cursor-not-allowed');
            return;
        }

        try {
            const res = await fetch(`${BACKEND_URL}/api/suggestions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token
                },
                body: JSON.stringify(body),
            });

            if (res.status === 401) {
                // Token is invalid or expired
                showCustomAlert("Your session has expired. Please log in again.", 'error');
                setTimeout(() => {
                    redirectToLogin();
                }, 3000);
                return;
            }

            const result = await res.json();

            if (res.ok) {
                showCustomAlert(result.message || "Suggestion submitted successfully!", 'success');
                this.reset();
                fetchSuggestions();
            } else {
                showCustomAlert(result.error || result.msg || "Failed to submit suggestion.", 'error');
            }
        } catch (error) {
            console.error("Error submitting suggestion:", error);
            showCustomAlert("An unexpected error occurred. Please check your network and try again.", 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Suggestion';
            submitButton.classList.remove('opacity-70', 'cursor-not-allowed');
        }
    });

    document.addEventListener('DOMContentLoaded', fetchSuggestions);
</script>
</body>
</html>