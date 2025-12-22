import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import connectDB from "./config/db.js";
import "dotenv/config";

const app = express();

// Middleware
app.use(express.json());

// Database
connectDB();

// Routes
app.use("/api/notes", noteRoutes);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});