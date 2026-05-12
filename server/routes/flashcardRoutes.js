const express = require("express");

const {
  createFlashcard,
  saveAIFlashcards,
  getFlashcards,
  deleteFlashcard,
} = require("../controllers/flashcardController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE FLASHCARD
router.post("/", protect, createFlashcard);


// SAVE AI FLASHCARDS
router.post(
  "/save-ai",
  protect,
  saveAIFlashcards
);


// GET FLASHCARDS
router.get("/", protect, getFlashcards);


// DELETE FLASHCARD
router.delete(
  "/:id",
  protect,
  deleteFlashcard
);


module.exports = router;