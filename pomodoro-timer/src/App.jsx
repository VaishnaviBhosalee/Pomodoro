import { useState, useEffect } from "react";
import "./App.css"; // You can define your styles here

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("pomodoro");

  const totalSeconds = mode === "pomodoro" ? 25 * 60 : mode === "shortBreak" ? 5 * 60 : 15 * 60;
  const currentSeconds = minutes * 60 + seconds;
  const progress = 1 - currentSeconds / totalSeconds;

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
            audio.play();

            if (mode === "pomodoro") {
              setMode("shortBreak");
              setMinutes(5);
            } else {
              setMode("pomodoro");
              setMinutes(25);
            }
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode]);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(mode === "pomodoro" ? 25 : mode === "shortBreak" ? 5 : 15);
    setSeconds(0);
  };

  const switchMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    setMinutes(newMode === "pomodoro" ? 25 : newMode === "shortBreak" ? 5 : 15);
    setSeconds(0);
  };

  const formatTime = (min, sec) => {
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  // Quotes
  const quotes = [
    "The only way to do great work is to love what you do. — Steve Jobs",
    "Believe you can and you're halfway there. — Theodore Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. — Confucius",
    "Your time is limited, don't waste it living someone else's life. — Steve Jobs",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. — Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
    "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
    "The secret of getting ahead is getting started. — Mark Twain",
    "You are never too old to set another goal or to dream a new dream. — C.S. Lewis",
    "The only limit to our realization of tomorrow will be our doubts of today. — Franklin D. Roosevelt"
  ];
  const [currentQuote, setCurrentQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);

  const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  return (
    <div className="app">
      <div className="main-container">
        {/* Left Column: Quotes and Spotify */}
        <div className="left-column">
          <div className="quote-box">
            <p className="quote-text">{currentQuote}</p>
            <button className="quote-button" onClick={getNewQuote}>
              New Quote
            </button>
          </div>
          <div className="spotify-container">
            <h2 className="spotify-title">Focus Music</h2>
            <iframe
              src="https://open.spotify.com/embed/playlist/4Zjli1P13J5mmSCD5iKAXK?utm_source=generator"
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right Column: Pomodoro Timer */}
        <div className="right-column">
          <h1 className="app-title">Pomodoro Timer</h1>
          <div className="mode-buttons">
            <button className={`mode-button ${mode === "pomodoro" ? "active" : ""}`} onClick={() => switchMode("pomodoro")}>Pomodoro</button>
            <button className={`mode-button ${mode === "shortBreak" ? "active" : ""}`} onClick={() => switchMode("shortBreak")}>Short Break</button>
            <button className={`mode-button ${mode === "longBreak" ? "active" : ""}`} onClick={() => switchMode("longBreak")}>Long Break</button>
          </div>

          <div className="timer-display">
            <svg className="timer-circle" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" className="timer-background" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                className={`timer-progress ${mode}`}
                strokeDasharray="282.74"
                strokeDashoffset={282.74 * (1 - progress)}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="timer-text">
              <span>{formatTime(minutes, seconds)}</span>
            </div>
          </div>

          <div className="control-buttons">
            {!isActive ? (
              <button className="control-button start" onClick={startTimer}>Start</button>
            ) : (
              <button className="control-button pause" onClick={pauseTimer}>Pause</button>
            )}
            <button className="control-button reset" onClick={resetTimer}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
