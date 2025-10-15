import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, CheckCircle, ArrowRight, Award } from 'lucide-react';

const QuizEnd = () => {
  const navigate = useNavigate();

  const handleLeaderboardRedirect = () => {
    navigate('/leaderboard');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.08),transparent_50%)]"></div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-1 h-1 bg-sky-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl w-full mx-4 p-12 bg-white/80 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-200">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full mb-6 border-4 border-blue-200">
          <CheckCircle className="w-10 h-10 text-blue-600" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-4">
          <Award className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700 tracking-wide">Challenge Complete</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700">
            Well Done!
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto">
          You've completed your QUAZAR Round 2 challenge. Your performance has been recorded and your results are now live on the leaderboard.
        </p>

        <button
          onClick={handleLeaderboardRedirect}
          className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
        >
          <Trophy className="w-5 h-5" />
          <span>View Leaderboard</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <div className="mt-10 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Thank you for participating in QUAZAR Round 2
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizEnd;
