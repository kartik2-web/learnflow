const model = require("../config/gemini");

const generateSummary = async (req, res) => {
  try {

    const { content } = req.body;

    console.log("Received Content:", content);

    if (!content) {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    const prompt = `
Summarize the following notes into short bullet points for students:

${content}
`;

    const result = await model.generateContent(prompt);

    const summary = result.response.text();

    console.log("Generated Summary:", summary);

    res.json({
      summary,
    });

  } catch (error) {

    console.log("FULL AI ERROR:");
    console.log(error);

    res.status(500).json({
      message: "AI Summary Failed",
    });

  }
};

module.exports = {
  generateSummary,
};