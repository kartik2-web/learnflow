const Flashcard = require("../models/Flashcard");

const updateStudyStreak = require("../utils/updateStudyStreak");


// CREATE FLASHCARD
const createFlashcard = async (req, res) => {
  try {

    const {
      question,
      answer,
      category,
    } = req.body;

    const flashcard = await Flashcard.create({
      user: req.user._id,
      question,
      answer,
      category,
    });

    // UPDATE STREAK
    await updateStudyStreak(req.user._id);

    res.status(201).json(flashcard);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// SAVE MULTIPLE AI FLASHCARDS
const saveAIFlashcards = async (req, res) => {
  try {

    const { flashcards } = req.body;

    const formattedCards = flashcards.map((card) => ({
      user: req.user._id,
      question: card.question,
      answer: card.answer,
      category: card.category || "AI Generated",
    }));

    const savedCards = await Flashcard.insertMany(
      formattedCards
    );

    // UPDATE STREAK
    await updateStudyStreak(req.user._id);

    res.status(201).json(savedCards);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET FLASHCARDS
const getFlashcards = async (req, res) => {
  try {

    const flashcards = await Flashcard.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(flashcards);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// DELETE FLASHCARD
const deleteFlashcard = async (req, res) => {
  try {

    const flashcard = await Flashcard.findById(
      req.params.id
    );

    if (!flashcard) {
      return res.status(404).json({
        message: "Flashcard not found",
      });
    }

    await flashcard.deleteOne();

    res.json({
      message: "Flashcard deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  createFlashcard,
  saveAIFlashcards,
  getFlashcards,
  deleteFlashcard,
};