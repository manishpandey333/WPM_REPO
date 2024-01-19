import React, { useEffect, useState } from "react";
import Result from "./Result/result";

function App() {
  const [sentence, setSentence] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  const timer = () => {};

  useEffect(() => {
    let timerId;

    if (timerRunning && timerSeconds > 0) {
      timerId = setInterval(() => {
        setTimerSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [timerRunning, timerSeconds]);

  const startTimer = () => {
    setTimerRunning(true);
    setTimerSeconds(60); // Reset the timer to 60 seconds
  };

  const randomSentence = () => {
    let wordStorage = new Array(
      "Hello",
      "Hi",
      "How",
      "Are",
      "You",
      "Here",
      "I",
      "Was",
      "What",
      "When",
      "Why",
      "So",
      "Buddy",
      "Ok",
      "Good",
      "Hello",
      "Hi",
      "How",
      "Are",
      "You",
      "Here",
      "I",
      "Was",
      "What",
      "When",
      "Why",
      "So",
      "Buddy",
      "Ok",
      "Good",
      "Working",
      "Normal",
      "Indian",
      "Sniper",
      "Snoop",
      "Through",
      "School",
      "Test"
    );

    let randomIndices = [];
    for (let i = 0; i < wordStorage.length; i++) {
      let randomIndex = Math.floor(Math.random() * wordStorage.length);
      randomIndices.push(randomIndex);
    }

    let randomWords = randomIndices.map((index) => wordStorage[index]);
    let newSentence = randomWords.join(" ");
    // return sentence;
    setSentence(newSentence);
  };

  const advanceTestWord = async () => {
    try {
      const url = "https://random-word-api.herokuapp.com/word?number=20";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to Fetch Words");
      }

      const word = await response.json();
      const newSentence = word.join(" ");
      setSentence(newSentence);
    } catch (error) {
      console.error("Error fetching words:", error.message);
    }
  };

  return (
    <div className="p-20 bg-slate-400">
      <h1 className="text-xl font-bold mb-2">⌨️ Typing Test WPM</h1>

      <div>
        <h1 className="text-lg font-semibold text-red-500 mb-2">
          {timerSeconds > 0 ? `0:${timerSeconds}` : "Time's up!"}
        </h1>
      </div>

      <div className="border-4 p-2 rounded-lg">
        {/* I want to return the text here in this paragram text  */}
        <p className="text-lg flex-wrap"> {sentence}</p>
      </div>

      <div className="text-end pt-2">
        <button
          onClick={() => {
            randomSentence();
            startTimer();
          }}
          className="p-2 m-1 bg-pink-400 rounded-lg font-semibold"
        >
          Esay Test
        </button>

        <button
          onClick={() => {
            advanceTestWord();
            startTimer();
          }}
          className="p-2 m-1 bg-blue-400 rounded-lg font-semibold"
        >
          Advance Test
        </button>
      </div>

      <Result />

      <div className="text-center p-2">
        <h3 className="font-semibold">
          Developed by 🤴<span className="text-red-400">Mr.Prince</span>
        </h3>
      </div>
    </div>
  );
}

export default App;
