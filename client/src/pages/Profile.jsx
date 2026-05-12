import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import PageWrapper from "../components/PageWrapper";

import API from "../api/axios";

import { useTheme } from "../context/ThemeContext";

function Profile() {

  const { darkMode } = useTheme();

  const [quizHistory, setQuizHistory] =
    useState([]);

  const [user, setUser] =
    useState(null);

  const [stats, setStats] =
    useState({

      totalNotes: 0,

      totalPdfs: 0,
    });


  // FETCH DATA
  const fetchData = async () => {

    try {

      const dashboard =
        await API.get(
          "/dashboard/stats"
        );

      const quizzes =
        await API.get(
          "/quiz/history"
        );

      const profile =
        await API.get(
          "/auth/profile"
        );

      setStats(dashboard.data);

      setQuizHistory(quizzes.data);

      setUser(profile.data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchData();

  }, []);


  // ANALYTICS
  const totalQuizzes =
    quizHistory.length;

  const averageScore =
    totalQuizzes > 0

      ? Math.round(

          quizHistory.reduce(

            (acc, quiz) =>

              acc +
              (quiz.score /
                quiz.totalQuestions) *
                100,

            0
          ) / totalQuizzes
        )

      : 0;

  const bestScore =
    totalQuizzes > 0

      ? Math.max(
          ...quizHistory.map(
            (quiz) =>
              Math.round(
                (quiz.score /
                  quiz.totalQuestions) *
                  100
              )
          )
        )

      : 0;


  // ACHIEVEMENTS
  let achievements = 0;

  if (totalQuizzes >= 1)
    achievements++;

  if (totalQuizzes >= 5)
    achievements++;

  if (averageScore >= 70)
    achievements++;

  if (bestScore === 100)
    achievements++;


  return (

    <DashboardLayout>

      <PageWrapper>

        <div className="max-w-7xl mx-auto px-4 md:px-0 pb-20">

          {/* HEADER */}
          <div className="mb-12">

            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">

              My Profile 👤

            </h1>

            <p
              className={`

              text-lg

              ${
                darkMode

                  ? "text-gray-400"

                  : "text-gray-500"
              }
              `}
            >

              Track your learning journey and achievements.

            </p>

          </div>


          {/* PROFILE CARD */}
          <div
            className={`

            rounded-3xl p-10 mb-12

            shadow-2xl

            ${
              darkMode

                ? "bg-gray-900"

                : "bg-white"
            }
            `}
          >

            <div className="flex flex-col lg:flex-row items-center gap-10">

              {/* AVATAR */}
              <div
                className="

                w-40 h-40 rounded-full

                bg-gradient-to-r

                from-blue-500 to-indigo-600

                flex items-center justify-center

                text-7xl text-white

                shadow-2xl
                "
              >

                👤

              </div>


              {/* INFO */}
              <div className="flex-1">

                <h2 className="text-4xl font-extrabold mb-3">

                  {
                    user?.name ||

                    "LearnFlow User"
                  }

                </h2>

                <p
                  className={`

                  text-lg mb-6

                  ${
                    darkMode

                      ? "text-gray-400"

                      : "text-gray-500"
                  }
                  `}
                >

                  {
                    user?.email ||

                    "AI-powered learner"
                  }

                </p>


                {/* TAGS */}
                <div className="flex flex-wrap gap-4">

                  <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-bold shadow-lg">

                    📚 {stats.totalNotes} Notes

                  </div>

                  <div className="bg-pink-600 text-white px-5 py-3 rounded-2xl font-bold shadow-lg">

                    📄 {stats.totalPdfs} PDFs

                  </div>

                  <div className="bg-green-600 text-white px-5 py-3 rounded-2xl font-bold shadow-lg">

                    🧠 {totalQuizzes} Quizzes

                  </div>

                  <div className="bg-yellow-500 text-white px-5 py-3 rounded-2xl font-bold shadow-lg">

                    🏅 {achievements} Achievements

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ANALYTICS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">

            {/* AVG SCORE */}
            <div
              className={`

              rounded-3xl p-8 shadow-2xl

              ${
                darkMode

                  ? "bg-gray-900"

                  : "bg-white"
              }
              `}
            >

              <h3 className="text-2xl font-bold mb-5">

                Average Score

              </h3>

              <p className="text-6xl font-extrabold text-green-500">

                {averageScore}%

              </p>

            </div>


            {/* BEST SCORE */}
            <div
              className={`

              rounded-3xl p-8 shadow-2xl

              ${
                darkMode

                  ? "bg-gray-900"

                  : "bg-white"
              }
              `}
            >

              <h3 className="text-2xl font-bold mb-5">

                Best Score

              </h3>

              <p className="text-6xl font-extrabold text-pink-500">

                {bestScore}%

              </p>

            </div>


            {/* QUIZZES */}
            <div
              className={`

              rounded-3xl p-8 shadow-2xl

              ${
                darkMode

                  ? "bg-gray-900"

                  : "bg-white"
              }
              `}
            >

              <h3 className="text-2xl font-bold mb-5">

                Quizzes

              </h3>

              <p className="text-6xl font-extrabold text-blue-500">

                {totalQuizzes}

              </p>

            </div>


            {/* REAL STREAK */}
            <div
              className={`

              rounded-3xl p-8 shadow-2xl

              ${
                darkMode

                  ? "bg-gray-900"

                  : "bg-white"
              }
              `}
            >

              <h3 className="text-2xl font-bold mb-5">

                Study Streak

              </h3>

              <p className="text-6xl font-extrabold text-orange-500">

                🔥 {
                  user?.studyStreak || 0
                }

              </p>

            </div>

          </div>


          {/* MOTIVATION */}
          <div
            className="

            bg-gradient-to-r

            from-blue-600 to-indigo-600

            text-white rounded-3xl

            p-10 shadow-2xl
            "
          >

            <h2 className="text-4xl font-bold mb-5">

              Keep Growing 🚀

            </h2>

            <p className="text-xl opacity-90 leading-relaxed">

              Stay consistent and maintain your learning streak.
              Every study session makes you stronger.

            </p>

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}

export default Profile;