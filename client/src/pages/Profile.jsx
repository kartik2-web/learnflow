import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import PageWrapper from "../components/PageWrapper";

import API from "../api/axios";

import { useTheme } from "../context/ThemeContext";

import toast from "react-hot-toast";

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

      toast.error(
        "Could not load profile"
      );
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

        <div className="max-w-7xl mx-auto px-2 md:px-0 pb-20">

          {/* HERO */}
          <div
            className="

            bg-gradient-to-r

            from-blue-600 to-indigo-700

            rounded-[36px]

            p-10 md:p-14

            text-white

            shadow-2xl

            mb-14
            "
          >

            <div className="flex flex-col lg:flex-row items-center gap-10">

              {/* AVATAR */}
              <div
                className="

                w-40 h-40 rounded-full

                bg-white/20

                backdrop-blur-sm

                flex items-center justify-center

                text-7xl

                shadow-2xl
                "
              >

                👤

              </div>


              {/* USER INFO */}
              <div className="flex-1 text-center lg:text-left">

                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">

                  {
                    user?.name ||

                    "LearnFlow User"
                  }

                </h1>

                <p className="text-xl text-blue-100 mb-8">

                  {
                    user?.email ||

                    "AI-powered learner"
                  }

                </p>


                {/* TAGS */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">

                  <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl font-bold shadow-lg">

                    📚 {stats.totalNotes} Notes

                  </div>

                  <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl font-bold shadow-lg">

                    📄 {stats.totalPdfs} PDFs

                  </div>

                  <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl font-bold shadow-lg">

                    🧠 {totalQuizzes} Quizzes

                  </div>

                  <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl font-bold shadow-lg">

                    🏅 {achievements} Achievements

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ANALYTICS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-14">

            {/* AVG SCORE */}
            <div
              className={`

              rounded-[32px]

              p-8

              shadow-2xl

              hover:-translate-y-1

              transition-all duration-300

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

              rounded-[32px]

              p-8

              shadow-2xl

              hover:-translate-y-1

              transition-all duration-300

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

              rounded-[32px]

              p-8

              shadow-2xl

              hover:-translate-y-1

              transition-all duration-300

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


            {/* STREAK */}
            <div
              className={`

              rounded-[32px]

              p-8

              shadow-2xl

              hover:-translate-y-1

              transition-all duration-300

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


          {/* ACHIEVEMENTS SECTION */}
          <div
            className={`

            rounded-[32px]

            p-10

            shadow-2xl

            mb-14

            ${
              darkMode

                ? "bg-gray-900"

                : "bg-white"
            }
            `}
          >

            <h2 className="text-3xl font-bold mb-8">

              Achievements 🏆

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl p-6 shadow-xl">

                <div className="text-5xl mb-4">

                  🎯

                </div>

                <h3 className="text-2xl font-bold">

                  Quiz Starter

                </h3>

              </div>


              <div className="bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white rounded-3xl p-6 shadow-xl">

                <div className="text-5xl mb-4">

                  🚀

                </div>

                <h3 className="text-2xl font-bold">

                  Active Learner

                </h3>

              </div>


              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-6 shadow-xl">

                <div className="text-5xl mb-4">

                  🧠

                </div>

                <h3 className="text-2xl font-bold">

                  Smart Thinker

                </h3>

              </div>


              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-3xl p-6 shadow-xl">

                <div className="text-5xl mb-4">

                  🔥

                </div>

                <h3 className="text-2xl font-bold">

                  Streak Master

                </h3>

              </div>

            </div>

          </div>


          {/* MOTIVATION */}
          <div
            className="

            bg-gradient-to-r

            from-indigo-600 to-blue-700

            rounded-[36px]

            p-10 md:p-12

            text-white

            shadow-2xl
            "
          >

            <h2 className="text-4xl font-bold mb-5">

              Keep Growing 🚀

            </h2>

            <p className="text-xl leading-relaxed opacity-90 max-w-3xl">

              Every quiz, every note, and every study session
              moves you closer to mastery.
              Stay consistent and keep learning.

            </p>

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}

export default Profile;