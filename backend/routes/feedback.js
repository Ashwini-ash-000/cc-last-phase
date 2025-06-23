<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Submit Feedback</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
  </style>
</head>
<body class="bg-gradient-to-br from-blue-950 to-gray-900 text-white min-h-screen flex items-center justify-center p-6">
  <div class="w-full max-w-3xl bg-white bg-opacity-5 backdrop-blur-lg shadow-xl rounded-2xl p-8">
    <h1 class="text-3xl font-bold text-yellow-400 text-center mb-6">Faculty Feedback Form</h1>

    <form id="feedbackForm" class="space-y-6">
      <!-- Faculty Name -->
      <div>
        <label class="block text-sm text-yellow-300 mb-1" for="faculty_name">Faculty Name</label>
        <input type="text" id="faculty_name" name="faculty_name" required
               class="w-full px-4 py-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
      </div>

      <!-- Feedback Questions -->
      <div class="space-y-5">
        <h2 class="text-xl text-yellow-300 font-semibold mb-2">Rate the Following:</h2>

        <!-- Question Template -->
        <div class="space-y-4">
          <div>
            <label class="block text-white font-medium mb-1">1. Clarity of Teaching</label>
            <select name="q1_clarity" class="w-full p-2 rounded bg-white text-black" required>
              <option value="">Select</option>
              <option>Strongly Agree</option>
              <option>Agree</option>
              <option>Neutral</option>
              <option>Disagree</option>
              <option>Strongly Disagree</option>
            </select>
          </div>

          <div>
            <label class="block text-white font-medium mb-1">2. Engagement in Class</label>
            <select name="q2_engagement" class="w-full p-2 rounded bg-white text-black" required>
              <option value="">Select</option>
              <option>Strongly Agree</option>
              <option>Agree</option>
              <option>Neutral</option>
              <option>Disagree</option>
              <option>Strongly Disagree</option>
            </select>
          </div>

          <div>
            <label class="block text-white font-medium mb-1">3. Support Outside Class</label>
            <select name="q3_support" class="w-full p-2 rounded bg-white text-black" required>
              <option value="">Select</option>
              <option>Strongly Agree</option>
              <option>Agree</option>
              <option>Neutral</option>
              <option>Disagree</option>
              <option>Strongly Disagree</option>
            </select>
          </div>

          <div>
            <label class="block text-white font-medium mb-1">4. Fairness in Evaluation</label>
            <select name="q4_fairness" class="w-full p-2 rounded bg-white text-black" required>
              <option value="">Select</option>
              <option>Strongly Agree</option>
              <option>Agree</option>
              <option>Neutral</option>
              <option>Disagree</option>
              <option>Strongly Disagree</option>
            </select>
          </div>

          <div>
            <label class="block text-white font-medium mb-1">5. Overall Experience</label>
            <select name="q5_overall" class="w-full p-2 rounded bg-white text-black" required>
              <option value="">Select</option>
              <option>Strongly Agree</option>
              <option>Agree</option>
              <option>Neutral</option>
              <option>Disagree</option>
              <option>Strongly Disagree</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Comment -->
      <div>
        <label class="block text-sm text-yellow-300 mb-1" for="comment">Additional Comments</label>
        <textarea id="comment" name="comment" rows="4" required
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
      </div>

      <!-- Submit Button -->
      <div class="text-center">
        <button type="submit"
                class="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg transition-all">
          Submit Feedback
        </button>
      </div>
    </form>
  </div>

  <script type="module">
    import { requireAuth, getToken } from './auth.js';
    requireAuth();

    const form = document.getElementById("feedbackForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        faculty_name: form.faculty_name.value,
        q1_clarity: form.q1_clarity.value,
        q2_engagement: form.q2_engagement.value,
        q3_support: form.q3_support.value,
        q4_fairness: form.q4_fairness.value,
        q5_overall: form.q5_overall.value,
        comment: form.comment.value,
      };

      try {
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
          alert("✅ Feedback submitted successfully!");
          form.reset();
        } else {
          alert("❌ Error: " + result.msg || result.error);
        }
      } catch (err) {
        alert("⚠️ Failed to submit feedback.");
        console.error(err);
      }
    });
  </script>
</body>
</html>
