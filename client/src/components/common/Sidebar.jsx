import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useState } from "react";

import { useTheme } from "../../context/ThemeContext";

function Sidebar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const {
    darkMode,
    toggleTheme,
  } = useTheme();

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // NAV STYLE
  const navStyle = ({ isActive }) =>
    `
    px-5 py-4 rounded-2xl
    transition-all duration-300
    font-semibold tracking-wide
    flex items-center gap-3
    ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-2xl scale-[1.03]"
        : "text-gray-300 hover:bg-white/10 hover:text-white hover:translate-x-1"
    }
    `;

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div
        className="
        md:hidden
        bg-black/80 backdrop-blur-xl
        border-b border-gray-800
        text-white px-5 py-4
        flex justify-between items-center
        fixed top-0 left-0 w-full z-50
        "
      >
        {/* LOGO */}
        <div>
          <h1 className="text-2xl font-extrabold text-blue-400">
            LearnFlow
          </h1>

          <p className="text-xs text-gray-400">
            AI Study Platform
          </p>
        </div>

        {/* MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="
          text-2xl
          bg-white/10
          p-3 rounded-xl
          hover:bg-white/20
          transition-all duration-300
          "
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
          md:hidden
          fixed inset-0
          bg-black/50 backdrop-blur-sm
          z-30
          "
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`
        fixed top-0 left-0
        h-screen w-[280px]
        overflow-y-auto
        bg-gradient-to-b
        from-black via-gray-900 to-black
        text-white
        px-6 py-8
        border-r border-gray-800
        z-40
        transform transition-transform duration-300
        shadow-2xl
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }
        md:translate-x-0
        `}
      >
        {/* LOGO */}
        <div className="mb-14 mt-10 md:mt-0">
          <div
            className="
            bg-gradient-to-r
            from-blue-500 to-indigo-600
            w-14 h-14 rounded-2xl
            flex items-center justify-center
            text-3xl mb-5 shadow-xl
            "
          >
            📘
          </div>

          <h1
            className="
            text-4xl font-extrabold
            bg-gradient-to-r
            from-blue-400 to-indigo-500
            bg-clip-text text-transparent
            "
          >
            LearnFlow
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            AI Study Platform
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-col gap-4 pb-10">
          <NavLink
            to="/dashboard"
            className={navStyle}
            onClick={() => setOpen(false)}
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/notes"
            className={navStyle}
            onClick={() => setOpen(false)}
          >
            📝 My Notes
          </NavLink>

          <NavLink
            to="/upload"
            className={navStyle}
            onClick={() => setOpen(false)}
          >
            📄 Upload PDF
          </NavLink>

          <NavLink
            to="/quiz"
            className={navStyle}
            onClick={() => setOpen(false)}
          >
            🤖 AI Quiz
          </NavLink>

          <NavLink
            to="/quiz-history"
            className={navStyle}
            onClick={() => setOpen(false)}
          >
            📊 Quiz History
          </NavLink>

          <NavLink
            to="/profile"
            className={navStyle}
            onClick={() => setOpen(false)}
          >
            👤 Profile
          </NavLink>

          <NavLink
            to="/flashcards"
            className={navStyle}
            onClick={() => setOpen(false)}
          >
            🧠 Flashcards
          </NavLink>

          <NavLink
            to="/pomodoro"
            className={navStyle}
            onClick={() => setOpen(false)}
          >
            ⏱️ Pomodoro
          </NavLink>
        </div>

        {/* FOOTER AREA */}
        <div className="mt-10 space-y-4 pb-10">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="
            w-full
            bg-white/10 hover:bg-white/20
            transition-all duration-300
            py-4 rounded-2xl
            font-bold tracking-wide
            backdrop-blur-xl
            border border-white/10
            "
          >
            {darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}
          </button>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="
            w-full
            bg-gradient-to-r
            from-red-500 to-red-600
            hover:from-red-600 hover:to-red-700
            transition-all duration-300
            py-4 rounded-2xl
            font-bold tracking-wide
            shadow-xl
            hover:scale-105
            "
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;