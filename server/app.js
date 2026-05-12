const express = require("express");

const cors = require("cors");

const path = require("path");

const authRoutes = require("./routes/authRoutes");

const notesRoutes = require("./routes/notesRoutes");

const pdfRoutes = require("./routes/pdfRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const quizRoutes = require("./routes/quizRoutes");

const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// STATIC UPLOADS
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// TEST ROUTE
app.get("/", (req, res) => {

  res.send("LearnFlow API Running");
});


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/notes", notesRoutes);

app.use("/api/pdfs", pdfRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/quiz", quizRoutes);


module.exports = app;