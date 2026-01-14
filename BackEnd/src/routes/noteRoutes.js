import express from "express";
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNote,
} from "../controllers/notesController.js";
import adminMiddleware from "../middleware/admin.js";

const router = express.Router();

// Public
router.get("/", getAllNotes);
router.get("/:id", getNote);

// Admin-only
router.post("/", adminMiddleware, createNote);
router.put("/:id", adminMiddleware, updateNote);
router.delete("/:id", adminMiddleware, deleteNote);

export default router;
