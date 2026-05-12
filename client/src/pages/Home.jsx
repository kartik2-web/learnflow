import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { useTheme } from "../context/ThemeContext";

function Home() {

  const { darkMode } = useTheme();

  return (

    <div
      className={`

      min-h-screen

      transition-all duration-300

      flex flex-col items-center justify-center

      px-6 text-center overflow-hidden

      ${
        darkMode

          ? "bg-gray-950 text-white"

          : "bg-gradient-to-br from-blue-100 via-white to-indigo-100 text-gray-900"
      }
      `}
    >

      {/* BACKGROUND BLUR */}
      <div
        className="

        absolute top-0 left-0

        w-72 h-72 bg-blue-500/20

        rounded-full blur-3xl
        "
      ></div>

      <div
        className="

        absolute bottom-0 right-0

        w-96 h-96 bg-indigo-500/20

        rounded-full blur-3xl
        "
      ></div>


      {/* HERO */}
      <motion.div

        initial={{
          opacity: 0,
          y: 30,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.6,
        }}

        className="relative z-10 max-w-5xl"
      >

        {/* LOGO */}
        <div
          className="

          w-28 h-28 mx-auto mb-8

          rounded-[32px]

          bg-gradient-to-r

          from-blue-500 to-indigo-600

          flex items-center justify-center

          text-6xl shadow-2xl
          "
        >

          📘

        </div>


        {/* TITLE */}
        <h1
          className="

          text-5xl md:text-7xl

          font-extrabold mb-8

          leading-tight
          "
        >

          Learn Smarter with

          <span
            className="

            bg-gradient-to-r

            from-blue-500 to-indigo-600

            bg-clip-text text-transparent
            "
          >

            {" "}
            AI

          </span>

        </h1>


        {/* SUBTITLE */}
        <p
          className={`

          text-lg md:text-2xl

          mb-12 leading-relaxed

          ${
            darkMode

              ? "text-gray-400"

              : "text-gray-600"
          }
          `}
        >

          Upload notes, generate AI quizzes,
          and boost your learning productivity
          with LearnFlow AI.

        </p>


        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">

          <Link
            to="/login"

            className="

            bg-gradient-to-r

            from-blue-600 to-indigo-600

            hover:scale-105

            transition-all duration-300

            text-white px-10 py-5

            rounded-2xl text-lg font-bold

            shadow-2xl
            "
          >

            Get Started

          </Link>


          <Link
            to="/register"

            className={`

            px-10 py-5 rounded-2xl

            text-lg font-bold

            transition-all duration-300

            hover:scale-105

            shadow-xl

            ${
              darkMode

                ? "bg-white/10 hover:bg-white/20 text-white"

                : "bg-white hover:bg-gray-100 text-gray-900"
            }
            `}
          >

            Create Account

          </Link>

        </div>


        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">

          {/* FEATURE 1 */}
          <div
            className={`

            rounded-3xl p-8

            shadow-2xl backdrop-blur-xl

            transition-all duration-300

            hover:-translate-y-2

            ${
              darkMode

                ? "bg-white/5 border border-white/10"

                : "bg-white/80"
            }
            `}
          >

            <div className="text-5xl mb-6">

              🤖

            </div>

            <h2 className="text-2xl font-bold mb-4">

              AI Quiz Generation

            </h2>

            <p
              className={
                darkMode

                  ? "text-gray-400"

                  : "text-gray-600"
              }
            >

              Generate smart quizzes from uploaded study material instantly.

            </p>

          </div>


          {/* FEATURE 2 */}
          <div
            className={`

            rounded-3xl p-8

            shadow-2xl backdrop-blur-xl

            transition-all duration-300

            hover:-translate-y-2

            ${
              darkMode

                ? "bg-white/5 border border-white/10"

                : "bg-white/80"
            }
            `}
          >

            <div className="text-5xl mb-6">

              📄

            </div>

            <h2 className="text-2xl font-bold mb-4">

              PDF Uploads

            </h2>

            <p
              className={
                darkMode

                  ? "text-gray-400"

                  : "text-gray-600"
              }
            >

              Upload and manage study notes securely in one place.

            </p>

          </div>


          {/* FEATURE 3 */}
          <div
            className={`

            rounded-3xl p-8

            shadow-2xl backdrop-blur-xl

            transition-all duration-300

            hover:-translate-y-2

            ${
              darkMode

                ? "bg-white/5 border border-white/10"

                : "bg-white/80"
            }
            `}
          >

            <div className="text-5xl mb-6">

              📈

            </div>

            <h2 className="text-2xl font-bold mb-4">

              Learning Analytics

            </h2>

            <p
              className={
                darkMode

                  ? "text-gray-400"

                  : "text-gray-600"
              }
            >

              Track learning progress and improve study consistency.

            </p>

          </div>

        </div>

      </motion.div>

    </div>
  );
}

export default Home;