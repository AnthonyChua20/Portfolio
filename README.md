📌 Project Overview

This project is the backend of my personal portfolio website, built using the MERN stack.
It exposes a RESTful API for managing notes and demonstrates backend fundamentals such as CRUD operations, middleware usage, database integration, and basic API security.

The project was designed to be simple, clean, and easy to extend, while following real-world backend structure and best practices.

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

Full CRUD API for notes

RESTful routing and controller separation

MongoDB integration with Mongoose

Global rate limiting middleware (per IP)

Graceful handling of external service failures

Clean and scalable backend architecture

🔐 Rate Limiting

To prevent abuse, the API uses rate limiting middleware powered by Upstash Redis.

Limits requests per IP

Returns HTTP 429 Too Many Requests when exceeded

Designed to fail open (application remains usable if the rate limit service is unavailable)

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
MongoDB_URL=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

▶️ Running the Project Locally
npm install
npm run dev


The server will start on:

http://localhost:5000

🧠 What I Learned

Structuring a backend project using MVC principles

Writing asynchronous controllers using async/await

Implementing and chaining Express middleware

Connecting and querying MongoDB with Mongoose

Applying basic API security concepts (rate limiting)

Handling failures gracefully in backend systems

🔮 Future Improvements

Authentication & authorization

User-specific data

Frontend integration

Deployment to cloud platforms

👤 Author

Anthony Chua