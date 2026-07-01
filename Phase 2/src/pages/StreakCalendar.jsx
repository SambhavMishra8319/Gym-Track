
// src/pages/StreakCalendar.jsx - FULLY MOBILE RESPONSIVE (FIXED)
import React, { useState, useEffect } from "react";
import { getWorkouts } from "../firebase/exercises";
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  isSameDay,
  addMonths,
  subMonths,
  getDate,
  getDay 
} from 'date-fns';

export default function StreakCalendar({ user }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadWorkouts();
  }, [user]);

  const loadWorkouts = async () => {
    setLoading(true);
    try {
      const data = await getWorkouts(user.uid);
      setWorkouts(data);
    } catch (error) {
      console.error("Error loading workouts:", error);
    }
    setLoading(false);
  };

  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const monthDays = getMonthDays(currentMonth);

  const calculateCurrentStreak = () => {
    const sortedWorkouts = workouts
      .map(w => new Date(w.date))
      .sort((a, b) => b - a);
    
    let streak = 0;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    for (let i = 0; i < sortedWorkouts.length; i++) {
      const workoutDate = sortedWorkouts[i];
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - streak);
      
      if (isSameDay(workoutDate, expectedDate)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getDayStatus = (day) => {
    const hasWorkout = workouts.some(workout => 
      isSameDay(new Date(workout.date), day)
    );
    return hasWorkout ? 'completed' : 'empty';
  };

  const calculateStats = () => {
    let monthWorkouts = 0;
    let bestStreak = 0;
    let currentMonthStreak = 0;

    monthDays.forEach((day) => {
      const hasWorkout = getDayStatus(day) === 'completed';
      if (hasWorkout) {
        monthWorkouts++;
        currentMonthStreak++;
        bestStreak = Math.max(bestStreak, currentMonthStreak);
      } else {
        currentMonthStreak = 0;
      }
    });

    return { 
      currentStreak: calculateCurrentStreak(),
      bestStreak, 
      totalWorkouts: monthWorkouts 
    };
  };

  const stats = calculateStats();
  const today = new Date();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="text-center max-w-sm w-full space-y-4">
          <div className="text-5xl sm:text-6xl md:text-7xl mx-auto">🔥</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 leading-tight">
            Log in for streaks
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">Track your workout consistency!</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-orange-400 border-t-orange-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-xl sm:text-2xl text-gray-600 font-semibold">Loading streaks...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 p-2 sm:p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* HEADER - MOBILE STACKED */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12 space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent tracking-tight leading-tight">
              🔥 Streak Calendar
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-semibold max-w-md mx-auto">
              Build consistency, not perfection
            </p>
            
            {/* STATS - PERFECT MOBILE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-2xl mx-auto">
              <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-orange-200 text-center group hover:scale-[1.02] transition-all min-h-[100px] flex flex-col justify-center">
                {/* <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-orange-500 mb-2">{stats.currentStreak}</div> */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-orange-500 mb-2">{stats.currentStreak}</div>
                <div className="text-base sm:text-lg font-bold text-gray-700">Current Streak</div>
                {stats.currentStreak === 0 && (
                  <div className="text-orange-600 mt-2 font-semibold text-sm sm:text-base animate-pulse">
                    Hit the gym today! 💪
                  </div>
                )}
              </div>
              <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-red-200 text-center group hover:scale-[1.02] transition-all min-h-[100px] flex flex-col justify-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-500 mb-2">{stats.bestStreak}</div>
                <div className="text-base sm:text-lg font-bold text-gray-700">Best Streak</div>
              </div>
              <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-green-200 text-center group hover:scale-[1.02] transition-all min-h-[100px] flex flex-col justify-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-green-500 mb-2">{stats.totalWorkouts}</div>
                <div className="text-base sm:text-lg font-bold text-gray-700">Workouts in this Month</div>
              </div>
            </div>

            {/* MONTH NAV - MOBILE PERFECT */}
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-3 sm:p-4 w-12 h-12 sm:w-14 sm:h-14 bg-white/90 hover:bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all text-xl font-bold hover:scale-110 flex items-center justify-center shrink-0 border border-orange-200"
                aria-label="Previous month"
              >
                ‹
              </button>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-800 px-6 sm:px-8 py-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-2 border-orange-200 min-w-[180px]">
                {format(currentMonth, 'MMMM yyyy')}
              </div>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-3 sm:p-4 w-12 h-12 sm:w-14 sm:h-14 bg-white/90 hover:bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all text-xl font-bold hover:scale-110 flex items-center justify-center shrink-0 border border-orange-200"
                aria-label="Next month"
              >
                ›
              </button>
            </div>
          </div>

          {/* CALENDAR CONTAINER - FULL WIDTH RESPONSIVE */}
          <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border-2 border-orange-200">
            {/* DAYS HEADER - RESPONSIVE TEXT */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 md:gap-4 mb-6 sm:mb-8 md:mb-12">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="font-bold text-xs sm:text-sm md:text-lg lg:text-xl text-gray-700 py-2 sm:py-3 md:py-4 uppercase tracking-wide bg-gradient-to-r from-orange-100 to-red-100 rounded-xl shadow-sm border border-orange-100 text-center">
                  {day}
                </div>
              ))}
            </div>

            {/* DAYS GRID - PERFECT MOBILE SIZING */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 md:gap-4">
              {monthDays.map((day, index) => {
                const status = getDayStatus(day);
                const isToday = isSameDay(day, today);
                const dayNumber = getDate(day);
                
                return (
                  <div
                    key={index}
                    className={`
                      relative flex items-center justify-center rounded-xl sm:rounded-2xl md:rounded-3xl shadow-md md:shadow-xl transition-all duration-300 group cursor-pointer border hover:shadow-lg aspect-square
                      ${status === 'completed' 
                        ? 'bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 border-emerald-400 shadow-emerald-300 hover:shadow-emerald-400 text-white hover:scale-105 hover:rotate-3' 
                        : isToday 
                        ? 'bg-gradient-to-r from-orange-400 to-red-500 border-orange-400 shadow-orange-300 hover:shadow-orange-400 text-white ring-2 ring-orange-200 scale-105 animate-pulse' 
                        : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-orange-300 hover:shadow-orange-200 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 hover:scale-105'
                      }
                      ${status === 'completed' ? 'border-2 sm:border-3 md:border-4' : 'border sm:border-2 md:border-4'}
                    `}
                    style={{ minHeight: '48px', maxHeight: '64px', width: '100%' }}
                    onClick={() => status === 'empty' && window.open('/add', '_blank')}
                  >
                    <div className="font-bold text-lg sm:text-xl md:text-2xl drop-shadow-sm z-10 w-full h-full flex items-center justify-center px-1">
                      {dayNumber}
                    </div>
                    
                    {/* FIRE DOT - SCALED */}
                    {status === 'completed' && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full shadow-lg animate-bounce">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-white rounded-lg mx-auto mt-0.5 shadow-md flex items-center justify-center text-xs">
                          🔥
                        </div>
                      </div>
                    )}
                    
                    {/* TOOLTIP - DESKTOP ONLY */}
                    <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-black/90 backdrop-blur-sm text-white text-xs md:text-sm rounded-xl md:rounded-3xl flex items-center justify-center p-2 shadow-2xl -z-10">
                      {status === 'completed' ? '✅ Gym day complete!' : 
                       isToday ? '💪 Today! Log workout now!' : 'Click → Log workout!'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA BUTTON - FULL RESPONSIVE */}
          <div className="text-center mt-8 sm:mt-12 md:mt-16 space-y-4">
            <button
              onClick={() => window.location.href = '/add'}
              className="w-full sm:w-auto px-8 sm:px-12 md:px-16 py-6 sm:py-8 md:py-10 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white font-black text-xl sm:text-2xl md:text-3xl rounded-2xl shadow-2xl hover:shadow-3xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] border-4 border-orange-400/30 flex items-center justify-center gap-3 mx-auto max-w-sm"
            >
              💪 Log Workout Today
              <span className="text-2xl sm:text-3xl md:text-4xl">🔥</span>
            </button>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-semibold max-w-md mx-auto px-4">
              Keep the fire burning! Don't break the streak
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
