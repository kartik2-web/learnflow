const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();



// CORS CONFIGURATION


const allowedOrigins = [
  "http://localhost:5173",
  "https://learnflow-wheat.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (mobile apps, postman, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);



// MIDDLEWARE


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


// STATIC UPLOADS


app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);



// TEST ROUTE


app.get("/", (req, res) => {
  res.send("LearnFlow API Running");
});



// API ROUTES


app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/pdfs", pdfRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/quiz", quizRoutes);



// 404 HANDLER

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});


// GLOBAL ERROR HANDLER


app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


module.exports = app;