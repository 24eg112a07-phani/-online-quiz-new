

import { useState } from "react";

import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";

import {

  Brain,

  Code2,

  Globe,

  FlaskConical,

  Database,

  Trophy,

  CheckCircle2,

  XCircle,

  ArrowRight,

  RotateCcw,

  X,

  Zap,

  Target,

  BookOpen,

  Sparkles,

} from "lucide-react";

import "./App.css";



const API_URL = "https://quizpulse-backend-git-main-sriphanibrahmabatla-1744.vercel.app/api/questions";



const categories = [

  {

    name: "Programming",

    description: "Test your coding knowledge",

    icon: Code2,

    color: "purple",

  },

  {

    name: "General Knowledge",

    description: "Explore the world around you",

    icon: Globe,

    color: "pink",

  },

  {

    name: "Science",

    description: "Discover scientific facts",

    icon: FlaskConical,

    color: "blue",

  },

  {

    name: "Data Structures",

    description: "Challenge your logic",

    icon: Database,

    color: "orange",

  },

];



const features = [

  {

    icon: Zap,

    title: "Quick Challenges",

    description: "Practice with engaging multiple-choice quizzes.",

  },

  {

    icon: Target,

    title: "Track Your Score",

    description: "See how well you perform after every quiz.",

  },

  {

    icon: BookOpen,

    title: "Learn Every Day",

    description: "Build your knowledge one question at a time.",

  },

];



