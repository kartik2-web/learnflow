const fs = require("fs");

const axios = require("axios");

const pdfParse = require("pdf-parse");

const Pdf = require("../models/Pdf");

const Quiz = require("../models/Quiz");


// GENERATE QUIZ
const generateQuiz = async (req, res) => {

  try {

    const { pdfId } = req.body;

    // FIND PDF
    const pdf = await Pdf.findById(pdfId);

    if (!pdf) {

      return res.status(404).json({
        message: "PDF not found",
      });
    }

    // PDF FILE NAME
    const pdfFileName =
      pdf.fileUrl.split("/").pop();

    // PDF PATH
    const pdfPath =
      `uploads/${pdfFileName}`;

    // CHECK FILE
    if (!fs.existsSync(pdfPath)) {

      return res.status(404).json({
        message: "PDF file missing",
      });
    }

    // READ PDF
    const dataBuffer =
      fs.readFileSync(pdfPath);

    // EXTRACT TEXT
    const pdfData =
      await pdfParse(dataBuffer);

    // LIMIT TEXT
    const extractedText =
      pdfData.text
        .replace(/\n/g, " ")
        .slice(0, 3000);

    // PROMPT
    const prompt = `
Create 5 MCQ questions from the study material below.

Rules:
- Questions must come ONLY from study material
- Each question must have 4 unique options
- Randomize correct answer position
- Return ONLY valid JSON
- No markdown
- No explanation

Format:
[
 {
   "question": "Question text",
   "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
   ],
   "answer": "Correct Option"
 }
]

Study Material:
${extractedText}
`;

    // AI REQUEST
    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },

      {
        headers: {

          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json",
        },
      }
    );

    // RAW RESPONSE
    const rawText =
      response.data.choices[0]
      .message.content;

    // EXTRACT JSON
    const jsonMatch =
      rawText.match(/\[[\s\S]*\]/);

    if (!jsonMatch) {

      return res.status(500).json({
        message:
          "AI did not return valid JSON",
      });
    }

    // PARSE QUESTIONS
    const questions =
      JSON.parse(jsonMatch[0]);

    // SAVE QUIZ
    const quiz = await Quiz.create({

      user: req.user._id,

      pdf: pdf._id,

      questions,

      totalQuestions:
        questions.length,
    });

    // RESPONSE
    res.json({

      quizId: quiz._id,

      questions: quiz.questions,
    });

  } catch (error) {

    console.log(error.response?.data || error);

    res.status(500).json({

      message:
        error.response?.data?.error?.message ||

        error.message,
    });
  }
};


// QUIZ HISTORY
const getQuizHistory = async (
  req,
  res
) => {

  try {

    const quizzes =
      await Quiz.find({

        user: req.user._id,

      })
      .populate("pdf")
      .sort({
        createdAt: -1,
      });

    res.json(quizzes);

  } catch (error) {

    res.status(500).json({

      message: error.message,
    });
  }
};


// UPDATE QUIZ SCORE
const updateQuizScore = async (
  req,
  res
) => {

  try {

    const {
      quizId,
      score,
    } = req.body;

    const quiz =
      await Quiz.findById(quizId);

    if (!quiz) {

      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    quiz.score = score;

    await quiz.save();

    res.json({
      message:
        "Quiz score updated",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  generateQuiz,
  getQuizHistory,
  updateQuizScore,
};