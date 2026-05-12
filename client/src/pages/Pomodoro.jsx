import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import PageWrapper from "../components/PageWrapper";

import { useTheme } from "../context/ThemeContext";

function Pomodoro() {

  const { darkMode } = useTheme();

  const [minutes, setMinutes] =
    useState(25);

  const [seconds, setSeconds] =
    useState(0);

  const [isRunning, setIsRunning] =
    useState(false);

  const [mode, setMode] =
    useState("Focus");


  // TIMER
  useEffect(() => {

    let timer;

    if (isRunning) {

      timer = setInterval(() => {

        if (seconds > 0) {

          setSeconds(seconds - 1);

        } else {

          if (minutes === 0) {

            clearInterval(timer);

            setIsRunning(false);

            alert(
              `${mode} session completed!`
            );

          } else {

            setMinutes(minutes - 1);

            setSeconds(59);
          }
        }

      }, 1000);
    }

    return () => clearInterval(timer);

  }, [isRunning, minutes, seconds, mode]);


  // START
  const startTimer = () => {

    setIsRunning(true);
  };


  // PAUSE
  const pauseTimer = () => {

    setIsRunning(false);
  };


  // RESET
  const resetTimer = () => {

    setIsRunning(false);

    if (mode === "Focus") {

      setMinutes(25);

    } else {

      setMinutes(5);
    }

    setSeconds(0);
  };


  // SWITCH MODE
  const switchMode = (newMode) => {

    setMode(newMode);

    setIsRunning(false);

    if (newMode === "Focus") {

      setMinutes(25);

    } else {

      setMinutes(5);
    }

    setSeconds(0);
  };


  return (

    <DashboardLayout>

      <PageWrapper>

        <div className="max-w-5xl mx-auto px-4 md:px-0 pb-20">

          {/* HEADER */}
          <div className="mb-12">

            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">

              Pomodoro Timer ⏱️

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

              Stay focused and boost productivity.

            </p>

          </div>


          {/* TIMER CARD */}
          <div
            className={`

            rounded-3xl p-12

            shadow-2xl text-center

            transition-all duration-300

            ${
              darkMode

                ? "bg-gray-900"

                : "bg-white"
            }
            `}
          >

            {/* MODE SWITCH */}
            <div className="flex justify-center gap-5 mb-10">

              <button
                onClick={() =>
                  switchMode("Focus")
                }

                className={`

                px-6 py-3 rounded-2xl

                font-bold transition-all duration-300

                ${
                  mode === "Focus"

                    ? "bg-blue-600 text-white"

                    : "bg-gray-200 dark:bg-gray-800"
                }
                `}
              >

                Focus

              </button>


              <button
                onClick={() =>
                  switchMode("Break")
                }

                className={`

                px-6 py-3 rounded-2xl

                font-bold transition-all duration-300

                ${
                  mode === "Break"

                    ? "bg-green-600 text-white"

                    : "bg-gray-200 dark:bg-gray-800"
                }
                `}
              >

                Break

              </button>

            </div>


            {/* TIMER */}
            <div
              className="

              text-7xl md:text-8xl

              font-extrabold mb-12
              "
            >

              {String(minutes).padStart(2, "0")}:

              {String(seconds).padStart(2, "0")}

            </div>


            {/* BUTTONS */}
            <div className="flex flex-wrap justify-center gap-5">

              <button
                onClick={startTimer}

                className="

                bg-blue-600 hover:bg-blue-700

                text-white px-8 py-4

                rounded-2xl font-bold

                hover:scale-105

                transition-all duration-300
                "
              >

                ▶ Start

              </button>


              <button
                onClick={pauseTimer}

                className="

                bg-yellow-500 hover:bg-yellow-600

                text-white px-8 py-4

                rounded-2xl font-bold

                hover:scale-105

                transition-all duration-300
                "
              >

                ⏸ Pause

              </button>


              <button
                onClick={resetTimer}

                className="

                bg-red-500 hover:bg-red-600

                text-white px-8 py-4

                rounded-2xl font-bold

                hover:scale-105

                transition-all duration-300
                "
              >

                🔄 Reset

              </button>

            </div>

          </div>


          {/* MOTIVATION */}
          <div
            className="

            mt-12 rounded-3xl p-10

            bg-gradient-to-r

            from-blue-600 to-indigo-600

            text-white shadow-2xl
            "
          >

            <h2 className="text-3xl font-bold mb-4">

              Productivity Tip 🚀

            </h2>

            <p className="text-lg opacity-90 leading-relaxed">

              Study in focused intervals.
              Complete one Pomodoro session,
              then take a short break to maintain
              concentration and reduce burnout.

            </p>

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}

export default Pomodoro;