function App() {

  const [started, setStarted] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [score, setScore] = useState(0);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [finished, setFinished] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");



  const startQuiz = async (category = "") => {

    setStarted(true);

    setLoading(true);

    setError("");

    setQuestions([]);

    setCurrentQuestion(0);

    setSelectedAnswer("");

    setScore(0);

    setFinished(false);

    setSelectedCategory(category);



    try {

      const response = await axios.get(API_URL, {

        params: category ? { category } : {},

      });



      const fetchedQuestions = response.data?.questions;



      if (!Array.isArray(fetchedQuestions) || fetchedQuestions.length === 0) {

        setError(

          category

            ? `No questions are available for ${category} yet. Please try another category.`

            : "No questions are available right now."

        );

        return;

      }



      // Validate question data before starting the quiz.

      const validQuestions = fetchedQuestions.filter(

        (question) =>

          question &&

          typeof question.question === "string" &&

          Array.isArray(question.options) &&

          question.options.length > 0 &&

          typeof question.answer === "string"

      );



      if (validQuestions.length === 0) {

        setError("The server returned questions in an unexpected format.");

        return;

      }



      setQuestions(validQuestions);

    } catch (err) {

      console.error("Quiz loading error:", err);



      setError(

        "Unable to load questions. Please check your internet connection and try again."

      );

    } finally {

      setLoading(false);

    }

  };



  const closeQuiz = () => {

    setStarted(false);

    setQuestions([]);

    setCurrentQuestion(0);

    setSelectedAnswer("");

    setScore(0);

    setError("");

    setFinished(false);

    setLoading(false);

    setSelectedCategory("");

  };



  const handleNextQuestion = () => {

    if (selectedAnswer === "" || !questions[currentQuestion]) {

      return;

    }



    const current = questions[currentQuestion];

    const updatedScore =

      score + (selectedAnswer === current.answer ? 1 : 0);



    setScore(updatedScore);

    setSelectedAnswer("");



    if (currentQuestion < questions.length - 1) {

      setCurrentQuestion((previous) => previous + 1);

    } else {

      setFinished(true);

    }

  };



  const current = questions[currentQuestion];



  return (

    <div className="app">

      {/* Navigation */}

      <header className="navbar">

        <a href="#home" className="logo">

          <span className="logo-icon">

            <Brain size={25} />

          </span>

          <span>

            Quiz<span className="logo-highlight">Pulse</span>

          </span>

        </a>



        <nav className="nav-links">

          <a href="#home">Home</a>

          <a href="#categories">Categories</a>

          <a href="#features">Features</a>

          <a href="#about">About</a>

        </nav>



        <button className="nav-button" onClick={() => startQuiz()}>

          Start Quiz <ArrowRight size={17} />

        </button>

      </header>



      <main>

        {/* Hero section */}

        <section className="hero section" id="home">

          <motion.div

            className="hero-content"

            initial={{ opacity: 0, x: -35 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.7 }}

          >

            <div className="eyebrow">

              <Sparkles size={16} />

              LEARN SOMETHING NEW TODAY

            </div>



            <h1>

              Learn. Challenge.

              <span className="gradient-text"> Conquer.</span>

            </h1>



            <p className="hero-description">

              Turn your curiosity into knowledge. Challenge yourself with

              interactive quizzes, explore new topics, and celebrate every

              achievement.

            </p>



            <div className="hero-actions">

              <button

                className="primary-button"

                onClick={() => startQuiz()}

              >

                Start Your Quiz <ArrowRight size={18} />

              </button>



              <a href="#categories" className="secondary-button">

                Explore Categories

              </a>

            </div>



            <div className="hero-stats">

              <div>

                <strong>{categories.length}</strong>

                <span>Categories</span>

              </div>



              <div className="stat-divider" />



              <div>

                <strong>{questions.length || 5}+</strong>

                <span>Quiz questions</span>

              </div>



              <div className="stat-divider" />



              <div>

                <strong>100%</strong>

                <span>Fun learning</span>

              </div>

            </div>

          </motion.div>



          {/* Preview card */}

          <motion.div

            className="hero-visual"

            initial={{ opacity: 0, scale: 0.85, y: 20 }}

            animate={{ opacity: 1, scale: 1, y: 0 }}

            transition={{ duration: 0.8, delay: 0.2 }}

          >

            <div className="floating-card float-one">

              <Trophy size={20} />

              <span>Keep learning!</span>

            </div>



            <div className="hero-quiz-card">

              <div className="preview-top">

                <span className="preview-label">

                  <span className="live-dot" /> QUIZ PREVIEW

                </span>

                <Brain size={23} />

              </div>



              <div className="preview-progress">

                <span />

              </div>



              <p className="preview-question">

                Ready to challenge yourself?

              </p>



              <h3>How much do you know?</h3>



              <div className="preview-option">

                <span>A</span> Explore new topics

              </div>



              <div className="preview-option">

                <span>B</span> Test your knowledge

              </div>



              <div className="preview-option">

                <span>C</span> Learn something new

              </div>



              <button

                className="preview-button"

                onClick={() => startQuiz()}

              >

                Let's Play <ArrowRight size={17} />

              </button>

            </div>



            <div className="floating-card float-two">

              <Sparkles size={19} />

              <span>Knowledge is power</span>

            </div>

          </motion.div>

        </section>



        {/* Categories */}

        <section className="categories-section section" id="categories">

          <div className="section-heading">

            <span className="section-tag">EXPLORE AND PLAY</span>



            <h2>

              Choose Your <span className="gradient-text">Challenge</span>

            </h2>



            <p>Pick your favorite subject and see how much you know.</p>

          </div>



          <div className="category-grid">

            {categories.map((category, index) => {

              const Icon = category.icon;



              return (

                <motion.div

                  className={`category-card ${category.color}`}

                  key={category.name}

                  initial={{ opacity: 0, y: 25 }}

                  whileInView={{ opacity: 1, y: 0 }}

                  viewport={{ once: true }}

                  transition={{ duration: 0.45, delay: index * 0.1 }}

                  whileHover={{ y: -8 }}

                >

                  <div className="category-icon">

                    <Icon size={29} />

                  </div>



                  <h3>{category.name}</h3>

                  <p>{category.description}</p>



                  <button

                    className="category-button"

                    onClick={() => startQuiz(category.name)}

                  >

                    Start Challenge <ArrowRight size={17} />

                  </button>

                </motion.div>

              );

            })}

          </div>

        </section>



        {/* Features */}

        <section className="features-section section" id="features">

          <div className="section-heading">

            <span className="section-tag">WHY QUIZPULSE?</span>



            <h2>

              Make Learning <span className="gradient-text">Exciting</span>

            </h2>



            <p>

              A simple and engaging way to test yourself and improve every day.

            </p>

          </div>



          <div className="features-grid">

            {features.map((feature, index) => {

              const Icon = feature.icon;



              return (

                <motion.div

                  className="feature-card"

                  key={feature.title}

                  initial={{ opacity: 0, y: 20 }}

                  whileInView={{ opacity: 1, y: 0 }}

                  viewport={{ once: true }}

                  transition={{ delay: index * 0.12 }}

                >

                  <div className="feature-icon">

                    <Icon size={25} />

                  </div>



                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>

                </motion.div>

              );

            })}

          </div>

        </section>



        {/* About */}

        <section className="about-section section" id="about">

          <div className="about-content">

            <span className="section-tag">ABOUT QUIZPULSE</span>



            <h2>

              Your Knowledge.

              <br />

              Your <span className="gradient-text">Journey.</span>

            </h2>



            <p>

              QuizPulse is an interactive quiz platform designed to make

              learning enjoyable. Choose a topic, answer questions, check your

              score, and keep challenging yourself.

            </p>



            <button

              className="primary-button"

              onClick={() => startQuiz()}

            >

              Start Learning <ArrowRight size={18} />

            </button>

          </div>



          <div className="about-visual">

            <div className="about-circle">

              <Brain size={75} />

              <span>Think. Learn. Grow.</span>

            </div>

          </div>

        </section>

      </main>



      {/* Footer */}

      <footer className="footer">

        <a href="#home" className="logo">

          <span className="logo-icon">

            <Brain size={23} />

          </span>



          <span>

            Quiz<span className="logo-highlight">Pulse</span>

          </span>

        </a>



        <p>Learn something new. One question at a time.</p>



        <span className="footer-copy">

          © {new Date().getFullYear()} QuizPulse

        </span>

      </footer>



      {/* Quiz window */}

      <AnimatePresence>

        {started && (

          <motion.div

            className="quiz-overlay"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

          >

            <motion.div

              className="quiz-box"

              initial={{ opacity: 0, scale: 0.9, y: 25 }}

              animate={{ opacity: 1, scale: 1, y: 0 }}

              exit={{ opacity: 0, scale: 0.9, y: 20 }}

              transition={{ duration: 0.25 }}

            >

              <button

                type="button"

                className="close-quiz"

                onClick={closeQuiz}

                aria-label="Close quiz"

              >

                <X size={22} />

              </button>



              {loading ? (

                <div className="quiz-message">

                  <div className="loading-spinner" />

                  <h2>Preparing Your Quiz...</h2>

                  <p>Getting your questions ready. Just a moment!</p>

                </div>

              ) : error ? (

                <div className="quiz-message">

                  <XCircle size={48} className="error-icon" />

                  <h2>Unable to Start Quiz</h2>

                  <p>{error}</p>



                  <button

                    type="button"

                    className="primary-button"

                    onClick={() => startQuiz(selectedCategory)}

                  >

                    Try Again <RotateCcw size={17} />

                  </button>



                  <button

                    type="button"

                    className="secondary-button"

                    onClick={closeQuiz}

                  >

                    Back to Home

                  </button>

                </div>

              ) : finished ? (

                <div className="quiz-result">

                  <div className="result-trophy">

                    <Trophy size={48} />

                  </div>



                  <span className="section-tag">QUIZ COMPLETED</span>



                  <h2>

                    {score === questions.length

                      ? "Perfect Score!"

                      : score >= questions.length / 2

                      ? "Great Job!"

                      : "Keep Practicing!"}

                  </h2>



                  <p className="result-description">

                    {selectedCategory

                      ? `${selectedCategory} challenge completed!`

                      : "You have completed your quiz!"}

                  </p>



                  <div className="score-circle">

                    <strong>

                      {score}/{questions.length}

                    </strong>

                    <span>Correct answers</span>

                  </div>



                  <div className="result-details">

                    <div>

                      <CheckCircle2 size={20} />

                      <span>Correct: {score}</span>

                    </div>



                    <div>

                      <XCircle size={20} />

                      <span>

                        Incorrect: {questions.length - score}

                      </span>

                    </div>

                  </div>



                  <div className="result-actions">

                    <button

                      type="button"

                      className="primary-button"

                      onClick={() => startQuiz(selectedCategory)}

                    >

                      Play Again <RotateCcw size={17} />

                    </button>



                    <button

                      type="button"

                      className="secondary-button"

                      onClick={closeQuiz}

                    >

                      Back to Home

                    </button>

                  </div>

                </div>

              ) : current ? (

                <div className="quiz-content">

                  <div className="quiz-header">

                    <div>

                      <span className="section-tag">

                        {selectedCategory || "GENERAL QUIZ"}

                      </span>

                      <h2>Your Challenge</h2>

                    </div>



                    <span className="question-counter">

                      {currentQuestion + 1} / {questions.length}

                    </span>

                  </div>



                  <div className="progress">

                    <div

                      className="progress-fill"

                      style={{

                        width: `${

                          ((currentQuestion + 1) / questions.length) * 100

                        }%`,

                      }}

                    />

                  </div>



                  <p className="question-label">

                    QUESTION {currentQuestion + 1}

                  </p>



                  <h3 className="question-text">{current.question}</h3>



                  <div className="quiz-options">

                    {current.options.map((option, index) => (

                      <button

                        type="button"

                        className={`option ${

                          selectedAnswer === option ? "selected-option" : ""

                        }`}

                        key={`${current.id ?? currentQuestion}-${option}`}

                        onClick={() => setSelectedAnswer(option)}

                      >

                        <span className="option-letter">

                          {["A", "B", "C", "D", "E"][index] ?? index + 1}

                        </span>

                        <span>{option}</span>

                      </button>

                    ))}

                  </div>



                  <div className="quiz-footer">

                    <span className="quiz-hint">

                      Select one answer to continue

                    </span>



                    <button

                      type="button"

                      className="primary-button"

                      onClick={handleNextQuestion}

                      disabled={selectedAnswer === ""}

                    >

                      {currentQuestion === questions.length - 1

                        ? "See Results"

                        : "Next Question"}

                      <ArrowRight size={17} />

                    </button>

                  </div>

                </div>

              ) : (

                <div className="quiz-message">

                  <h2>No question found</h2>

                  <button

                    type="button"

                    className="primary-button"

                    onClick={closeQuiz}

                  >

                    Back to Home

                  </button>

                </div>

              )}

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  );

}



export default App;