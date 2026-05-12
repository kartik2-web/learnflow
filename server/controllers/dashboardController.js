const Note = require("../models/Note");

const Pdf = require("../models/Pdf");

const User = require("../models/User");


// GET DASHBOARD STATS
const getDashboardStats = async (req, res) => {

  try {

    const totalNotes = await Note.countDocuments({
      user: req.user._id,
    });

    const totalPdfs = await Pdf.countDocuments({
      user: req.user._id,
    });

    const user = await User.findById(
      req.user._id
    );


    // SIMPLE PROGRESS FORMULA
    const completionRate = Math.min(
      (
        (totalNotes + totalPdfs) * 10
      ),
      100
    );


    res.json({

      totalNotes,

      totalPdfs,

      completionRate,

      studyStreak:
        user?.studyStreak || 0,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getDashboardStats,
};