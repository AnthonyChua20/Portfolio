import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import connectDB from "./config/db.js";
import "dotenv/config";
import rateLimiter from "./middleware/rateLimiter.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import path from "path";

const app = express();
// Port
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware
//For development(CORS)
  app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? "*"
      : "http://localhost:5173",
  })
);

app.use(express.json());
app.use(logger);
app.use(rateLimiter);

// Routes
app.use("/api/notes", noteRoutes);


app.use(errorHandler);

//For Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../FrontEnd/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd", "dist", "index.html"));
  });
}


// Database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
});
