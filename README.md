📌 Project Overview

🌐 **Live Portfolio Website:** https://portfolio-lrgz.onrender.com  
This backend service powers my personal portfolio website and is actively deployed.

This project is the backend service for my personal portfolio website, built using the MERN stack.

It exposes a RESTful API for managing notes (used as portfolio content) and demonstrates core backend engineering concepts such as CRUD operations, middleware usage, database integration, and basic API security practices.

The project was intentionally designed to be clean, modular, and easy to extend, following real-world backend structure and best practices.

🛠️ Tech Stack

Node.js – JavaScript runtime

Express.js – Web framework

MongoDB – NoSQL database

Mongoose – ODM for MongoDB

Upstash Redis – Rate limiting

dotenv – Environment variable management

📂 Project Structure
src/
├── config/        # Database & external service configuration
├── controllers/   # Business logic
├── middleware/    # Custom middleware (rate limiting)
├── models/        # Mongoose schemas
├── routes/        # API routes
└── server.js      # Application entry point

🚀 Features

Full CRUD REST API for notes

Controller–route separation for maintainability

MongoDB integration with Mongoose

Global rate limiting middleware (per IP)

Graceful handling of external service failures

Clean and scalable backend architecture

🧱 Architecture Overview
React Frontend
      ↓
Express REST API
      ↓
MongoDB (Mongoose)


Sensitive logic and third-party integrations are handled server-side to maintain security and separation of concerns.

🔐 Rate Limiting

To prevent abuse, the API implements rate limiting middleware powered by Upstash Redis.

Limits requests per IP address

Returns HTTP 429 (Too Many Requests) when exceeded

Designed to fail open — the application remains usable if the rate limit service is unavailable

📡 API Endpoints
Method	Endpoint	Description
GET	/api/notes	Get all notes
GET	/api/notes/:id	Get a single note
POST	/api/notes	Create a new note
PUT	/api/notes/:id	Update an existing note
DELETE	/api/notes/:id	Delete a note
⚙️ Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token


Note: Environment variables are not committed for security reasons.

▶️ Running the Project Locally
npm install
npm run dev


The server will start at:

http://localhost:5000

🧠 What I Learned

Structuring backend projects using MVC principles

Writing asynchronous controllers with async/await

Implementing and chaining Express middleware

Connecting and querying MongoDB with Mongoose

Applying basic API security concepts (rate limiting)

Designing backend systems that fail gracefully

🔮 Future Improvements

Authentication & authorization

User-specific data

Extended frontend integration

Deployment to cloud platforms

👤 Author

Anthony Chua
