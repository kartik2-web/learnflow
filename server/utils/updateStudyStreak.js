const User = require("../models/User");

const updateStudyStreak = async (userId) => {

  const user = await User.findById(userId);

  if (!user) return;

  const today = new Date();

  const lastDate = user.lastStudyDate;


  // FIRST TIME
  if (!lastDate) {

    user.studyStreak = 1;

    user.lastStudyDate = today;

    await user.save();

    return;
  }


  // DAYS DIFFERENCE
  const diffTime =
    today.getTime() - lastDate.getTime();

  const diffDays = Math.floor(
    diffTime / (1000 * 60 * 60 * 24)
  );


  // SAME DAY
  if (diffDays === 0) {
    return;
  }


  // CONTINUE STREAK
  if (diffDays === 1) {

    user.studyStreak += 1;

  } else {

    // RESET STREAK
    user.studyStreak = 1;
  }


  user.lastStudyDate = today;

  await user.save();
};

module.exports = updateStudyStreak;