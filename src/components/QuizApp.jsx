// QuizApp.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { questions } from "./questions";

export default function QuizApp() {
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("quizEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    if (email.trim()) {
      localStorage.setItem("quizEmail", email);
      setIsLoggedIn(true);
    }
  };

  const handleSubmit = async () => {
    if (!questions[current]) return;

    const isCorrect =
      userAnswer.trim().toLowerCase() ===
      questions[current].answer.trim().toLowerCase();

    try {
      await axios.post(`${import.meta.env.VITE_PUBLIC_API}api/v1/ques/Ques`, {
        questions: userAnswer,  // required by your schema
        email,                  // optional (if you extend schema later)
        questionIndex: current, // optional
        isCorrect,              // optional
      });
    } catch (err) {
      console.error("Error saving answer:", err);
    }

    if (isCorrect) {
      setFeedback("✅ Correct!");
      const nextQues = current + 1;

      setTimeout(() => {
        setCurrent(nextQues);
        setUserAnswer("");
        setFeedback("");
      }, 1200);
    } else {
      setFeedback("❌ Wrong answer, try again!");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!isLoggedIn) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Login to Continue Quiz</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          className="border p-2 mr-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded"
          onClick={handleLogin}
        >
          Start / Resume Quiz
        </button>
      </div>
    );
  }

  if (current >= questions.length) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold">🎉 Quiz Completed!</h2>
        <p>Great job, {email}! You solved all questions.</p>
      </div>
    );
  }

  const ques = questions[current];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-3">
        Question {current + 1} of {questions.length}
      </h2>
      <p className="mb-3">{ques.question}</p>

      {ques.type === "image" && (
        <img src={ques.image} alt="question" className="mb-3 max-h-60" />
      )}

      {ques.options ? (
        <div className="mb-3">
          {ques.options.map((opt, i) => (
            <button
              key={i}
              className={`block w-full border p-2 mb-2 rounded ${
                userAnswer === opt ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onClick={() => setUserAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <input
          type="text"
          placeholder="Type your answer"
          value={userAnswer}
          className="border p-2 w-full mb-3"
          onChange={(e) => setUserAnswer(e.target.value)}
        />
      )}

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>

      {feedback && <p className="mt-3">{feedback}</p>}
    </div>
  );
}


