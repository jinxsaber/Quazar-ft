import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Medal, Award, Crown, Loader2 } from 'lucide-react';

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API}auth/login`);
        const sortedData = sortData(response.data.data);
        console.log(response);
        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const sortData = (array) => {
    return array.sort((a, b) => {
      if (a.level !== b.level) {
        return b.level - a.level;
      }
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    });
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-amber-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-slate-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-700" />;
      default:
        return null;
    }
  };

  const getRankBadgeClass = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-300 text-amber-700';
      case 2:
        return 'bg-gradient-to-br from-slate-100 to-gray-100 border-slate-300 text-slate-700';
      case 3:
        return 'bg-gradient-to-br from-orange-100 to-amber-100 border-orange-300 text-amber-800';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-600';
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.08),transparent_50%)]"></div>

        <div className="relative z-10 text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <div className="text-xl font-medium text-slate-600">
            Loading leaderboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.08),transparent_50%)]"></div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-1 h-1 bg-sky-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-4">
            <Trophy className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 tracking-wide">Competition Rankings</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700">
              Leaderboard
            </span>
          </h1>
          <p className="text-slate-600 text-lg">Top performers in QUAZAR Round 2</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-sky-600 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Branch</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-blue-50/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border font-semibold min-w-[60px] ${getRankBadgeClass(index + 1)}`}>
                        {getRankIcon(index + 1)}
                        <span>{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-700">{`${user.firstName} ${user.lastName}`}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600">{user.branch}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg">
                        <Trophy className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-blue-700">{user.level}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
