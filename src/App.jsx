import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RoundTwoLanding from "./pages/RoundTwoLanding";
import SignupForm from "./pages/signup";
import LoginForm from "./pages/login";
import QuizApp from "./components/QuizApp";
import QuestionPage from "./pages/question";
import Congratulations from "./pages/Congratulations";
import Leaderboard from "./pages/Leaderboard";
// import QuizEnd from "./components/End";

// const hasDeadlinePassed = () => {
//   const deadline = new Date('2025-10-16T07:00:00+05:30');
//   const currentTime = new Date();
//   return currentTime >= deadline;
// };

function App() {
  // const [quizEnded, setQuizEnded] = useState(false);
  const token = localStorage.getItem("authToken");

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (hasDeadlinePassed()) {
  //       setQuizEnded(true);
  //       clearInterval(intervalId);
  //     }
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoundTwoLanding />} />
        <Route path="/SignupForm" element={<SignupForm />} />
        
        <Route
          path="/login"
          element={token ? <Navigate to="/q" replace /> : <LoginForm />}
        />

        <Route path="/QuizApp" element={<QuizApp />} />
        <Route path="/q" element={<QuestionPage />} />
        {/* <Route
          path="/q"
          element={quizEnded ? <QuizEnd /> : <QuestionPage />}
        /> */}
        
        <Route path="/congratulations" element={<Congratulations />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
