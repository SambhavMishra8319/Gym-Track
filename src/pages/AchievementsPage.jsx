// // import React, { useEffect, useState } from "react";
// // import { getUserAchievements } from "../firebase/users";

// // export default function AchievementsPage({ user }) {
// //   const [achievements, setAchievements] = useState([]);

// //   useEffect(() => {
// //     async function load() {
// //       if (!user) return;
// //       const data = await getUserAchievements(user.uid);
// //       setAchievements(data);
// //     }
// //     load();
// //   }, [user]);

// //   return (
// //     <div className="p-8 min-h-screen">
// //       <h2 className="text-3xl font-semibold mb-6">Achievements</h2>
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         {achievements.length === 0 && <p>No achievements yet.</p>}
// //         {achievements.map((a, i) => (
// //           <div key={i} className="bg-white p-4 rounded-xl shadow text-center">
// //             <div className="text-4xl mb-2">{a.emoji || "🏅"}</div>
// //             <h3 className="font-semibold">{a.title}</h3>
// //             <p className="text-sm text-gray-500">{a.description}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { getUserAchievements } from "../firebase/users";

// export default function AchievementsPage({ user }) {
//   const [achievements, setAchievements] = useState([]);

//   useEffect(() => {
//     async function load() {
//       if (!user) return;
//       const data = await getUserAchievements(user.uid);
//       setAchievements(data || []);
//     }
//     load();
//   }, [user]);

//   return (
//     <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gray-100">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-2xl md:text-3xl font-semibold mb-6">Achievements</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
//           {achievements.length === 0 && (
//             <p className="text-gray-500 text-sm md:text-base">
//               No achievements yet.
//             </p>
//           )}

//           {achievements.map((a, i) => (
//             <div
//               key={i}
//               className="bg-white p-4 rounded-xl shadow text-center"
//             >
//               <div className="text-3xl md:text-4xl mb-2">
//                 {a.emoji || "🏅"}
//               </div>
//               <h3 className="font-semibold text-sm md:text-base">
//                 {a.title}
//               </h3>
//               <p className="text-xs md:text-sm text-gray-500">
//                 {a.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/Achievement.jsx - FULLY RESPONSIVE ACHIEVEMENTS PAGE
import React, { useState, useEffect } from "react";
import { getWorkouts } from "../firebase/exercises";

