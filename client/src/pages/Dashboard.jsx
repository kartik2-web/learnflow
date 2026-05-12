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

      const token =
        localStorage.getItem(
          "token"
        );

      const { data } =
        await API.get(
          "/dashboard/stats",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setStats(data);

    } catch (error) {

      toast.error(
        "Could not load dashboard"
      );
    }
  };


  // FETCH QUIZ HISTORY
  const fetchQuizHistory =
    async () => {

    try {

      const { data } =
        await API.get(
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


  // RECENT ACTIVITY
  const recentActivity =
    quizHistory
      .slice(-3)
      .reverse();


  return (

    <DashboardLayout>

      <PageWrapper>

        <div
          className={`

          min-h-screen

          transition-all duration-300

          px-2 md:px-0 pb-20

          ${
            darkMode

              ? "text-white"

              : "text-gray-900"
          }
          `}
        >

          {/* HERO SECTION */}
          <div
            className={`

            rounded-[36px]

            p-8 md:p-12

            mb-12

            shadow-2xl

            transition-all duration-300

            ${
              darkMode

                ? "bg-gradient-to-r from-blue-700 to-indigo-900"

                : "bg-gradient-to-r from-blue-500 to-indigo-600"
            }
            `}
          >

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5">

              Welcome Back 👋

            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl">

              Continue your AI-powered learning journey,
              track your progress, and level up your study habits.

            </p>

          </div>


          {/* MAIN STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-14">

            {/* NOTES */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-[32px] shadow-2xl hover:-translate-y-1 transition-all duration-300">

              <h2 className="text-2xl font-bold mb-4">

                Notes

              </h2>

              <p className="text-6xl font-extrabold mb-4">

                {stats.totalNotes}

              </p>

              <p className="opacity-90">

                Total notes created

              </p>

            </div>


            {/* PDFs */}
            <div className="bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white p-8 rounded-[32px] shadow-2xl hover:-translate-y-1 transition-all duration-300">

              <h2 className="text-2xl font-bold mb-4">

                PDFs

              </h2>

              <p className="text-6xl font-extrabold mb-4">

                {stats.totalPdfs}

              </p>

              <p className="opacity-90">

                Study materials uploaded

              </p>

            </div>


            {/* PROGRESS */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-[32px] shadow-2xl hover:-translate-y-1 transition-all duration-300">

              <h2 className="text-2xl font-bold mb-4">

                Progress

              </h2>

              <p className="text-6xl font-extrabold mb-4">

                {stats.completionRate}%

              </p>

              <p className="opacity-90">

                Learning completion rate

              </p>

            </div>


            {/* STREAK */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-[32px] shadow-2xl hover:-translate-y-1 transition-all duration-300">

              <h2 className="text-2xl font-bold mb-4">

                Streak

              </h2>

              <p className="text-6xl font-extrabold mb-4">

                🔥 {stats.studyStreak}

              </p>

              <p className="opacity-90">

                Consistent learning days

              </p>

            </div>

          </div>


          {/* ANALYTICS */}
          <div
            className={`

            rounded-[32px]

            p-8 md:p-10

            shadow-2xl

            mb-14

            ${
              darkMode

                ? "bg-gray-900"

                : "bg-white"
            }
            `}
          >

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">

              <div>

                <h2 className="text-3xl md:text-4xl font-bold mb-3">

                  Performance Analytics 📈

                </h2>

                <p
                  className={`

                  ${
                    darkMode

                      ? "text-gray-400"

                      : "text-gray-500"
                  }
                  `}
                >

                  Monitor quiz performance and learning progress.

                </p>

              </div>

            </div>


            {/* SCORE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

              <div
                className={`

                rounded-3xl p-8

                shadow-xl

                hover:-translate-y-1

                transition-all duration-300

                ${
                  darkMode

                    ? "bg-gray-800"

                    : "bg-gray-50"
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


              <div
                className={`

                rounded-3xl p-8

                shadow-xl

                hover:-translate-y-1

                transition-all duration-300

                ${
                  darkMode

                    ? "bg-gray-800"

                    : "bg-gray-50"
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


              <div
                className={`

                rounded-3xl p-8

                shadow-xl

                hover:-translate-y-1

                transition-all duration-300

                ${
                  darkMode

                    ? "bg-gray-800"

                    : "bg-gray-50"
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


            {/* CHART */}
            {
              chartData.length === 0 ? (

              <div className="text-center py-20">

                <h2 className="text-3xl font-bold mb-4">

                  No Quiz Data Yet 🧠

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

                  Generate quizzes to start tracking your performance.

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


          {/* RECENT ACTIVITY */}
          <div
            className={`

            rounded-[32px]

            p-8 md:p-10

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

              Recent Activity ⚡

            </h2>

            {
              recentActivity.length === 0 ? (

              <div className="text-center py-10">

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

                  No recent activity available.

                </p>

              </div>

            ) : (

              <div className="space-y-6">

                {
                  recentActivity.map(
                    (quiz, index) => (

                    <div
                      key={index}

                      className={`

                      flex items-center justify-between

                      p-6 rounded-3xl

                      transition-all duration-300

                      hover:-translate-y-1

                      ${
                        darkMode

                          ? "bg-gray-800"

                          : "bg-gray-50"
                      }
                      `}
                    >

                      <div>

                        <h3 className="text-xl font-bold mb-2">

                          Quiz Completed

                        </h3>

                        <p
                          className={`

                          ${
                            darkMode

                              ? "text-gray-400"

                              : "text-gray-500"
                          }
                          `}
                        >

                          Score:
                          {" "}
                          {Math.round(
                            (quiz.score /
                              quiz.totalQuestions) *
                              100
                          )}%

                        </p>

                      </div>

                      <div className="text-4xl">

                        🎯

                      </div>

                    </div>

                  ))
                }

              </div>

            )}

          </div>


          {/* MOTIVATION */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-[32px] p-10 shadow-2xl">

            <h2 className="text-4xl font-bold mb-5">

              Keep Learning 🚀

            </h2>

            <p className="text-xl leading-relaxed opacity-90 max-w-3xl">

              Small consistent study sessions create long-term success.
              Stay focused and keep improving every day.

            </p>

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}

export default Dashboard;