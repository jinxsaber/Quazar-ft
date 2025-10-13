import React from "react";

export default function Congratulations() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <h1 className="text-5xl font-bold mb-6">🎉 Congratulations! 🎉</h1>
      <p className="text-lg text-center mb-8">
        You’ve Solved all questions successfully!
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="px-8 py-3 bg-white text-indigo-800 font-semibold rounded-full shadow-md hover:bg-gray-200 transition"
      >
        Go to Home
      </button>
    </div>
  );
}


 
