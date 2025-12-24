import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import connectDB from "./config/db.js";
import "dotenv/config";
import rateLimiter from "./middleware/ratelimiter.js";

const app = express();

// Middleware
app.use(express.json());
app.use(rateLimiter)


// Routes
app.use("/api/notes", noteRoutes);

// Port
const PORT = process.env.PORT || 5000;
// Database
connectDB().then(()=>{

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
 });
}); 