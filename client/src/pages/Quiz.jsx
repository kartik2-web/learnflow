import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import Loader from "../components/Loader";

import PageWrapper from "../components/PageWrapper";

function Quiz() {

  const [pdfs, setPdfs] = useState([]);

  const [selectedPdf, setSelectedPdf] =
    useState("");

  const [quiz, setQuiz] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [score, setScore] = useState(0);

  const [submitted, setSubmitted] =
    useState(false);

  const [quizId, setQuizId] =
    useState("");

  const [
    bookmarkedQuestions,

    setBookmarkedQuestions,
  ] = useState([]);


  // FETCH PDFs
  const fetchPdfs = async () => {

    try {

      const { data } = await API.get(
        "/pdfs"
      );

      setPdfs(data);

    } catch (error) {

      toast.error(
        "Failed to fetch PDFs"
      );
    }
  };


  useEffect(() => {

    fetchPdfs();

    const savedBookmarks =
      JSON.parse(
        localStorage.getItem(
          "bookmarkedQuestions"
        )
      ) || [];

    setBookmarkedQuestions(
      savedBookmarks
    );

  }, []);


  // GENERATE QUIZ
  const generateQuiz = async () => {

    if (!selectedPdf) {

      return toast.error(
        "Select PDF"
      );
    }

    try {

      setLoading(true);

      setQuiz([]);

      setSubmitted(false);

      setScore(0);

      const { data } = await API.post(

        "/quiz/generate",

        {
          pdfId: selectedPdf,
        }
      );

      setQuiz(data.questions);

      setQuizId(data.quizId);

      toast.success(
        "Quiz Generated"
      );

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Quiz generation failed"
      );

    } finally {

      setLoading(false);
    }
  };


  // SELECT ANSWER
  const checkAnswer = (
    selected,
    correct,
    index
  ) => {

    if (submitted) return;

    const updatedQuiz = [...quiz];

    updatedQuiz[index].selected =
      selected;

    setQuiz(updatedQuiz);
  };


  // BOOKMARK QUESTION
  const toggleBookmark = (
    question
  ) => {

    let updatedBookmarks = [];

    const alreadyBookmarked =
      bookmarkedQuestions.some(

        (q) =>
          q.question ===
          question.question
      );

    if (alreadyBookmarked) {

      updatedBookmarks =
        bookmarkedQuestions.filter(

          (q) =>
            q.question !==
            question.question
        );

      toast.success(
        "Bookmark removed"
      );

    } else {

      updatedBookmarks = [

        ...bookmarkedQuestions,

        question,
      ];

      toast.success(
        "Question bookmarked"
      );
    }

    setBookmarkedQuestions(
      updatedBookmarks
    );

    localStorage.setItem(

      "bookmarkedQuestions",

      JSON.stringify(
        updatedBookmarks
      )
    );
  };


  // SUBMIT QUIZ
  const submitQuiz = async () => {

    let finalScore = 0;

    quiz.forEach((q) => {

      if (q.selected === q.answer) {

        finalScore++;
      }
    });

    setScore(finalScore);

    setSubmitted(true);

    try {

      await API.put(
        "/quiz/score",
        {
          quizId,
          score: finalScore,
        }
      );

    } catch (error) {

      console.log(error);
    }

    toast.success(
      `Your Score: ${finalScore}/${quiz.length}`
    );
  };


  return (

    <DashboardLayout>

      <PageWrapper>

        {
          loading && (

          <Loader text="Generating AI Quiz..." />

        )}

        <div className="max-w-6xl mx-auto px-4 md:px-0 pb-20">

          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-10">

            AI Quiz Generator

          </h1>


          {/* SELECT PDF */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl mb-10">

            <div className="flex flex-col md:flex-row gap-5">

              <select
                value={selectedPdf}
                onChange={(e) =>
                  setSelectedPdf(
                    e.target.value
                  )
                }
                className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-2xl p-4 w-full"
              >

                <option value="">
                  Select PDF
                </option>

                {pdfs.map((pdf) => (

                  <option
                    key={pdf._id}
                    value={pdf._id}
                  >
                    {pdf.title}
                  </option>

                ))}

              </select>


              <button
                onClick={generateQuiz}
                disabled={loading}

                className={`

                px-8 py-4 rounded-2xl font-semibold text-white

                transition-all duration-300

                flex items-center justify-center gap-3

                ${
                  loading

                    ? "bg-gray-400 cursor-not-allowed"

                    : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                }
                `}
              >

                Generate Quiz

              </button>

            </div>

          </div>


          {/* EMPTY STATE */}
          {
            quiz.length === 0 &&
            !loading && (

            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-16 text-center">

              <h2 className="text-3xl font-bold text-gray-700 dark:text-white mb-4">

                No Quiz Generated Yet

              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-lg">

                Upload notes and generate an AI-powered quiz.

              </p>

            </div>

          )}


          {/* QUIZ */}
          <div className="space-y-10">

            {quiz.map((q, index) => (

              <div
                key={index}

                className="

                bg-white dark:bg-gray-900

                p-5 md:p-8 rounded-3xl

                shadow-lg hover:shadow-2xl

                transition-all duration-300

                border border-gray-100 dark:border-gray-800
                "
              >

                {/* QUESTION HEADER */}
                <div className="flex justify-between items-start gap-5 mb-8">

                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">

                    Q{index + 1}. {q.question}

                  </h2>


                  <button
                    onClick={() =>
                      toggleBookmark(q)
                    }

                    className={`

                    px-4 py-2 rounded-xl

                    font-semibold transition-all duration-300

                    ${
                      bookmarkedQuestions.some(
                        (b) =>
                          b.question ===
                          q.question
                      )

                        ? "bg-yellow-500 text-white"

                        : "bg-gray-200 dark:bg-gray-800 dark:text-white"
                    }
                    `}
                  >

                    📌

                  </button>

                </div>


                {/* OPTIONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {q.options?.map(
                    (option, optionIndex) => (

                    <button
                      key={optionIndex}

                      onClick={() =>
                        checkAnswer(
                          option,
                          q.answer,
                          index
                        )
                      }

                      className={`

                      p-5 rounded-2xl border-2 text-left font-semibold

                      transition-all duration-300 transform

                      ${
                        q.selected === option &&
                        !submitted

                          ? "bg-blue-600 text-white border-blue-700 scale-105 shadow-lg"

                          : submitted &&
                            option === q.answer

                          ? "bg-green-500 text-white border-green-600"

                          : submitted &&
                            option === q.selected &&
                            option !== q.answer

                          ? "bg-red-500 text-white border-red-600"

                          : "bg-gray-50 dark:bg-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 hover:border-blue-400 hover:scale-105"
                      }
                      `}
                    >

                      {option}

                    </button>

                  ))}

                </div>

              </div>

            ))}

          </div>


          {/* SUBMIT */}
          {
            quiz.length > 0 &&
            !submitted && (

            <button
              onClick={submitQuiz}

              className="

              mt-10 bg-green-600

              hover:bg-green-700 hover:scale-105

              transition-all duration-300

              text-white px-6 md:px-10 py-4 md:py-5

              rounded-2xl text-lg font-bold
              "
            >

              Submit Quiz

            </button>

          )}


          {/* SCORE */}
          {
            submitted && (

            <div className="

            mt-10 bg-gradient-to-r

            from-blue-600 to-indigo-600

            text-white p-10 rounded-3xl shadow-2xl

            text-center
            ">

              <h2 className="text-3xl md:text-5xl font-bold mb-4">

                Quiz Completed 🎉

              </h2>

              <p className="text-3xl font-semibold">

                Score: {score}/{quiz.length}

              </p>

            </div>

          )}

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}

export default Quiz;