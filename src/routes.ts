import express from "express";

import { authenticateToken } from "./middleware/auth";
import {
  getMemoriesByUserId,
  getMemoriesByUserOrCoupleId,
  createMemory,
  deleteMemory,
} from "./controllers/memoryController";
import {
  createNote,
  deleteNote,
  getNotesByUserId,
} from "./controllers/noteController";

const router = express.Router();

router.post("/api/my-memories", authenticateToken, createMemory);
router.get("/api/my-memories", authenticateToken, getMemoriesByUserId);
router.get("/api/memories", authenticateToken, getMemoriesByUserOrCoupleId);
router.delete("/api/memories/:id", authenticateToken, deleteMemory);

router.post("/api/notes", authenticateToken, createNote);
router.get("/api/notes", authenticateToken, getNotesByUserId);
router.delete("/api/notes/:id", authenticateToken, deleteNote);

export default router;
