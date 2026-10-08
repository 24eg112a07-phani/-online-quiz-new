import { useState } from "react";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <span>⚡</span> QuizPulse
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <button
          className="nav-button"
          onClick={() => setStarted(true)}
        >
          Start Quiz
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="badge">
            ✨ Test your knowledge
          </div>

          <h1>
            Learn.
            <span> Challenge.</span>
            <br />
            Conquer.
          </h1>

          <p>
            Challenge yourself with exciting quizzes,
            improve your knowledge, and discover how much
            you really know.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-button"
              onClick={() => setStarted(true)}
            >
              Start Quiz 🚀
            </button>

            <a href="#categories" className="secondary-button">
              Explore Categories →
            </a>
          </div>

          <div className="stats">
            <div>
              <strong>100+</strong>
              <span>Questions</span>
            </div>

            <div>
              <strong>4</strong>
              <span>Categories</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>Fun</span>
            </div>
          </div>
        </div>

        {/* Quiz Card Animation */}
        <div className="hero-visual">
          <div className="floating-shape shape-one"></div>
          <div className="floating-shape shape-two"></div>

          <div className="quiz-card">
            <div className="quiz-top">
              <span>Question 1 of 10</span>
              <span className="timer">⏱ 30s</span>
            </div>

            <div className="progress">
              <div className="progress-bar"></div>
            </div>

            <h3>What does HTML stand for?</h3>

            <div className="option">A. Hyper Text Markup Language</div>
            <div className="option">B. High Tech Modern Language</div>
            <div className="option">C. Hyperlink Text Management</div>
            <div className="option">D. Home Tool Markup Language</div>

            <button className="next-button">
              Next Question →
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories" id="categories">
        <div className="section-title">
          <span>EXPLORE</span>
          <h2>Choose Your Challenge</h2>
          <p>Pick a category and start testing your knowledge.</p>
        </div>

        <div className="category-grid">
          <div className="category-card purple">
            <div className="category-icon">💻</div>
            <h3>Programming</h3>
            <p>Test your coding knowledge.</p>
            <span>25 Questions →</span>
          </div>

          <div className="category-card blue">
            <div className="category-icon">🌎</div>
            <h3>General Knowledge</h3>
            <p>How much do you know about the world?</p>
            <span>25 Questions →</span>
          </div>

          <div className="category-card green">
            <div className="category-icon">🔬</div>
            <h3>Science</h3>
            <p>Explore the world of science.</p>
            <span>25 Questions →</span>
          </div>

          <div className="category-card orange">
            <div className="category-icon">🧠</div>
            <h3>Data Structures</h3>
            <p>Challenge your programming skills.</p>
            <span>25 Questions →</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="section-title">
          <span>WHY QUIZPULSE?</span>
          <h2>Learn While You Play</h2>
        </div>

        <div className="feature-grid">
          <div className="feature">
            <div>⚡</div>
            <h3>Fast & Interactive</h3>
            <p>Enjoy a smooth and interactive quiz experience.</p>
          </div>

          <div className="feature">
            <div>🏆</div>
            <h3>Track Your Score</h3>
            <p>See your results and improve your performance.</p>
          </div>

          <div className="feature">
            <div>🎯</div>
            <h3>Multiple Categories</h3>
            <p>Choose from different topics and challenges.</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <h2>Ready to test yourself?</h2>
        <p>
          Start the quiz and see how high you can score!
        </p>

        <button
          className="primary-button"
          onClick={() => setStarted(true)}
        >
          Start Quiz 🚀
        </button>
      </section>

      {/* Footer */}
      <footer>
        <div className="logo">
          <span>⚡</span> QuizPulse
        </div>

        <p>© 2026 QuizPulse. Learn. Challenge. Conquer.</p>
      </footer>

      {/* Start Message */}
      {started && (
        <div className="start-overlay">
          <div className="start-box">
            <div className="success-icon">🎉</div>
            <h2>Quiz is Ready!</h2>
            <p>
              Our next step will be adding the actual quiz
              questions, timer, score and results.
            </p>

            <button
              className="primary-button"
              onClick={() => setStarted(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;