const User = require("../models/User");

const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");


// UPDATE STUDY STREAK
const updateStudyStreak = async (
  userId
) => {

  try {

    const user =
      await User.findById(userId);

    if (!user) return;

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const lastStudy =
      user.lastStudyDate

        ? new Date(user.lastStudyDate)

        : null;

    if (lastStudy) {

      lastStudy.setHours(0, 0, 0, 0);
    }


    // FIRST TIME
    if (!lastStudy) {

      user.studyStreak = 1;

    } else {

      const diffTime =
        today - lastStudy;

      const diffDays =
        diffTime /
        (1000 * 60 * 60 * 24);


      // NEXT DAY
      if (diffDays === 1) {

        user.studyStreak += 1;
      }

      // MISSED DAYS
      else if (diffDays > 1) {

        user.studyStreak = 1;
      }

      // SAME DAY
    }

    user.lastStudyDate = today;

    await user.save();

  } catch (error) {

    console.log(error);
  }
};


// REGISTER USER
const registerUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    // CHECK USER EXISTS
    const userExists =
      await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    // HASH PASSWORD
    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    // CREATE USER
    const user =
      await User.create({

        name,

        email,

        password:
          hashedPassword,

        studyStreak: 1,

        lastStudyDate:
          new Date(),
      });

    res.status(201).json({

      _id: user._id,

      name: user.name,

      email: user.email,

      token: generateToken(
        user._id
      ),
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// LOGIN USER
const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // FIND USER
    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    // COMPARE PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }


    // UPDATE STREAK
    await updateStudyStreak(
      user._id
    );


    // GET UPDATED USER
    const updatedUser =
      await User.findById(user._id);

    res.json({

      _id: updatedUser._id,

      name: updatedUser.name,

      email: updatedUser.email,

      studyStreak:
        updatedUser.studyStreak,

      token: generateToken(
        updatedUser._id
      ),
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET USER PROFILE
const getUserProfile = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user._id
      );

    if (user) {

      res.json({

        _id: user._id,

        name: user.name,

        email: user.email,

        studyStreak:
          user.studyStreak,

        lastStudyDate:
          user.lastStudyDate,
      });

    } else {

      res.status(404).json({
        message:
          "User not found",
      });
    }

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {

  registerUser,

  loginUser,

  getUserProfile,
};