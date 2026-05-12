const express = require("express");

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE NOTE
router.post(
  "/",
  protect,
  createNote
);


// GET NOTES
router.get(
  "/",
  protect,
  getNotes
);


// UPDATE NOTE
router.put(
  "/:id",
  protect,
  updateNote
);


// DELETE NOTE
router.delete(
  "/:id",
  protect,
  deleteNote
);


module.exports = router;