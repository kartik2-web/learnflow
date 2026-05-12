const express = require("express");

const {
  generateSummary,
} = require("../controllers/aiController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// PROTECTED AI ROUTE
router.post("/summary", protect, generateSummary);

module.exports = router;