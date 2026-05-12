import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import PageWrapper from "../components/PageWrapper";

import { useTheme } from "../context/ThemeContext";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Dashboard() {

  const { darkMode } = useTheme();

  const [stats, setStats] = useState({

    totalNotes: 0,

    totalPdfs: 0,

    completionRate: 0,

    studyStreak: 0,
  });

  const [quizHistory, setQuizHistory] =
    useState([]);


  // FETCH DASHBOARD STATS
  const fetchStats = async () => {

    try {

      const token = localStorage.getItem("token");

      const { data } = await API.get(
        "/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(data);

    } catch (error) {

      toast.error("Failed to fetch dashboard");
    }
  };


  // FETCH QUIZ HISTORY
  const fetchQuizHistory = async () => {

    try {

      const { data } = await API.get(
        "/quiz/history"
      );

      setQuizHistory(data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchStats();

    fetchQuizHistory();

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
  const achievements = [];

  if (totalQuizzes >= 1) {

    achievements.push({
      title: "First Quiz Completed",
      icon: "🎯",
      color: "from-blue-500 to-indigo-600",
    });
  }

  if (totalQuizzes >= 5) {

    achievements.push({
      title: "Quiz Explorer",
      icon: "🚀",
      color: "from-pink-500 to-fuchsia-600",
    });
  }

  if (averageScore >= 70) {

    achievements.push({
      title: "Smart Learner",
      icon: "🧠",
      color: "from-green-500 to-emerald-600",
    });
  }

  if (bestScore === 100) {

    achievements.push({
      title: "Perfect Score",
      icon: "🏆",
      color: "from-yellow-500 to-orange-500",
    });
  }


  // CHART DATA
  const chartData =
    quizHistory
      .slice()
      .reverse()
      .map((quiz, index) => ({

        name: `Quiz ${index + 1}`,

        score: Math.round(
          (quiz.score /
            quiz.totalQuestions) *
            100
        ),
      }));


  return (

    <DashboardLayout>

      <PageWrapper>

        <div
          className={`

          min-h-screen

          transition-all duration-300

          px-4 md:px-0 pb-20

          ${
            darkMode

              ? "bg-gray-950 text-white"

              : "bg-gray-100 text-gray-900"
          }
          `}
        >

          {/* HEADER */}
          <div className="mb-12">

            <h1
              className={`

              text-3xl md:text-5xl font-extrabold mb-4

              ${
                darkMode

                  ? "text-white"

                  : "text-gray-800"
              }
              `}
            >

              Welcome Back 👋

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

              Track your learning progress and AI quizzes.

            </p>

          </div>


          {/* MAIN STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">

            {/* NOTES */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300">

              <h2 className="text-2xl font-bold mb-5">

                Notes

              </h2>

              <p className="text-6xl font-extrabold mb-6">

                {stats.totalNotes}

              </p>

              <p className="text-lg opacity-90">

                Total notes created

              </p>

            </div>


            {/* PDFs */}
            <div className="bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300">

              <h2 className="text-2xl font-bold mb-5">

                PDFs Uploaded

              </h2>

              <p className="text-6xl font-extrabold mb-6">

                {stats.totalPdfs}

              </p>

              <p className="text-lg opacity-90">

                Study materials uploaded

              </p>

            </div>


            {/* PROGRESS */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300">

              <h2 className="text-2xl font-bold mb-5">

                Progress

              </h2>

              <p className="text-6xl font-extrabold mb-6">

                {stats.completionRate}%

              </p>

              <p className="text-lg opacity-90">

                Overall completion rate

              </p>

            </div>


            {/* STREAK */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300">

              <h2 className="text-2xl font-bold mb-5">

                Study Streak

              </h2>

              <p className="text-6xl font-extrabold mb-6">

                🔥 {stats.studyStreak}

              </p>

              <p className="text-lg opacity-90">

                Consecutive learning days

              </p>

            </div>

          </div>


          {/* QUIZ ANALYTICS */}
          <div className="mb-12">

            <h2 className="text-3xl font-bold mb-8">

              Quiz Analytics 📈

            </h2>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

              {/* TOTAL QUIZZES */}
              <div
                className={`

                rounded-3xl p-8 shadow-2xl

                transition-all duration-300

                hover:scale-105

                ${
                  darkMode

                    ? "bg-gray-900"

                    : "bg-white"
                }
                `}
              >

                <h3 className="text-2xl font-bold mb-4">

                  Total Quizzes

                </h3>

                <p className="text-6xl font-extrabold text-blue-600">

                  {totalQuizzes}

                </p>

              </div>


              {/* AVERAGE SCORE */}
              <div
                className={`

                rounded-3xl p-8 shadow-2xl

                transition-all duration-300

                hover:scale-105

                ${
                  darkMode

                    ? "bg-gray-900"

                    : "bg-white"
                }
                `}
              >

                <h3 className="text-2xl font-bold mb-4">

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

                transition-all duration-300

                hover:scale-105

                ${
                  darkMode

                    ? "bg-gray-900"

                    : "bg-white"
                }
                `}
              >

                <h3 className="text-2xl font-bold mb-4">

                  Best Score

                </h3>

                <p className="text-6xl font-extrabold text-pink-500">

                  {bestScore}%

                </p>

              </div>

            </div>


            {/* PERFORMANCE CHART */}
            <div
              className={`

              rounded-3xl p-8 shadow-2xl

              transition-all duration-300 mb-12

              ${
                darkMode

                  ? "bg-gray-900"

                  : "bg-white"
              }
              `}
            >

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-bold">

                  Performance Trend 📊

                </h2>

              </div>


              {
                chartData.length === 0 ? (

                <div className="text-center py-16">

                  <p className="text-xl text-gray-500 dark:text-gray-400">

                    No quiz data available yet.

                  </p>

                </div>

              ) : (

                <div className="w-full h-[350px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <LineChart
                      data={chartData}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis
                        dataKey="name"
                      />

                      <YAxis />

                      <Tooltip />

                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#2563eb"
                        strokeWidth={4}
                      />

                    </LineChart>

                  </ResponsiveContainer>

                </div>

              )}

            </div>

          </div>


          {/* ACHIEVEMENTS */}
          {
            achievements.length > 0 && (

            <div className="mb-12">

              <h2 className="text-3xl font-bold mb-8">

                Achievements 🏅

              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

                {
                  achievements.map(
                    (achievement, index) => (

                    <div
                      key={index}

                      className={`

                      bg-gradient-to-r

                      ${achievement.color}

                      text-white

                      rounded-3xl p-8

                      shadow-2xl

                      hover:scale-105

                      transition-all duration-300
                      `}
                    >

                      <div className="text-5xl mb-5">

                        {achievement.icon}

                      </div>

                      <h3 className="text-2xl font-bold">

                        {achievement.title}

                      </h3>

                    </div>

                  ))
                }

              </div>

            </div>

          )}


          {/* EMPTY STATE */}
          {
            stats.totalNotes === 0 &&
            stats.totalPdfs === 0 && (

            <div
              className={`

              mt-16 rounded-3xl p-16

              text-center shadow-2xl

              transition-all duration-300

              ${
                darkMode

                  ? "bg-gray-900"

                  : "bg-white"
              }
              `}
            >

              <h2 className="text-4xl font-bold mb-5">

                Nothing Here Yet 📚

              </h2>

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

                Start uploading notes to begin learning.

              </p>

            </div>

          )}

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}

export default Dashboard;