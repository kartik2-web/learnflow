import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Notes from "./pages/Notes";

import Upload from "./pages/Upload";

import Quiz from "./pages/Quiz";

import QuizHistory from "./pages/QuizHistory";

import Profile from "./pages/Profile";

import Flashcards from "./pages/Flashcards";

import Pomodoro from "./pages/Pomodoro";

import Summaries from "./pages/Summaries";

import ProtectedRoute from "./routes/ProtectedRoute";

import { useTheme } from "./context/ThemeContext";

function AppContent() {

  const { darkMode } = useTheme();

  return (

    <div
      className={`

      min-h-screen

      transition-all duration-300

      ${
        darkMode

          ? "bg-gray-950 text-white"

          : "bg-gray-100 text-gray-900"
      }
      `}
    >

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* DASHBOARD */}
        <Route
          path="/dashboard"

          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />


        {/* NOTES */}
        <Route
          path="/notes"

          element={
            <ProtectedRoute>

              <Notes />

            </ProtectedRoute>
          }
        />


        {/* PDF UPLOAD */}
        <Route
          path="/upload"

          element={
            <ProtectedRoute>

              <Upload />

            </ProtectedRoute>
          }
        />


        {/* QUIZ */}
        <Route
          path="/quiz"

          element={
            <ProtectedRoute>

              <Quiz />

            </ProtectedRoute>
          }
        />


        {/* QUIZ HISTORY */}
        <Route
          path="/quiz-history"

          element={
            <ProtectedRoute>

              <QuizHistory />

            </ProtectedRoute>
          }
        />


        {/* PROFILE */}
        <Route
          path="/profile"

          element={
            <ProtectedRoute>

              <Profile />

            </ProtectedRoute>
          }
        />


        {/* FLASHCARDS */}
        <Route
          path="/flashcards"

          element={
            <ProtectedRoute>

              <Flashcards />

            </ProtectedRoute>
          }
        />


        {/* POMODORO */}
        <Route
          path="/pomodoro"

          element={
            <ProtectedRoute>

              <Pomodoro />

            </ProtectedRoute>
          }
        />


        {/* AI SUMMARIES */}
        <Route
          path="/summaries"

          element={
            <ProtectedRoute>

              <Summaries />

            </ProtectedRoute>
          }
        />

      </Routes>

    </div>
  );
}


function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>
  );
}

export default App;