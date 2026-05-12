import { useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      email: "",

      password: "",
    });


  // CLEAR AUTOFILL
  useEffect(() => {

    setFormData({

      email: "",

      password: "",
    });

  }, []);


  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };


  // LOGIN
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const { data } = await API.post(

        "/auth/login",

        formData
      );

      localStorage.setItem(
        "token",
        data.token
      );

      toast.success(
        "Welcome back"
      );

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        "Invalid email or password"
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <div
      className="

      min-h-screen

      bg-gradient-to-br

      from-blue-100 via-white to-indigo-100

      dark:from-gray-950 dark:via-gray-900 dark:to-black

      flex items-center justify-center

      px-4
      "
    >

      <div
        className="

        w-full max-w-md

        bg-white/80 dark:bg-gray-900/90

        backdrop-blur-xl

        rounded-3xl shadow-2xl

        p-8 md:p-10

        border border-white/30 dark:border-gray-800
        "
      >

        {/* LOGO */}
        <div className="text-center mb-8">

          <div
            className="

            w-20 h-20 mx-auto mb-5

            rounded-3xl

            bg-gradient-to-r

            from-blue-500 to-indigo-600

            flex items-center justify-center

            text-4xl shadow-xl
            "
          >

            📘

          </div>

          <h1
            className="

            text-4xl md:text-5xl

            font-extrabold

            bg-gradient-to-r

            from-blue-600 to-indigo-600

            bg-clip-text text-transparent
            "
          >

            LearnFlow

          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-3">

            AI Powered Study Platform

          </p>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
        >

          <div className="flex flex-col gap-6">

            {/* EMAIL */}
            <input
              type="email"

              name="email"

              value={formData.email}

              onChange={handleChange}

              placeholder="Enter Email"

              autoComplete="new-email"

              className="

              border border-gray-300 dark:border-gray-700

              bg-white dark:bg-gray-800

              text-gray-900 dark:text-white

              placeholder-gray-500 dark:placeholder-gray-400

              rounded-2xl p-5 text-lg

              focus:outline-none

              focus:ring-2 focus:ring-blue-500

              transition-all duration-300
              "
            />


            {/* PASSWORD */}
            <input
              type="password"

              name="password"

              value={formData.password}

              onChange={handleChange}

              placeholder="Enter Password"

              autoComplete="new-password"

              className="

              border border-gray-300 dark:border-gray-700

              bg-white dark:bg-gray-800

              text-gray-900 dark:text-white

              placeholder-gray-500 dark:placeholder-gray-400

              rounded-2xl p-5 text-lg

              focus:outline-none

              focus:ring-2 focus:ring-blue-500

              transition-all duration-300
              "
            />


            {/* BUTTON */}
            <button
              disabled={loading}

              className={`

              py-5 rounded-2xl

              text-lg font-bold text-white

              transition-all duration-300

              ${
                loading

                  ? "bg-gray-400 cursor-not-allowed"

                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 shadow-xl"
              }
              `}
            >

              {
                loading

                  ? "Logging In..."

                  : "Login"
              }

            </button>

          </div>

        </form>


        {/* FOOTER */}
        <div className="text-center mt-8">

          <p className="text-gray-500 dark:text-gray-400">

            Don’t have an account?

            {" "}

            <Link
              to="/register"

              className="
              text-blue-600 font-semibold
              hover:text-blue-700
              "
            >

              Register

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;