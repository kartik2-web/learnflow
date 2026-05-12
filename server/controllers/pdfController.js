const Pdf = require("../models/Pdf");

const updateStudyStreak =
  require("../utils/updateStudyStreak");

const fs = require("fs");

const pdfParse = require("pdf-parse");

const axios = require("axios");


// UPLOAD PDF
const uploadPdf = async (
  req,
  res
) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message:
          "No file uploaded",
      });
    }

    const pdf =
      await Pdf.create({

        user: req.user._id,

        title:
          req.file.originalname,

        fileUrl:
          `/uploads/${req.file.filename}`,
      });

    await updateStudyStreak(
      req.user._id
    );

    res.status(201).json(pdf);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET PDFs
const getPdfs = async (
  req,
  res
) => {

  try {

    const pdfs =
      await Pdf.find({

        user: req.user._id,

      }).sort({
        createdAt: -1,
      });

    res.json(pdfs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



const deletePdf = async (
  req,
  res
) => {

  try {

    const pdf =
      await Pdf.findById(
        req.params.id
      );

    if (!pdf) {

      return res.status(404).json({
        message:
          "PDF not found",
      });
    }

    await pdf.deleteOne();

    res.json({
      message:
        "PDF deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



const generateSummary = async (
  req,
  res
) => {

  try {

    const { pdfId } = req.body;

    const pdf =
      await Pdf.findById(pdfId);

    if (!pdf) {

      return res.status(404).json({
        message:
          "PDF not found",
      });
    }

    
    const pdfFileName =
      pdf.fileUrl.split("/").pop();

    
    const pdfPath =
      `uploads/${pdfFileName}`;

    
    if (
      !fs.existsSync(pdfPath)
    ) {

      return res.status(404).json({
        message:
          "PDF file missing",
      });
    }

    
    const dataBuffer =
      fs.readFileSync(pdfPath);

    
    const pdfData =
      await pdfParse(dataBuffer);

    const extractedText =
      pdfData.text
        .replace(/\n/g, " ")
        .slice(0, 4000);

    // AI PROMPT
    const prompt = `
Generate a concise study summary from the material below.

Rules:
- Use simple student-friendly language
- Include key concepts
- Use bullet points
- Keep it concise and useful for revision

Study Material:
${extractedText}
`;

    // AI REQUEST
    const response =
      await axios.post(

        "https://openrouter.ai/api/v1/chat/completions",

        {
          model:
            "openai/gpt-3.5-turbo",

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

    const summary =
      response.data.choices[0]
      .message.content;

    await updateStudyStreak(
      req.user._id
    );

    res.json({ summary });

  } catch (error) {

    console.log(
      error.response?.data ||
      error
    );

    res.status(500).json({

      message:
        error.response?.data?.error
          ?.message ||

        error.message,
    });
  }
};


module.exports = {

  uploadPdf,

  getPdfs,

  deletePdf,

  generateSummary,
};