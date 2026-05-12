const express = require("express");

const router = express.Router();

const {
  generateQuiz,
  getQuizHistory,
  updateQuizScore,
} = require("../controllers/quizController");

const protect = require("../middleware/authMiddleware");


// GENERATE QUIZ
router.post(
  "/generate",
  protect,
  generateQuiz
);


// QUIZ HISTORY
router.get(
  "/history",
  protect,
  getQuizHistory
);


// UPDATE SCORE
router.put(
  "/score",
  protect,
  updateQuizScore
);


module.exports = router;