export default function Achievement({ user }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalDays: 0,
    longestStreak: 0,
    currentStreak: 0,
    totalMonths: 0,
    avgWorkoutsPerWeek: 0
  });

  useEffect(() => {
    if (!user) return;
    loadAchievements();
  }, [user]);

  const loadAchievements = async () => {
    setLoading(true);
    try {
      const data = await getWorkouts(user.uid);
      setWorkouts(data);
      calculateAchievements(data);
    } catch (error) {
      console.error("Error loading achievements:", error);
    }
    setLoading(false);
  };

  const calculateAchievements = (workoutData) => {
    const dates = workoutData.map(w => new Date(w.date));
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    // Total workouts
    const totalWorkouts = dates.length;

    // Current streak
    const sortedDates = [...dates].sort((a, b) => b - a);
    let currentStreak = 0;
    for (let i = 0; i < sortedDates.length; i++) {
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - currentStreak);
      if (isSameDay(sortedDates[i], expectedDate)) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Longest streak
    let longestStreak = 0;
    let currentStreakTemp = 0;
    const sortedUniqueDates = [...new Set(sortedDates.map(d => d.toDateString()))]
      .map(str => new Date(str))
      .sort((a, b) => b - a);

    for (let i = 0; i < sortedUniqueDates.length; i++) {
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - currentStreakTemp);
      if (isSameDay(sortedUniqueDates[i], expectedDate)) {
        currentStreakTemp++;
        longestStreak = Math.max(longestStreak, currentStreakTemp);
      } else {
        currentStreakTemp = 0;
      }
    }

    // Total unique days
    const totalDays = new Set(dates.map(d => d.toDateString())).size;

    // Weeks trained
    const weeks = Math.ceil(totalDays / 7);
    const avgWorkoutsPerWeek = totalWorkouts / weeks || 0;

    // Total months
    const months = new Set(dates.map(d => `${d.getFullYear()}-${d.getMonth()}`)).size;

    setStats({
      totalWorkouts,
      totalDays,
      longestStreak,
      currentStreak,
      totalMonths: months,
      avgWorkoutsPerWeek: Math.round(avgWorkoutsPerWeek * 10) / 10
    });
  };

  // Helper function (same as calendar)
  const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const getAchievementBadges = () => {
    const badges = [];
    
    if (stats.currentStreak >= 30) badges.push('🔥 30-Day Fire');
    if (stats.longestStreak >= 100) badges.push('🏆 Century Streak');
    if (stats.totalWorkouts >= 365) badges.push('📅 Full Year');
    if (stats.totalWorkouts >= 1000) badges.push('💎 Diamond');
    if (stats.avgWorkoutsPerWeek >= 4) badges.push('⚡ Weekly Beast');
    if (stats.totalMonths >= 12) badges.push('🌟 Year-Rounder');

    return badges;
  };

  const badges = getAchievementBadges();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="text-center max-w-sm w-full space-y-4">
          <div className="text-5xl sm:text-6xl md:text-7xl mx-auto">🏆</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 leading-tight">
            Log in to see achievements
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">Unlock badges & track your progress!</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-purple-400 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-xl sm:text-2xl text-gray-600 font-semibold">Calculating achievements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-100 p-2 sm:p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* HERO HEADER */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent tracking-tight leading-tight">
            🏆 Your Achievements
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-semibold max-w-2xl mx-auto">
            Celebrate your consistency journey! Every workout counts.
          </p>
        </div>

        {/* MAIN STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto">
          {/* TOTAL WORKOUTS */}
          <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl border-4 border-purple-200 text-center group hover:scale-[1.02] transition-all flex flex-col items-center justify-center h-full">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              {stats.totalWorkouts.toLocaleString()}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">Total Workouts</div>
            <div className="text-purple-600 mt-2 font-semibold text-lg">💪 Sessions completed</div>
          </div>

          {/* CURRENT STREAK */}
          <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl border-4 border-orange-200 text-center group hover:scale-[1.02] transition-all flex flex-col items-center justify-center h-full relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-20 animate-pulse`}></div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-orange-500 mb-4 relative z-10">
              {stats.currentStreak}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800 relative z-10">Current Streak</div>
            {stats.currentStreak === 0 && (
              <div className="text-orange-600 mt-2 font-semibold text-lg relative z-10 animate-pulse">
                🔥 Start today!
              </div>
            )}
          </div>

          {/* BEST STREAK */}
          <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl border-4 border-emerald-200 text-center group hover:scale-[1.02] transition-all flex flex-col items-center justify-center h-full">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-600 mb-4">🏆</div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-500 mb-4">
              {stats.longestStreak}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">Best Streak</div>
          </div>
        </div>

        {/* ACHIEVEMENT BADGES */}
        {badges.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-gray-800 mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              🎖️ Unlocked Badges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {badges.map((badge, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-8 rounded-3xl shadow-2xl text-white text-center group hover:scale-105 transition-all border-4 border-white/20">
                  <div className="text-4xl mb-4 group-hover:animate-bounce">{badge.split(' ')[0]}</div>
                  <div className="font-bold text-xl">{badge}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6 animate-bounce">🎯</div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-600 mb-4">No badges yet!</h3>
            <p className="text-xl text-gray-500 mb-8 max-w-md mx-auto">Keep working out consistently to unlock your first achievement 🔥</p>
          </div>
        )}

        {/* ADDITIONAL STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-blue-200 text-center">
            <div className="text-4xl font-black text-blue-500 mb-4">{stats.totalDays}</div>
            <div className="text-xl font-bold text-gray-700">Unique Days</div>
            <p className="text-blue-600 mt-2 font-semibold">Days you hit the gym</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-indigo-200 text-center">
            <div className="text-4xl font-black text-indigo-500 mb-4">{stats.totalMonths}</div>
            <div className="text-xl font-bold text-gray-700">Months Active</div>
            <p className="text-indigo-600 mt-2 font-semibold">Months with workouts</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <button
            onClick={() => window.location.href = '/add'}
            className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-12 sm:px-16 py-8 sm:py-10 rounded-3xl font-black text-2xl sm:text-3xl shadow-2xl hover:shadow-3xl hover:from-purple-600 hover:to-orange-600 transition-all duration-300 hover:-translate-y-3 hover:scale-[1.05] border-4 border-white/20 w-full sm:w-auto max-w-md mx-auto"
          >
            💪 Keep Building
            <span className="text-4xl">🔥</span>
          </button>
          <p className="text-xl sm:text-2xl text-gray-600 font-semibold max-w-lg mx-auto">
            Every workout brings you closer to legendary status!
          </p>
        </div>
      </div>
    </div>
  );
}
