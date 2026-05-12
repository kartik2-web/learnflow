const axios = require("axios");


const generateFlashcards = async (req, res) => {
  try {

    const { topic } = req.body;

    const prompt = `
Generate 5 flashcards for the topic: ${topic}

Return ONLY valid JSON array format.

Example:
[
  {
    "question": "What is a process?",
    "answer": "A process is a program in execution."
  }
]
`;

    const response = await axios.post(

      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }

    );

    const text =
      response.data.candidates[0]
      .content.parts[0]
      .text;

    res.json({
      result: text,
    });

  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "AI Flashcard Generation Failed",
    });

  }
};


module.exports = {
  generateFlashcards,
};