import React from "react";
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
function App() {
  const token = localStorage.getItem("authToken");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoundTwoLanding />} />
        <Route path="/SignupForm" element={<SignupForm />} />
        {/* <Route path="/LoginForm" element={<LoginForm/>} /> */}

        <Route
          path="/login"
          element={token ? <Navigate to="/q" replace /> : <LoginForm />}
        />

        <Route path="/QuizApp" element={<QuizApp />} />
        <Route path="/q" element={<QuestionPage />} />
        <Route path="/congratulations" element={<Congratulations />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
