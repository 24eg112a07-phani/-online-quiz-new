
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const questions = require("./data/questions");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Online Quiz Backend is running!"
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy"
  });
});

// Get all questions or filter by category
app.get("/api/questions", (req, res) => {
  const category = req.query.category;

  const filteredQuestions = category
    ? questions.filter(
        (question) =>
          question.category.toLowerCase() === category.toLowerCase()
      )
    : questions;

  res.json({
    success: true,
    count: filteredQuestions.length,
    questions: filteredQuestions
  });
});

// Get questions by category using the URL path
app.get("/api/questions/:category", (req, res) => {
  const category = req.params.category.toLowerCase();

  const filteredQuestions = questions.filter(
    (question) =>
      question.category.toLowerCase() === category
  );

  res.json({
    success: true,
    count: filteredQuestions.length,
    questions: filteredQuestions
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});