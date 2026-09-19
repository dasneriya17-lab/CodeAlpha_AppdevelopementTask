import { useEffect, useState } from "react";
import "./App.css";

const languageData = {
  Spanish: {
    flag: "🇪🇸",
    code: "es-ES",
    words: [
      { word: "Hola", translation: "Hello", pronunciation: "OH-la" },
      { word: "Gracias", translation: "Thank you", pronunciation: "GRA-see-as" },
      { word: "Agua", translation: "Water", pronunciation: "AH-gwa" },
      { word: "Casa", translation: "House", pronunciation: "KAH-sa" },
      { word: "Amigo", translation: "Friend", pronunciation: "ah-MEE-go" },
      { word: "Comida", translation: "Food", pronunciation: "koh-MEE-dah" },
    ],
    phrases: [
      {
        phrase: "¿Cómo estás?",
        translation: "How are you?",
        pronunciation: "KOH-moh es-TAHS",
      },
      {
        phrase: "Buenos días",
        translation: "Good morning",
        pronunciation: "BWEH-nos DEE-as",
      },
      {
        phrase: "Buenas noches",
        translation: "Good night",
        pronunciation: "BWEH-nas NOH-ches",
      },
      {
        phrase: "Hasta luego",
        translation: "See you later",
        pronunciation: "AS-ta LWEH-go",
      },
    ],
  },

  French: {
    flag: "🇫🇷",
    code: "fr-FR",
    words: [
      { word: "Bonjour", translation: "Hello", pronunciation: "bon-ZHOOR" },
      { word: "Merci", translation: "Thank you", pronunciation: "mehr-SEE" },
      { word: "Eau", translation: "Water", pronunciation: "OH" },
      { word: "Maison", translation: "House", pronunciation: "may-ZON" },
      { word: "Ami", translation: "Friend", pronunciation: "ah-MEE" },
      { word: "Livre", translation: "Book", pronunciation: "LEEVR" },
    ],
    phrases: [
      {
        phrase: "Comment allez-vous?",
        translation: "How are you?",
        pronunciation: "koh-MAHN tah-lay VOO",
      },
      {
        phrase: "Bonne journée",
        translation: "Have a good day",
        pronunciation: "bun zhoor-NAY",
      },
      {
        phrase: "À bientôt",
        translation: "See you soon",
        pronunciation: "ah byan-TOH",
      },
      {
        phrase: "Bonne nuit",
        translation: "Good night",
        pronunciation: "bun NWEE",
      },
    ],
  },

  German: {
    flag: "🇩🇪",
    code: "de-DE",
    words: [
      { word: "Hallo", translation: "Hello", pronunciation: "HAH-loh" },
      { word: "Danke", translation: "Thank you", pronunciation: "DAHN-keh" },
      { word: "Wasser", translation: "Water", pronunciation: "VAH-ser" },
      { word: "Haus", translation: "House", pronunciation: "HOWS" },
      { word: "Freund", translation: "Friend", pronunciation: "FROYNT" },
      { word: "Buch", translation: "Book", pronunciation: "BOOKH" },
    ],
    phrases: [
      {
        phrase: "Wie geht es dir?",
        translation: "How are you?",
        pronunciation: "vee GATE ess DEER",
      },
      {
        phrase: "Guten Morgen",
        translation: "Good morning",
        pronunciation: "GOO-ten MOR-gen",
      },
      {
        phrase: "Gute Nacht",
        translation: "Good night",
        pronunciation: "GOO-teh NAKHT",
      },
      {
        phrase: "Bis später",
        translation: "See you later",
        pronunciation: "BISS SHPAY-ter",
      },
    ],
  },

  Hindi: {
    flag: "🇮🇳",
    code: "hi-IN",
    words: [
      { word: "नमस्ते", translation: "Hello", pronunciation: "Na-mas-te" },
      { word: "धन्यवाद", translation: "Thank you", pronunciation: "Dhan-ya-vaad" },
      { word: "पानी", translation: "Water", pronunciation: "Paa-nee" },
      { word: "घर", translation: "House", pronunciation: "Ghar" },
      { word: "दोस्त", translation: "Friend", pronunciation: "Dost" },
      { word: "किताब", translation: "Book", pronunciation: "Ki-taab" },
    ],
    phrases: [
      {
        phrase: "आप कैसे हैं?",
        translation: "How are you?",
        pronunciation: "Aap kaise hain?",
      },
      {
        phrase: "सुप्रभात",
        translation: "Good morning",
        pronunciation: "Su-prab-haat",
      },
      {
        phrase: "शुभ रात्रि",
        translation: "Good night",
        pronunciation: "Shubh raa-tri",
      },
      {
        phrase: "फिर मिलेंगे",
        translation: "See you again",
        pronunciation: "Phir mi-len-ge",
      },
    ],
  },

  Japanese: {
    flag: "🇯🇵",
    code: "ja-JP",
    words: [
      { word: "こんにちは", translation: "Hello", pronunciation: "Kon-ni-chi-wa" },
      { word: "ありがとう", translation: "Thank you", pronunciation: "A-ri-ga-tou" },
      { word: "水", translation: "Water", pronunciation: "Mi-zu" },
      { word: "家", translation: "House", pronunciation: "Ie" },
      { word: "友達", translation: "Friend", pronunciation: "To-mo-da-chi" },
      { word: "本", translation: "Book", pronunciation: "Hon" },
    ],
    phrases: [
      {
        phrase: "お元気ですか？",
        translation: "How are you?",
        pronunciation: "O-gen-ki desu ka?",
      },
      {
        phrase: "おはようございます",
        translation: "Good morning",
        pronunciation: "O-ha-yō go-za-i-mas",
      },
      {
        phrase: "こんばんは",
        translation: "Good evening",
        pronunciation: "Kon-ban-wa",
      },
      {
        phrase: "またね",
        translation: "See you",
        pronunciation: "Ma-ta-ne",
      },
    ],
  },
};

