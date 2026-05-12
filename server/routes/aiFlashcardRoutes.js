const express = require("express");

const {
  generateFlashcards,
} = require("../controllers/aiFlashcardController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// AI FLASHCARD GENERATION
router.post(
  "/generate",
  protect,
  generateFlashcards
);


module.exports = router;