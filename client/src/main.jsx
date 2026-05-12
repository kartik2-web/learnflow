import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { Toaster } from "react-hot-toast";

import {
  ThemeProvider,
} from "./context/ThemeContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <ThemeProvider>

      <Toaster

        position="top-right"

        toastOptions={{

          duration: 3000,

          style: {

            background:
              "rgba(17, 24, 39, 0.95)",

            color: "#fff",

            borderRadius: "18px",

            padding: "16px 20px",

            fontSize: "16px",

            fontWeight: "600",

            backdropFilter: "blur(10px)",

            boxShadow:
              "0 10px 25px rgba(0,0,0,0.25)",
          },

          success: {

            style: {

              background:
                "linear-gradient(to right, #2563eb, #4f46e5)",
            },
          },

          error: {

            style: {

              background:
                "linear-gradient(to right, #dc2626, #ef4444)",
            },
          },
        }}
      />

      <App />

    </ThemeProvider>

  </React.StrictMode>
);