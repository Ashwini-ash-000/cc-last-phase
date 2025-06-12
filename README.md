Faculty Feedback Portal
This project provides a simple web application for submitting and viewing faculty feedback and suggestions. It consists of a Node.js Express backend with a PostgreSQL database and a plain HTML/CSS/JavaScript frontend.

🚀 Project Structure
faculty-feedback-portal/
├── backend/
│   ├── db.js
│   ├── index.js
│   ├── routes/
│   │   ├── feedback.js
│   │   └── suggestion.js
├── frontend/
│   ├── index.html
│   ├── feedback.html
│   ├── suggestion.html
│   ├── style.css
├── .env.example
├── package.json
└── README.md

⚙️ Setup Instructions
1. Database Setup (PostgreSQL)
   You need an active PostgreSQL database. You can use a local instance or a cloud-hosted one (e.g., Render PostgreSQL, ElephantSQL).

Run the following SQL commands to create the feedback and suggestions tables:

CREATE TABLE feedback (
id SERIAL PRIMARY KEY,
faculty_name VARCHAR(100),
rating INTEGER CHECK (rating >= 1 AND rating <= 5),
comment TEXT,
submitted_by VARCHAR(100),
submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE suggestions (
id SERIAL PRIMARY KEY,
title VARCHAR(150),
suggestion TEXT,
submitted_by VARCHAR(100),
status VARCHAR(20) DEFAULT 'Pending',
submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

2. Backend Setup
   Navigate to the project root:
   Ensure you are in the faculty-feedback-portal directory (the one containing backend/, frontend/, package.json).

Create .env file:
Copy the .env.example file and rename it to .env in the project root.

cp .env.example .env

Configure Environment Variables:
Open the newly created .env file and replace your_postgres_connection_string_here with your actual PostgreSQL connection URL.

DATABASE_URL=postgres://user:password@host:port/database_name

Install Dependencies:
Open your terminal in the project root (faculty-feedback-portal/) and run:

npm install
# or
yarn install

Run the Backend Locally:
Start the Express server:

npm start
# or
yarn start

The server should start on http://localhost:5000 (or the port specified in your .env). You can test it by visiting http://localhost:5000 in your browser, which should show "Faculty Feedback Portal API is running".

3. Frontend Setup
   The frontend is static HTML, CSS, and JavaScript.

Open Frontend Files:
You can open frontend/index.html directly in your web browser. This will give you the basic interface.

Update Backend URL in Frontend JavaScript:
This is CRITICAL for the frontend to communicate with your deployed backend.
Open frontend/feedback.html and frontend/suggestion.html.
Find the line:

const BACKEND_URL = "https://YOUR_RENDER_BACKEND_URL.onrender.com"; // <-- REPLACE THIS!

Replace https://YOUR_RENDER_BACKEND_URL.onrender.com with the actual URL of your deployed backend service on Render (e.g., https://last-try-whop.onrender.com).

For local testing, you can temporarily set BACKEND_URL = "http://localhost:5000"; if your backend is running locally. Remember to change it back for deployment!

🚀 Deployment to Render
1. Prepare for GitHub
   Initialize Git (if not already):
   If your project isn't a Git repository yet, navigate to your faculty-feedback-portal folder in the terminal and run:

git init

Create .gitignore (Optional but Recommended):
Create a file named .gitignore in your project root (faculty-feedback-portal/) to prevent unnecessary files from being committed:

node_modules/
.env

Commit and Push to GitHub:
Add your files, commit, and push them to a new or existing GitHub repository. Ensure the backend/, frontend/, package.json, .env.example, and README.md files are all at the root level of your repository.

git add .
git commit -m "Initial commit for Faculty Feedback Portal"
git branch -M main # (or 'master' if you prefer)
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main

(Replace your-username and your-repo-name with your actual GitHub details.)

2. Deploy Backend to Render
   Go to Render Dashboard:
   Visit https://render.com and log in.

Create New Web Service:

Click "New" -> "Web Service".

Connect your GitHub account and select the repository you just pushed.

Crucial Render Settings:

Root Directory: Leave this field BLANK. (This assumes your package.json is at the root of your repo.)

Build Command: npm install

Start Command: npm start

Instance Type: "Free" (for testing)

Add Environment Variable:

In the "Environment" section of your Render service settings, add an environment variable:

Key: DATABASE_URL

Value: Your PostgreSQL connection string (the same one you put in your local .env file).

Deploy:
Click "Create Web Service". Render will automatically build and deploy your backend. Monitor the logs for success.

3. Deploy Frontend (Optional, or Host Statically)
   For local development, you can simply open the frontend/index.html file in your browser.

For a deployed frontend:

You can host the frontend/ folder contents on a static site host (like Render Static Site, Netlify, Vercel, GitHub Pages).

Alternatively, you could configure your Express backend to serve the static frontend files (though for simple cases, a dedicated static host is often better).

Remember to update the BACKEND_URL in your frontend/feedback.html and frontend/suggestion.html files to your deployed Render backend URL before deploying the frontend!

This comprehensive guide should get you started from scratch and avoid the previous deployment hurdles. Let me know if any step is unclear or if you run into new issues!