function LanguageLearning({ onBack }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("learningLanguage") || "Spanish";
  });

  const [category, setCategory] = useState("words");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const [learnedWords, setLearnedWords] = useState(() => {
    const saved = localStorage.getItem("learnedWords");
    return saved ? JSON.parse(saved) : {};
  });

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [quizOptions, setQuizOptions] = useState([]);

  const data = languageData[language];

  const items =
    category === "words"
      ? data.words
      : data.phrases;

  useEffect(() => {
    localStorage.setItem("learningLanguage", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(
      "learnedWords",
      JSON.stringify(learnedWords)
    );
  }, [learnedWords]);

  useEffect(() => {
    setCurrentIndex(0);
    setShowTranslation(false);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizFinished(false);
    setSelectedAnswer("");
  }, [language]);

  const currentItem = items[currentIndex];

  const quizQuestions = data.words.slice(0, 5);
  const currentQuestion = quizQuestions[quizIndex];

  useEffect(() => {
    if (!currentQuestion) {
      setQuizOptions([]);
      return;
    }

    const wrongAnswers = data.words
      .filter(
        (word) =>
          word.translation !== currentQuestion.translation
      )
      .map((word) => word.translation);

    const options = [
      currentQuestion.translation,
      ...wrongAnswers.slice(0, 3),
    ];

    setQuizOptions(
      [...options].sort(() => Math.random() - 0.5)
    );
  }, [language, quizIndex]);

  const speakWord = () => {
    if (!("speechSynthesis" in window)) {
      alert("Speech is not supported in this browser.");
      return;
    }

    const text =
      currentItem.word || currentItem.phrase;

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = data.code;
    speech.rate = 0.8;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const nextItem = () => {
    setShowTranslation(false);

    setCurrentIndex(
      (currentIndex + 1) % items.length
    );
  };

  const previousItem = () => {
    setShowTranslation(false);

    setCurrentIndex(
      currentIndex === 0
        ? items.length - 1
        : currentIndex - 1
    );
  };

  const markAsLearned = () => {
    const key = `${language}-${
      currentItem.word || currentItem.phrase
    }`;

    setLearnedWords((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const currentKey = `${language}-${
    currentItem.word || currentItem.phrase
  }`;

  const isLearned = learnedWords[currentKey];

  const learnedCount = Object.keys(
    learnedWords
  ).filter((key) =>
    key.startsWith(`${language}-`)
  ).length;

  const progress = Math.min(
    Math.round(
      (learnedCount / data.words.length) * 100
    ),
    100
  );

  const answerQuiz = (answer) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (
      answer === currentQuestion.translation
    ) {
      setQuizScore((score) => score + 1);
    }

    setTimeout(() => {
      if (
        quizIndex <
        quizQuestions.length - 1
      ) {
        setQuizIndex((index) => index + 1);
        setSelectedAnswer("");
      } else {
        setQuizFinished(true);
      }
    }, 900);
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setQuizFinished(false);
    setSelectedAnswer("");
  };

  return (
    <div className="app">

      <header className="header">

        <h1>🌎 Language Learning</h1>

        <p>
          Learn vocabulary, phrases and practice
          your language skills
        </p>

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back Home
        </button>

      </header>

      <main className="container">

        {/* LANGUAGE SELECTOR */}

        <div className="language-selector">

          <h2>🌐 Choose a Language</h2>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
          >
            {Object.keys(languageData).map(
              (item) => (
                <option
                  value={item}
                  key={item}
                >
                  {languageData[item].flag} {item}
                </option>
              )
            )}
          </select>

        </div>

        {/* TABS */}

        <div className="language-tabs">

          <button
            className={
              category === "words"
                ? "active-tab"
                : ""
            }
            onClick={() => {
              setCategory("words");
              setCurrentIndex(0);
              setShowTranslation(false);
            }}
          >
            📚 Vocabulary
          </button>

          <button
            className={
              category === "phrases"
                ? "active-tab"
                : ""
            }
            onClick={() => {
              setCategory("phrases");
              setCurrentIndex(0);
              setShowTranslation(false);
            }}
          >
            💬 Phrases
          </button>

          <button
            className={
              category === "quiz"
                ? "active-tab"
                : ""
            }
            onClick={() => {
              setCategory("quiz");
              restartQuiz();
            }}
          >
            📝 Quiz
          </button>

        </div>

        {/* VOCABULARY / PHRASES */}

        {category !== "quiz" && (
          <>
            <div className="language-card">

              <p className="language-card-count">
                {category === "words"
                  ? "Vocabulary"
                  : "Common Phrase"}{" "}
                {currentIndex + 1} of{" "}
                {items.length}
              </p>

              <div className="language-word">
                {currentItem.word ||
                  currentItem.phrase}
              </div>

              <button
                className="speak-button"
                onClick={speakWord}
              >
                🔊 Listen
              </button>

              <p className="pronunciation">
                / {currentItem.pronunciation} /
              </p>

              {showTranslation && (
                <div className="translation">

                  <span>Translation</span>

                  <strong>
                    {currentItem.translation}
                  </strong>

                </div>
              )}

              <button
                className="show-translation"
                onClick={() =>
                  setShowTranslation(
                    !showTranslation
                  )
                }
              >
                {showTranslation
                  ? "🙈 Hide Translation"
                  : "👀 Show Translation"}
              </button>

              <button
                className={
                  isLearned
                    ? "learned-button"
                    : "mark-button"
                }
                onClick={markAsLearned}
              >
                {isLearned
                  ? "✅ Learned"
                  : "☑️ Mark as Learned"}
              </button>

              <div className="language-navigation">

                <button onClick={previousItem}>
                  ← Previous
                </button>

                <button onClick={nextItem}>
                  Next →
                </button>

              </div>

            </div>

            {/* PROGRESS */}

            <div className="language-progress-card">

              <h2>📊 Your Progress</h2>

              <p>
                {learnedCount} of{" "}
                {data.words.length} vocabulary
                words learned
              </p>

              <div className="progress-bar">

                <div
                  className="progress-fill language-progress"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

              <strong>
                {progress}% Complete
              </strong>

            </div>
          </>
        )}

        {/* QUIZ */}

        {category === "quiz" && (
          <div className="language-quiz">

            {!quizFinished ? (
              <>
                <p className="quiz-number">
                  Question {quizIndex + 1} of{" "}
                  {quizQuestions.length}
                </p>

                <h2>
                  What is the meaning of:
                </h2>

                <div className="quiz-word">
                  {currentQuestion?.word}
                </div>

                <div className="quiz-options">

                  {quizOptions.map(
                    (option) => {

                      let className =
                        "quiz-option";

                      if (selectedAnswer) {

                        if (
                          option ===
                          currentQuestion.translation
                        ) {
                          className +=
                            " correct-answer";
                        } else if (
                          option ===
                          selectedAnswer
                        ) {
                          className +=
                            " wrong-answer";
                        }

                      }

                      return (
                        <button
                          key={option}
                          className={className}
                          onClick={() =>
                            answerQuiz(option)
                          }
                        >
                          {option}
                        </button>
                      );
                    }
                  )}

                </div>

                <p className="current-score">
                  Score: {quizScore}
                </p>

              </>
            ) : (

              <div className="quiz-result">

                <div className="result-icon">
                  🎉
                </div>

                <h2>
                  Quiz Completed!
                </h2>

                <p>
                  You scored
                </p>

                <div className="final-score">
                  {quizScore} /{" "}
                  {quizQuestions.length}
                </div>

                <button
                  onClick={restartQuiz}
                >
                  🔄 Try Again
                </button>

              </div>

            )}

          </div>
        )}

      </main>

    </div>
  );
}

export default LanguageLearning;
