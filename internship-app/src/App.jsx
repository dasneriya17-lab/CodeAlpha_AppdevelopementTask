import { useState, useEffect } from "react";
import "./App.css";
import LanguageLearning from "./LanguageLearning";

const initialCards = [
  {
    id: 1,
    question: "What is JavaScript?",
    answer:
      "JavaScript is a programming language used to make web pages interactive.",
  },
  {
    id: 2,
    question: "What is React?",
    answer:
      "React is a JavaScript library for building user interfaces.",
  },
  {
    id: 3,
    question: "What is CSS?",
    answer: "CSS is used to style web pages.",
  },
];

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
  },
];

function App() {
  const [page, setPage] = useState("home");

  // =========================
  // FLASHCARDS
  // =========================

  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem("flashcards");
    return savedCards ? JSON.parse(savedCards) : initialCards;
  });

  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(cards));
  }, [cards]);

  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editingId, setEditingId] = useState(null);

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentCard((currentCard + 1) % cards.length);
  };

  const previousCard = () => {
    setShowAnswer(false);
    setCurrentCard(
      currentCard === 0 ? cards.length - 1 : currentCard - 1
    );
  };

  const saveCard = (e) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      alert("Please enter both a question and an answer.");
      return;
    }

    if (editingId !== null) {
      const updatedCards = cards.map((card) =>
        card.id === editingId
          ? { ...card, question, answer }
          : card
      );

      setCards(updatedCards);

      const editedIndex = updatedCards.findIndex(
        (card) => card.id === editingId
      );

      setCurrentCard(editedIndex);
      setEditingId(null);
    } else {
      const newCard = {
        id: Date.now(),
        question,
        answer,
      };

      setCards([...cards, newCard]);
      setCurrentCard(cards.length);
    }

    setQuestion("");
    setAnswer("");
    setShowAnswer(false);
  };

  const editCard = () => {
    const card = cards[currentCard];

    setQuestion(card.question);
    setAnswer(card.answer);
    setEditingId(card.id);
  };

  const deleteCard = () => {
    if (cards.length === 1) {
      alert("You need at least one flashcard.");
      return;
    }

    const newCards = cards.filter(
      (card) => card.id !== cards[currentCard].id
    );

    setCards(newCards);

    if (currentCard >= newCards.length) {
      setCurrentCard(newCards.length - 1);
    }

    setShowAnswer(false);
  };

  // =========================
  // QUOTES
  // =========================

  const [quoteIndex, setQuoteIndex] = useState(0);

  const newQuote = () => {
    setQuoteIndex((quoteIndex + 1) % quotes.length);
  };

  const copyQuote = async () => {
    const quote = quotes[quoteIndex];

    try {
      await navigator.clipboard.writeText(
        `"${quote.text}" — ${quote.author}`
      );

      alert("Quote copied!");
    } catch {
      alert("Could not copy the quote.");
    }
  };

  // =========================
  // FITNESS TRACKER
  // =========================

  const [fitness, setFitness] = useState(() => {
    const savedFitness = localStorage.getItem("fitnessData");

    return savedFitness
      ? JSON.parse(savedFitness)
      : {
          steps: 0,
          workout: 0,
          calories: 0,
        };
  });

  useEffect(() => {
    localStorage.setItem("fitnessData", JSON.stringify(fitness));
  }, [fitness]);

  const [stepsInput, setStepsInput] = useState("");
  const [workoutInput, setWorkoutInput] = useState("");
  const [caloriesInput, setCaloriesInput] = useState("");

  const updateFitness = (e) => {
    e.preventDefault();

    setFitness({
      steps: Number(stepsInput) || 0,
      workout: Number(workoutInput) || 0,
      calories: Number(caloriesInput) || 0,
    });

    setStepsInput("");
    setWorkoutInput("");
    setCaloriesInput("");

    alert("Fitness data updated!");
  };

  const resetFitness = () => {
    setFitness({
      steps: 0,
      workout: 0,
      calories: 0,
    });
  };

  // =========================
  // LANGUAGE LEARNING
  // =========================

  if (page === "language") {
    return (
      <LanguageLearning
        onBack={() => setPage("home")}
      />
    );
  }

  // =========================
  // HOME PAGE
  // =========================

  if (page === "home") {
    return (
      <div className="app">

        <header className="header">
          <h1>🚀 Internship App Suite</h1>

          <p>
            My CodeAlpha Internship Projects
          </p>
        </header>

        <main className="container">

          <h2>Welcome 👋</h2>

          <p className="subtitle">
            Choose a project to get started.
          </p>

          <div className="project-grid">

            {/* FLASHCARD */}

            <div className="project-card">
              <div className="icon">📚</div>

              <h3>Flashcard Quiz</h3>

              <p>
                Study questions and answers using
                interactive flashcards.
              </p>

              <button
                onClick={() => setPage("flashcards")}
              >
                Open Project
              </button>
            </div>

            {/* QUOTES */}

            <div className="project-card">
              <div className="icon">💬</div>

              <h3>Random Quote Generator</h3>

              <p>
                Generate a different motivational
                quote with every click.
              </p>

              <button
                onClick={() => setPage("quotes")}
              >
                Open Project
              </button>
            </div>

            {/* FITNESS */}

            <div className="project-card">
              <div className="icon">🏃</div>

              <h3>Fitness Tracker</h3>

              <p>
                Track steps, workouts, calories
                and daily progress.
              </p>

              <button
                onClick={() => setPage("fitness")}
              >
                Open Project
              </button>
            </div>

            {/* LANGUAGE LEARNING */}

            <div className="project-card">
              <div className="icon">🌎</div>

              <h3>Language Learning</h3>

              <p>
                Learn vocabulary, translations
                and practice with quizzes.
              </p>

              <button
                onClick={() => setPage("language")}
              >
                Open Project
              </button>
            </div>

          </div>

        </main>

      </div>
    );
  }

  // =========================
  // FLASHCARD PAGE
  // =========================

  if (page === "flashcards") {
    const card = cards[currentCard];

    return (
      <div className="app">

        <header className="header">

          <h1>📚 Flashcard Quiz</h1>

          <p>
            Learn with interactive flashcards
          </p>

          <button
            className="back-button"
            onClick={() => setPage("home")}
          >
            ← Back Home
          </button>

        </header>

        <main className="container">

          <div className="flashcard">

            <p className="card-number">
              Card {currentCard + 1} of {cards.length}
            </p>

            <h2>
              {showAnswer
                ? card.answer
                : card.question}
            </h2>

            <button
              onClick={() =>
                setShowAnswer(!showAnswer)
              }
            >
              {showAnswer
                ? "Hide Answer"
                : "Show Answer"}
            </button>

            <div className="navigation">

              <button onClick={previousCard}>
                ← Previous
              </button>

              <button onClick={nextCard}>
                Next →
              </button>

            </div>

            <div className="actions">

              <button
                className="edit-button"
                onClick={editCard}
              >
                ✏️ Edit
              </button>

              <button
                className="delete-button"
                onClick={deleteCard}
              >
                🗑️ Delete
              </button>

            </div>

          </div>

          <div className="form-card">

            <h2>
              {editingId !== null
                ? "✏️ Edit Flashcard"
                : "➕ Add Flashcard"}
            </h2>

            <form onSubmit={saveCard}>

              <label>Question</label>

              <input
                type="text"
                placeholder="Enter your question"
                value={question}
                onChange={(e) =>
                  setQuestion(e.target.value)
                }
              />

              <label>Answer</label>

              <textarea
                placeholder="Enter the answer"
                value={answer}
                onChange={(e) =>
                  setAnswer(e.target.value)
                }
              />

              <button type="submit">
                {editingId !== null
                  ? "Update Card"
                  : "Add Card"}
              </button>

            </form>

          </div>

        </main>

      </div>
    );
  }

  // =========================
  // QUOTE PAGE
  // =========================

  if (page === "quotes") {
    const quote = quotes[quoteIndex];

    return (
      <div className="app">

        <header className="header">

          <h1>💬 Random Quote Generator</h1>

          <p>
            Find inspiration with every click
          </p>

          <button
            className="back-button"
            onClick={() => setPage("home")}
          >
            ← Back Home
          </button>

        </header>

        <main className="container">

          <div className="quote-card">

            <div className="quote-icon">
              💬
            </div>

            <h2>
              "{quote.text}"
            </h2>

            <p className="quote-author">
              — {quote.author}
            </p>

            <div className="quote-buttons">

              <button onClick={newQuote}>
                🔄 New Quote
              </button>

              <button
                className="copy-button"
                onClick={copyQuote}
              >
                📋 Copy Quote
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  // =========================
  // FITNESS PAGE
  // =========================

  if (page === "fitness") {
    const stepsProgress =
      Math.min((fitness.steps / 10000) * 100, 100);

    const workoutProgress =
      Math.min((fitness.workout / 60) * 100, 100);

    const caloriesProgress =
      Math.min((fitness.calories / 500) * 100, 100);

    return (
      <div className="app">

        <header className="header">

          <h1>🏃 Fitness Tracker</h1>

          <p>
            Track your daily fitness progress
          </p>

          <button
            className="back-button"
            onClick={() => setPage("home")}
          >
            ← Back Home
          </button>

        </header>

        <main className="container">

          <div className="fitness-grid">

            <div className="fitness-card">

              <div className="fitness-icon">
                👟
              </div>

              <h2>Steps</h2>

              <p className="fitness-number">
                {fitness.steps.toLocaleString()}
              </p>

              <p>
                Goal: 10,000 steps
              </p>

              <div className="progress-bar">

                <div
                  className="progress-fill steps"
                  style={{
                    width: `${stepsProgress}%`,
                  }}
                />

              </div>

            </div>

            <div className="fitness-card">

              <div className="fitness-icon">
                🏋️
              </div>

              <h2>Workout</h2>

              <p className="fitness-number">
                {fitness.workout} min
              </p>

              <p>
                Goal: 60 minutes
              </p>

              <div className="progress-bar">

                <div
                  className="progress-fill workout"
                  style={{
                    width: `${workoutProgress}%`,
                  }}
                />

              </div>

            </div>

            <div className="fitness-card">

              <div className="fitness-icon">
                🔥
              </div>

              <h2>Calories</h2>

              <p className="fitness-number">
                {fitness.calories}
              </p>

              <p>
                Goal: 500 calories
              </p>

              <div className="progress-bar">

                <div
                  className="progress-fill calories"
                  style={{
                    width: `${caloriesProgress}%`,
                  }}
                />

              </div>

            </div>

          </div>

          <div className="form-card">

            <h2>📊 Update Today's Progress</h2>

            <form onSubmit={updateFitness}>

              <label>Steps</label>

              <input
                type="number"
                min="0"
                placeholder="Example: 5000"
                value={stepsInput}
                onChange={(e) =>
                  setStepsInput(e.target.value)
                }
              />

              <label>Workout Minutes</label>

              <input
                type="number"
                min="0"
                placeholder="Example: 30"
                value={workoutInput}
                onChange={(e) =>
                  setWorkoutInput(e.target.value)
                }
              />

              <label>Calories</label>

              <input
                type="number"
                min="0"
                placeholder="Example: 250"
                value={caloriesInput}
                onChange={(e) =>
                  setCaloriesInput(e.target.value)
                }
              />

              <button type="submit">
                💾 Save Progress
              </button>

            </form>

            <button
              className="delete-button reset-button"
              onClick={resetFitness}
            >
              🔄 Reset Progress
            </button>

          </div>

        </main>

      </div>
    );
  }

  return null;
}

export default App;
