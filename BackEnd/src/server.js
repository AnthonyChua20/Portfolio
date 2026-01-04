import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import connectDB from "./config/db.js";
import "dotenv/config";
import rateLimiter from "./middleware/ratelimiter.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors"

const app = express();

// Middleware
app.use(cors({
  origin:"http://localhost:5173",
}))
app.use(express.json());
app.use(logger);
app.use(rateLimiter)



// Routes
app.use("/api/notes", noteRoutes);
app.use(errorHandler)

// Port
const PORT = process.env.PORT || 5000;
// Database
connectDB().then(()=>{

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
 });
}); 