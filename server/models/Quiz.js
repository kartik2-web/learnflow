const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    pdf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pdf",
    },

    questions: [
      {
        question: String,

        options: [String],

        answer: String,
      },
    ],

    score: {
      type: Number,
      default: 0,
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Quiz",
  quizSchema
);