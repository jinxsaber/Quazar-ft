import React from "react";
import { Zap, Trophy, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function RoundTwoLanding() {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.08),transparent_50%)]"></div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-1 h-1 bg-sky-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl w-full mx-4 p-12 bg-white/80 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-200">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
          <Trophy className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700 tracking-wide">Presented by ECES</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700">
            QUAZAR
          </span>
          <span className="block text-3xl md:text-4xl mt-2 text-slate-700 font-semibold">
            Round 2
          </span>
        </h1>

        <div className="flex items-center justify-center gap-6 mb-8 text-slate-600">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">Skills Challenge</span>
          </div>
          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-600" />
            <span className="text-sm font-medium">Timed Competition</span>
          </div>
        </div>

        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Welcome to the second round of QUAZAR. Demonstrate your expertise, race against time, and secure your place in the next stage.
        </p>

        <button
          onClick={handleStart}
          className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
        >
          <Zap className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
          <span>Begin Challenge</span>
        </button>

        <div className="mt-8 flex items-center justify-center gap-8 text-sm text-slate-500">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-700">02</div>
            <div>Round</div>
          </div>
          <div className="w-px h-12 bg-slate-200"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-700">Live</div>
            <div>Status</div>
          </div>
        </div>
      </div>
    </div>
  );
}
