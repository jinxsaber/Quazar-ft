import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoundTwoLanding() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gray-900 text-white p-4">
      {/* --- Animated Aurora Background (Reduced Opacity) --- */}
      {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse animation-delay-1000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse animation-delay-1000"></div>
      <div className="absolute inset-0 bg-[url('https://cdn.jsdelivr.net/gh/rajneesh-yadav/assets/stars-bg.gif')] bg-cover bg-center opacity-10"></div> */}

      {/* --- Content Box (Subtler Glassmorphism) --- */}
      <div className="relative z-10 text-center max-w-3xl w-full p-10 bg-white/5 rounded-3xl shadow-lg backdrop-blur-md border border-white/10 transition-all duration-300 hover:border-white/20 hover:scale-[1.02]">
        <h2 className="text-xl md:text-2xl text-indigo-300 mb-3 tracking-widest font-semibold">
          Presented by <span className="text-yellow-400 font-bold">ECES</span>
        </h2>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 mb-6 ">
          🚀 QUAZAR Round 2
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
          Welcome to the second round of the{" "}
          <span className="font-bold text-white">QUAZAR</span>. Show your skills, beat the clock,
          and advance to the next level!
        </p>

        <button
          onClick={handleStart}
          className="group relative inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold py-3 px-10 rounded-full text-xl transition-all duration-300 shadow-md hover:shadow-yellow-500/20 transform hover:scale-110"
        >
          <span className="transition-transform duration-300 group-hover:translate-x-2">🚀</span>
          <span className="ml-3 transition-transform duration-300 group-hover:-translate-x-2">
            Get Started
          </span>
        </button>
      </div>
    </div>
  );
}
