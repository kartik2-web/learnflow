import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import PageWrapper from "../components/PageWrapper";

function QuizHistory() {

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // FETCH HISTORY
  const fetchHistory = async () => {

    try {

      const { data } = await API.get(
        "/quiz/history"
      );

      setHistory(data);

    } catch (error) {

      toast.error(
        "Failed to load history"
      );

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    fetchHistory();

  }, []);


  return (

    <DashboardLayout>

      <PageWrapper>

        <div className="max-w-7xl mx-auto px-4 md:px-0 pb-20">

          {/* HEADER */}
          <div className="mb-10">

            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">

              Quiz History

            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-lg">

              Track your previous quiz performance.

            </p>

          </div>


          {/* LOADING */}
          {
            loading && (

            <div className="text-center py-20">

              <h2 className="text-2xl font-bold text-blue-600">

                Loading History...

              </h2>

            </div>

          )}


          {/* EMPTY */}
          {
            !loading &&
            history.length === 0 && (

            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-16 text-center">

              <h2 className="text-3xl font-bold text-gray-700 dark:text-white mb-4">

                No Quiz History Yet

              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-lg">

                Complete quizzes to track performance.

              </p>

            </div>

          )}


          {/* HISTORY GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {
              history.map((quiz) => (

              <div
                key={quiz._id}

                className="

                bg-white dark:bg-gray-900

                rounded-3xl p-8

                shadow-xl hover:shadow-2xl

                transition-all duration-300

                hover:-translate-y-2
                "
              >

                {/* TITLE */}
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">

                  {
                    quiz.pdf?.title ||

                    "Untitled PDF"
                  }

                </h2>


                {/* SCORE */}
                <div className="mb-5">

                  <p className="text-gray-500 dark:text-gray-400 mb-2">

                    Score

                  </p>

                  <h3 className="text-5xl font-extrabold text-blue-600">

                    {quiz.score}/{quiz.totalQuestions}

                  </h3>

                </div>


                {/* DATE */}
                <div className="mb-6">

                  <p className="text-gray-500 dark:text-gray-400 mb-2">

                    Attempted On

                  </p>

                  <p className="font-semibold text-gray-700 dark:text-gray-300">

                    {
                      new Date(
                        quiz.createdAt
                      ).toLocaleDateString()
                    }

                  </p>

                </div>


                {/* PERFORMANCE */}
                <div
                  className={`

                  px-5 py-3 rounded-2xl

                  font-bold text-center text-white

                  ${
                    quiz.score >=
                    quiz.totalQuestions / 2

                      ? "bg-green-500"

                      : "bg-red-500"
                  }
                  `}
                >

                  {
                    quiz.score >=
                    quiz.totalQuestions / 2

                      ? "Great Performance 🎉"

                      : "Needs Improvement 📚"
                  }

                </div>

              </div>

            ))}

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}

export default QuizHistory;