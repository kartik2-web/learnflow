const User = require("../models/User");

const updateStudyStreak = async (userId) => {

  const user = await User.findById(userId);

  if (!user) return;

  const today = new Date();

  const lastDate = user.lastStudyDate;


  
  if (!lastDate) {

    user.studyStreak = 1;

    user.lastStudyDate = today;

    await user.save();

    return;
  }


  
  const diffTime =
    today.getTime() - lastDate.getTime();

  const diffDays = Math.floor(
    diffTime / (1000 * 60 * 60 * 24)
  );


  
  if (diffDays === 0) {
    return;
  }


  
  if (diffDays === 1) {

    user.studyStreak += 1;

  } else {

    
    user.studyStreak = 1;
  }


  user.lastStudyDate = today;

  await user.save();
};

module.exports = updateStudyStreak;