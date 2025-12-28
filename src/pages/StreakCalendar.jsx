// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import { getUserStreaks } from "../firebase/users";
// // // // // // // import { getUserStreaks } from "../firebase/users";

// // // // // // // export default function StreakCalendar({ user }) {
// // // // // // //   const [streaks, setStreaks] = useState([]);

// // // // // // //   useEffect(() => {
// // // // // // //     if (!user) return;
// // // // // // //     async function load() {
// // // // // // //       const data = await getUserStreaks(user.uid);
// // // // // // //       setStreaks(data);
// // // // // // //     }
// // // // // // //     load();
// // // // // // //   }, [user]);

// // // // // // //   // Render simple 7x4 grid of past month
// // // // // // //   return (
// // // // // // //     <div className="p-8 min-h-screen">
// // // // // // //       <h2 className="text-3xl font-semibold mb-6">Workout Streak Calendar</h2>
// // // // // // //       <div className="grid grid-cols-7 gap-1">
// // // // // // //         {streaks.map((day, idx) => (
// // // // // // //           <div
// // // // // // //             key={idx}
// // // // // // //             className={`h-10 w-10 rounded ${
// // // // // // //               day.done ? "bg-green-500" : "bg-gray-200"
// // // // // // //             }`}
// // // // // // //             title={day.date}
// // // // // // //           />
// // // // // // //         ))}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import { getUserStreaks } from "../firebase/users";

// // // // // // export default function StreakCalendar({ user }) {
// // // // // //   const [streaks, setStreaks] = useState([]);

// // // // // //   useEffect(() => {
// // // // // //     if (user?.uid) {
// // // // // //       getUserStreaks(user.uid).then((data) => setStreaks(data));
// // // // // //     }
// // // // // //   }, [user]);

// // // // // //   if (!user) return <p>Please log in to see your streaks</p>;
// // // // // //   if (!streaks.length) return <p>No streaks yet. Start your workouts!</p>;

// // // // // //   return (
// // // // // //     <div className="p-4">
// // // // // //       <h2 className="text-xl font-semibold mb-4">Your Workout Streaks</h2>
// // // // // //       <div className="grid grid-cols-7 gap-2">
// // // // // //         {streaks.map((day, index) => (
// // // // // //           <div
// // // // // //             key={index}
// // // // // //             className={`h-10 w-10 rounded-lg flex items-center justify-center 
// // // // // //               ${day.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
// // // // // //           >
// // // // // //             {day.date.slice(-2)} {/* last two digits of date */}
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // import React, { useEffect, useState } from "react";
// // // // // import { getUserStreaks } from "../firebase/users";

// // // // // export default function StreakCalendar({ user }) {
// // // // //   const [streaks, setStreaks] = useState([]);

// // // // //   useEffect(() => {
// // // // //     if (user?.uid) {
// // // // //       getUserStreaks(user.uid).then((data) => setStreaks(data || []));
// // // // //     }
// // // // //   }, [user]);

// // // // //   if (!user)
// // // // //     return (
// // // // //       <div className="pt-16 pb-24 px-4">
// // // // //         <p>Please log in to see your streaks</p>
// // // // //       </div>
// // // // //     );

// // // // //   if (!streaks.length)
// // // // //     return (
// // // // //       <div className="pt-16 pb-24 px-4">
// // // // //         <p>No streaks yet. Start your workouts!</p>
// // // // //       </div>
// // // // //     );

// // // // //   return (
// // // // //     <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gray-100">
// // // // //       <div className="max-w-3xl mx-auto">
// // // // //         <h2 className="text-xl md:text-2xl font-semibold mb-4">
// // // // //           Your Workout Streaks
// // // // //         </h2>
// // // // //         <div className="grid grid-cols-7 gap-2">
// // // // //           {streaks.map((day, index) => (
// // // // //             <div
// // // // //               key={index}
// // // // //               className={`h-9 w-9 md:h-10 md:w-10 rounded-lg flex items-center justify-center ${
// // // // //                 day.completed
// // // // //                   ? "bg-green-500 text-white"
// // // // //                   : "bg-gray-200 text-gray-500"
// // // // //               }`}
// // // // //             >
// // // // //               {day.date.slice(-2)}
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // // src/pages/StreakCalendar.jsx - BEAUTIFUL WORKING VERSION
// // // // import React, { useState, useEffect } from "react";
// // // // import { getWorkouts } from "../firebase/exercises";
// // // // import { format, startOfMonth, endOfMonth, eachDayOfMonth, isSameDay } from 'date-fns';

// // // // export default function StreakCalendar({ user }) {
// // // //   const [currentMonth, setCurrentMonth] = useState(new Date());
// // // //   const [workouts, setWorkouts] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     if (!user) return;
// // // //     loadWorkouts();
// // // //   }, [user]);

// // // //   useEffect(() => {
// // // //     if (workouts.length > 0) {
// // // //       calculateStats();
// // // //     }
// // // //   }, [workouts, currentMonth]);

// // // //   const loadWorkouts = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const data = await getWorkouts(user.uid);
// // // //       setWorkouts(data);
// // // //     } catch (error) {
// // // //       console.error("Error loading workouts:", error);
// // // //     }
// // // //     setLoading(false);
// // // //   };

// // // //   const calculateStats = () => {
// // // //     const monthStart = startOfMonth(currentMonth);
// // // //     const monthEnd = endOfMonth(currentMonth);
// // // //     const monthDays = eachDayOfMonth(currentMonth);
    
// // // //     let currentStreak = 0;
// // // //     let bestStreak = 0;
// // // //     let totalWorkouts = 0;

// // // //     monthDays.forEach((day) => {
// // // //       const hasWorkout = workouts.some(workout => 
// // // //         isSameDay(new Date(workout.date), day)
// // // //       );
      
// // // //       if (hasWorkout) {
// // // //         currentStreak++;
// // // //         totalWorkouts++;
// // // //         bestStreak = Math.max(bestStreak, currentStreak);
// // // //       } else {
// // // //         currentStreak = 0;
// // // //       }
// // // //     });

// // // //     return { currentStreak, bestStreak, totalWorkouts };
// // // //   };

// // // //   const getDayStatus = (day) => {
// // // //     const hasWorkout = workouts.some(workout => 
// // // //       isSameDay(new Date(workout.date), day)
// // // //     );
// // // //     return hasWorkout ? 'completed' : 'empty';
// // // //   };

// // // //   const monthDays = eachDayOfMonth(currentMonth);
// // // //   const stats = calculateStats();
// // // //   const today = new Date();

// // // //   if (!user) {
// // // //     return (
// // // //       <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
// // // //         <div className="text-center max-w-md">
// // // //           <div className="text-6xl mb-6">🔥</div>
// // // //           <h2 className="text-3xl font-bold text-gray-800 mb-4">Log in for streaks</h2>
// // // //           <p className="text-xl text-gray-600">Track your workout consistency!</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="w-16 h-16 border-4 border-orange-400 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
// // // //           <p className="text-xl text-gray-600">Loading streaks...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
// // // //       <div className="max-w-4xl mx-auto">
// // // //         {/* HEADER */}
// // // //         <div className="text-center mb-12">
// // // //           <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent mb-4 tracking-tight">
// // // //             🔥 Streak Calendar
// // // //           </h1>
// // // //           <p className="text-2xl text-gray-700 font-semibold mb-2">Build consistency, not perfection</p>
          
// // // //           {/* STREAK STATS */}
// // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
// // // //             <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-orange-200 text-center group hover:scale-[1.02] transition-all">
// // // //               <div className="text-4xl font-black text-orange-500 mb-2">{stats.currentStreak}</div>
// // // //               <div className="text-lg font-semibold text-gray-700">Current Streak</div>
// // // //               {isSameDay(today, monthDays[monthDays.length - 1]) && stats.currentStreak === 0 && (
// // // //                 <div className="text-sm text-orange-600 mt-1 font-medium">Hit the gym today! 💪</div>
// // // //               )}
// // // //             </div>
// // // //             <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-red-200 text-center group hover:scale-[1.02] transition-all">
// // // //               <div className="text-4xl font-black text-red-500 mb-2">{stats.bestStreak}</div>
// // // //               <div className="text-lg font-semibold text-gray-700">Best Streak</div>
// // // //             </div>
// // // //             <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-green-200 text-center group hover:scale-[1.02] transition-all">
// // // //               <div className="text-4xl font-black text-green-500 mb-2">{stats.totalWorkouts}</div>
// // // //               <div className="text-lg font-semibold text-gray-700">This Month</div>
// // // //             </div>
// // // //           </div>

// // // //           {/* MONTH NAV */}
// // // //           <div className="flex items-center justify-center gap-4 mb-8">
// // // //             <button
// // // //               onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
// // // //               className="p-3 bg-white/50 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
// // // //             >
// // // //               ‹
// // // //             </button>
// // // //             <div className="text-2xl font-bold text-gray-800 px-8 py-3 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl">
// // // //               {format(currentMonth, 'MMMM yyyy')}
// // // //             </div>
// // // //             <button
// // // //               onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
// // // //               className="p-3 bg-white/50 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
// // // //             >
// // // //               ›
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* CALENDAR */}
// // // //         <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-orange-200 max-w-2xl mx-auto">
// // // //           <div className="grid grid-cols-7 gap-3 text-center mb-6">
// // // //             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
// // // //               <div key={day} className="font-bold text-lg text-gray-700 py-3 uppercase tracking-wide">
// // // //                 {day}
// // // //               </div>
// // // //             ))}
// // // //           </div>

// // // //           <div className="grid grid-cols-7 gap-3">
// // // //             {monthDays.map((day, index) => {
// // // //               const status = getDayStatus(day);
// // // //               const isToday = isSameDay(day, today);
// // // //               const dayNumber = format(day, 'd');
              
// // // //               return (
// // // //                 <div
// // // //                   key={index}
// // // //                   className={`
// // // //                     relative h-16 w-16 rounded-2xl shadow-md transition-all hover:scale-110 group cursor-pointer
// // // //                     ${status === 'completed' 
// // // //                       ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-green-300 hover:shadow-green-400 text-white' 
// // // //                       : isToday 
// // // //                       ? 'bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-300 hover:shadow-orange-400 text-white' 
// // // //                       : 'bg-white shadow-md hover:shadow-lg border border-gray-200 group-hover:border-orange-300'
// // // //                     }
// // // //                   `}
// // // //                   onClick={() => {
// // // //                     if (status === 'empty') {
// // // //                       window.open('/add', '_blank');
// // // //                     }
// // // //                   }}
// // // //                 >
// // // //                   <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
// // // //                     {dayNumber}
// // // //                   </div>
                  
// // // //                   {/* Workout indicator */}
// // // //                   {status === 'completed' && (
// // // //                     <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
// // // //                       <div className="w-4 h-4 bg-green-500 rounded-full shadow-md animate-pulse"></div>
// // // //                     </div>
// // // //                   )}
                  
// // // //                   {/* Today ring */}
// // // //                   {isToday && (
// // // //                     <div className="absolute inset-0 rounded-2xl ring-4 ring-orange-300/50 animate-pulse"></div>
// // // //                   )}
                  
// // // //                   {/* Hover tooltip */}
// // // //                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black/90 text-white text-xs rounded-2xl flex items-center justify-center p-2">
// // // //                     {status === 'completed' ? '✅ Worked out!' : isToday ? '💪 Today!' : 'Click to workout'}
// // // //                   </div>
// // // //                 </div>
// // // //               );
// // // //             })}
// // // //           </div>
// // // //         </div>

// // // //         {/* CTA */}
// // // //         <div className="text-center mt-12">
// // // //           <button
// // // //             onClick={() => window.location.href = '/add'}
// // // //             className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-6 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl hover:from-orange-600 hover:to-red-600 transition-all transform hover:-translate-y-1"
// // // //           >
// // // //             💪 Log Today's Workout
// // // //             <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center animate-ping">
// // // //               →
// // // //             </div>
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // // src/pages/StreakCalendar.jsx - FIXED IMPORTS (copy entire)
// // // import React, { useState, useEffect } from "react";
// // // import { getWorkouts } from "../firebase/exercises";
// // // import { 
// // //   format, 
// // //   startOfMonth, 
// // //   endOfMonth, 
// // //   isSameDay,
// // //   addMonths,
// // //   subMonths,
// // //   getDate,
// // //   getDay 
// // // } from 'date-fns';

// // // export default function StreakCalendar({ user }) {
// // //   const [currentMonth, setCurrentMonth] = useState(new Date());
// // //   const [workouts, setWorkouts] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     if (!user) return;
// // //     loadWorkouts();
// // //   }, [user]);

// // //   const loadWorkouts = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const data = await getWorkouts(user.uid);
// // //       setWorkouts(data);
// // //     } catch (error) {
// // //       console.error("Error loading workouts:", error);
// // //     }
// // //     setLoading(false);
// // //   };

// // //   // 👇 FIXED: Manual month days generation
// // //   const getMonthDays = (date) => {
// // //     const year = date.getFullYear();
// // //     const month = date.getMonth();
// // //     const firstDay = new Date(year, month, 1);
// // //     const lastDay = new Date(year, month + 1, 0);
// // //     const daysInMonth = lastDay.getDate();
// // //     const days = [];
    
// // //     for (let i = 1; i <= daysInMonth; i++) {
// // //       days.push(new Date(year, month, i));
// // //     }
// // //     return days;
// // //   };

// // //   const monthDays = getMonthDays(currentMonth);

// // //   const getDayStatus = (day) => {
// // //     const hasWorkout = workouts.some(workout => 
// // //       isSameDay(new Date(workout.date), day)
// // //     );
// // //     return hasWorkout ? 'completed' : 'empty';
// // //   };

// // //   const calculateStats = () => {
// // //     let currentStreak = 0;
// // //     let bestStreak = 0;
// // //     let totalWorkouts = 0;

// // //     monthDays.forEach((day) => {
// // //       const hasWorkout = getDayStatus(day) === 'completed';
// // //       if (hasWorkout) {
// // //         currentStreak++;
// // //         totalWorkouts++;
// // //         bestStreak = Math.max(bestStreak, currentStreak);
// // //       } else {
// // //         currentStreak = 0;
// // //       }
// // //     });

// // //     return { currentStreak, bestStreak, totalWorkouts };
// // //   };

// // //   const stats = calculateStats();
// // //   const today = new Date();

// // //   if (!user) {
// // //     return (
// // //       <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
// // //         <div className="text-center max-w-md">
// // //           <div className="text-6xl mb-6">🔥</div>
// // //           <h2 className="text-3xl font-bold text-gray-800 mb-4">Log in for streaks</h2>
// // //           <p className="text-xl text-gray-600">Track your workout consistency!</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="w-16 h-16 border-4 border-orange-400 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
// // //           <p className="text-xl text-gray-600">Loading streaks...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
// // //       <div className="max-w-4xl mx-auto">
// // //         {/* HEADER */}
// // //         <div className="text-center mb-12">
// // //           <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent mb-4 tracking-tight">
// // //             🔥 Streak Calendar
// // //           </h1>
// // //           <p className="text-2xl text-gray-700 font-semibold mb-2">Build consistency, not perfection</p>
          
// // //           {/* STREAK STATS */}
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
// // //             <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-orange-200 text-center group hover:scale-[1.02] transition-all">
// // //               <div className="text-4xl font-black text-orange-500 mb-2">{stats.currentStreak}</div>
// // //               <div className="text-lg font-semibold text-gray-700">Current Streak</div>
// // //             </div>
// // //             <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-red-200 text-center group hover:scale-[1.02] transition-all">
// // //               <div className="text-4xl font-black text-red-500 mb-2">{stats.bestStreak}</div>
// // //               <div className="text-lg font-semibold text-gray-700">Best Streak</div>
// // //             </div>
// // //             <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-green-200 text-center group hover:scale-[1.02] transition-all">
// // //               <div className="text-4xl font-black text-green-500 mb-2">{stats.totalWorkouts}</div>
// // //               <div className="text-lg font-semibold text-gray-700">This Month</div>
// // //             </div>
// // //           </div>

// // //           {/* MONTH NAV */}
// // //           <div className="flex items-center justify-center gap-4 mb-8">
// // //             <button
// // //               onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
// // //               className="p-4 bg-white/70 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all text-2xl"
// // //               title="Previous month"
// // //             >
// // //               ‹
// // //             </button>
// // //             <div className="text-3xl font-black text-gray-800 px-12 py-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200">
// // //               {format(currentMonth, 'MMMM yyyy')}
// // //             </div>
// // //             <button
// // //               onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
// // //               className="p-4 bg-white/70 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all text-2xl"
// // //               title="Next month"
// // //             >
// // //               ›
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* CALENDAR */}
// // //         <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-orange-200 max-w-2xl mx-auto">
// // //           {/* DAYS HEADER */}
// // //           <div className="grid grid-cols-7 gap-4 text-center mb-8">
// // //             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
// // //               <div key={day} className="font-bold text-xl text-gray-700 py-4 uppercase tracking-wide bg-gradient-to-r from-orange-100 to-red-100 rounded-xl">
// // //                 {day}
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* DAYS */}
// // //           <div className="grid grid-cols-7 gap-4">
// // //             {monthDays.map((day, index) => {
// // //               const status = getDayStatus(day);
// // //               const isToday = isSameDay(day, today);
// // //               const dayNumber = getDate(day);
              
// // //               return (
// // //                 <div
// // //                   key={index}
// // //                   className={`
// // //                     relative h-20 w-20 rounded-2xl shadow-lg transition-all hover:scale-110 cursor-pointer group border-2
// // //                     ${status === 'completed' 
// // //                       ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-400 shadow-green-300 hover:shadow-green-400 text-white' 
// // //                       : isToday 
// // //                       ? 'bg-gradient-to-br from-orange-400 to-red-500 border-orange-400 shadow-orange-300 hover:shadow-orange-400 text-white scale-105 ring-4 ring-orange-200' 
// // //                       : 'bg-white border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:shadow-orange-200'
// // //                     }
// // //                   `}
// // //                   onClick={() => status === 'empty' && window.open('/add', '_blank')}
// // //                 >
// // //                   <div className="absolute inset-0 flex items-center justify-center font-black text-xl z-10">
// // //                     {dayNumber}
// // //                   </div>
                  
// // //                   {/* Workout fire */}
// // //                   {status === 'completed' && (
// // //                     <div className="absolute top-1 right-1 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg animate-pulse">
// // //                       <div className="w-5 h-5 bg-red-500 rounded-full mx-auto mt-1.5 shadow-md"></div>
// // //                     </div>
// // //                   )}
                  
// // //                   {/* Hover tooltip */}
// // //                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all pointer-events-none bg-black/95 text-white text-xs rounded-2xl flex items-center justify-center p-3 backdrop-blur-sm">
// // //                     {status === 'completed' ? '✅ Gym day!' : isToday ? '💪 Today - Log workout!' : 'Click to workout!'}
// // //                   </div>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         </div>

// // //         {/* CTA */}
// // //         <div className="text-center mt-16">
// // //           <button
// // //             onClick={() => window.location.href = '/add'}
// // //             className="inline-flex items-center gap-4 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white px-16 py-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:from-orange-600 hover:to-red-600 transition-all transform hover:-translate-y-2 hover:scale-[1.02] border-4 border-orange-400/30"
// // //           >
// // //             💪 Log Workout Today
// // //             <span className="text-3xl animate-bounce">🔥</span>
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // src/pages/StreakCalendar.jsx - FULL WORKING VERSION (copy entire)
// // import React, { useState, useEffect } from "react";
// // import { getWorkouts } from "../firebase/exercises";
// // import { 
// //   format, 
// //   startOfMonth, 
// //   endOfMonth, 
// //   isSameDay,
// //   addMonths,
// //   subMonths,
// //   getDate,
// //   getDay 
// // } from 'date-fns';

// // export default function StreakCalendar({ user }) {
// //   const [currentMonth, setCurrentMonth] = useState(new Date());
// //   const [workouts, setWorkouts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!user) return;
// //     loadWorkouts();
// //   }, [user]);

// //   const loadWorkouts = async () => {
// //     setLoading(true);
// //     try {
// //       const data = await getWorkouts(user.uid);
// //       setWorkouts(data);
// //     } catch (error) {
// //       console.error("Error loading workouts:", error);
// //     }
// //     setLoading(false);
// //   };

// //   // 👇 MANUAL MONTH DAYS (no eachDayOfMonth)
// //   const getMonthDays = (date) => {
// //     const year = date.getFullYear();
// //     const month = date.getMonth();
// //     const daysInMonth = new Date(year, month + 1, 0).getDate();
// //     const days = [];
// //     for (let i = 1; i <= daysInMonth; i++) {
// //       days.push(new Date(year, month, i));
// //     }
// //     return days;
// //   };

// //   const monthDays = getMonthDays(currentMonth);

// //   // 👇 TRUE CURRENT STREAK (across ALL months)
// //   const calculateCurrentStreak = () => {
// //     const sortedWorkouts = workouts
// //       .map(w => new Date(w.date))
// //       .sort((a, b) => b - a);
    
// //     let streak = 0;
// //     const today = new Date();
// //     today.setHours(23, 59, 59, 999);
    
// //     for (let i = 0; i < sortedWorkouts.length; i++) {
// //       const workoutDate = sortedWorkouts[i];
// //       const expectedDate = new Date(today);
// //       expectedDate.setDate(today.getDate() - streak);
      
// //       if (isSameDay(workoutDate, expectedDate)) {
// //         streak++;
// //       } else {
// //         break;
// //       }
// //     }
// //     return streak;
// //   };

// //   const getDayStatus = (day) => {
// //     const hasWorkout = workouts.some(workout => 
// //       isSameDay(new Date(workout.date), day)
// //     );
// //     return hasWorkout ? 'completed' : 'empty';
// //   };

// //   const calculateStats = () => {
// //     let monthWorkouts = 0;
// //     let bestStreak = 0;
// //     let currentMonthStreak = 0;

// //     monthDays.forEach((day) => {
// //       const hasWorkout = getDayStatus(day) === 'completed';
// //       if (hasWorkout) {
// //         monthWorkouts++;
// //         currentMonthStreak++;
// //         bestStreak = Math.max(bestStreak, currentMonthStreak);
// //       } else {
// //         currentMonthStreak = 0;
// //       }
// //     });

// //     return { 
// //       currentStreak: calculateCurrentStreak(),
// //       bestStreak, 
// //       totalWorkouts: monthWorkouts 
// //     };
// //   };

// //   const stats = calculateStats();
// //   const today = new Date();

// //   if (!user) {
// //     return (
// //       <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
// //         <div className="text-center max-w-md">
// //           <div className="text-6xl mb-6">🔥</div>
// //           <h2 className="text-3xl font-bold text-gray-800 mb-4">Log in for streaks</h2>
// //           <p className="text-xl text-gray-600">Track your workout consistency!</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (loading) {
// //     return (
// //       <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="w-16 h-16 border-4 border-orange-400 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-xl text-gray-600">Loading streaks...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
// //       <div className="max-w-4xl mx-auto">
// //         {/* HEADER */}
// //         <div className="text-center mb-12">
// //           <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent mb-4 tracking-tight">
// //             🔥 Streak Calendar
// //           </h1>
// //           <p className="text-2xl text-gray-700 font-semibold mb-2">Build consistency, not perfection</p>
          
// //           {/* STREAK STATS */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
// //             <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-orange-200 text-center group hover:scale-[1.02] transition-all">
// //               <div className="text-5xl font-black text-orange-500 mb-2">{stats.currentStreak}</div>
// //               <div className="text-xl font-bold text-gray-700">Current Streak</div>
// //               {stats.currentStreak === 0 && (
// //                 <div className="text-orange-600 mt-2 font-semibold text-lg animate-pulse">Hit the gym today! 💪</div>
// //               )}
// //             </div>
// //             <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-red-200 text-center group hover:scale-[1.02] transition-all">
// //               <div className="text-5xl font-black text-red-500 mb-2">{stats.bestStreak}</div>
// //               <div className="text-xl font-bold text-gray-700">Best Streak</div>
// //             </div>
// //             <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-green-200 text-center group hover:scale-[1.02] transition-all">
// //               <div className="text-5xl font-black text-green-500 mb-2">{stats.totalWorkouts}</div>
// //               <div className="text-xl font-bold text-gray-700">This Month</div>
// //             </div>
// //           </div>

// //           {/* MONTH NAV */}
// //           <div className="flex items-center justify-center gap-6 mb-12">
// //             <button
// //               onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
// //               className="p-4 bg-white/70 hover:bg-white rounded-full shadow-xl hover:shadow-2xl transition-all text-2xl font-bold hover:scale-110"
// //               title="Previous month"
// //             >
// //               ‹
// //             </button>
// //             <div className="text-4xl font-black text-gray-800 px-16 py-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-orange-200">
// //               {format(currentMonth, 'MMMM yyyy')}
// //             </div>
// //             <button
// //               onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
// //               className="p-4 bg-white/70 hover:bg-white rounded-full shadow-xl hover:shadow-2xl transition-all text-2xl font-bold hover:scale-110"
// //               title="Next month"
// //             >
// //               ›
// //             </button>
// //           </div>
// //         </div>

// //         {/* CALENDAR */}
// //         <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-12 border-4 border-orange-200 max-w-3xl mx-auto">
// //           {/* DAYS HEADER */}
// //           <div className="grid grid-cols-7 gap-6 text-center mb-12">
// //             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
// //               <div key={day} className="font-black text-2xl text-gray-700 py-6 uppercase tracking-wider bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl shadow-md hover:shadow-lg transition-all">
// //                 {day}
// //               </div>
// //             ))}
// //           </div>

// //           {/* DAYS */}
// //           <div className="grid grid-cols-7 gap-6">
// //             {monthDays.map((day, index) => {
// //               const status = getDayStatus(day);
// //               const isToday = isSameDay(day, today);
// //               const dayNumber = getDate(day);
              
// //               return (
// //                 <div
// //                   key={index}
// //                   className={`
// //                     relative h-24 w-24 rounded-3xl shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer group border-4 hover:shadow-2xl
// //                     ${status === 'completed' 
// //                       ? 'bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 border-emerald-500 shadow-emerald-400 hover:shadow-emerald-500 text-white hover:rotate-3' 
// //                       : isToday 
// //                       ? 'bg-gradient-to-r from-orange-400 to-red-500 border-orange-500 shadow-orange-400 hover:shadow-orange-500 text-white ring-4 ring-orange-300 scale-105 animate-pulse' 
// //                       : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-orange-400 hover:shadow-orange-300 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50'
// //                     }
// //                   `}
// //                   onClick={() => status === 'empty' && window.open('/add', '_blank')}
// //                 >
// //                   <div className="absolute inset-0 flex items-center justify-center font-black text-2xl z-10 drop-shadow-lg">
// //                     {dayNumber}
// //                   </div>
                  
// //                   {/* 🔥 FIRE DOT */}
// //                   {status === 'completed' && (
// //                     <div className="absolute top-2 right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl shadow-xl animate-bounce-slow">
// //                       <div className="w-6 h-6 bg-white rounded-xl mx-auto mt-2 shadow-lg flex items-center justify-center">
// //                         🔥
// //                       </div>
// //                     </div>
// //                   )}
                  
// //                   {/* Hover tooltip */}
// //                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none bg-black/95 backdrop-blur-md text-white text-sm rounded-3xl flex items-center justify-center p-4 shadow-2xl">
// //                     {status === 'completed' ? '✅ Gym day complete!' : 
// //                      isToday ? '💪 Today! Log workout now!' : 'Click → Log workout!'}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>

// //         {/* 🔥 BIG CTA */}
// //         <div className="text-center mt-20">
// //           <button
// //             onClick={() => window.location.href = '/add'}
// //             className="inline-flex items-center gap-4 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white px-20 py-10 rounded-3xl font-black text-3xl shadow-2xl hover:shadow-3xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-4 hover:scale-[1.05] border-8 border-orange-400/30 animate-pulse"
// //           >
// //             💪 Log Workout Today
// //             <span className="text-4xl">🔥</span>
// //           </button>
// //           <p className="text-xl text-gray-600 mt-6 font-semibold">Keep the fire burning! Don't break the streak</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // src/pages/StreakCalendar.jsx - FULL WORKING VERSION (IMPROVED MOBILE RESPONSIVE)
// import React, { useState, useEffect } from "react";
// import { getWorkouts } from "../firebase/exercises";
// import { 
//   format, 
//   startOfMonth, 
//   endOfMonth, 
//   isSameDay,
//   addMonths,
//   subMonths,
//   getDate,
//   getDay 
// } from 'date-fns';

// export default function StreakCalendar({ user }) {
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [workouts, setWorkouts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) return;
//     loadWorkouts();
//   }, [user]);

//   const loadWorkouts = async () => {
//     setLoading(true);
//     try {
//       const data = await getWorkouts(user.uid);
//       setWorkouts(data);
//     } catch (error) {
//       console.error("Error loading workouts:", error);
//     }
//     setLoading(false);
//   };

//   const getMonthDays = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const days = [];
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(new Date(year, month, i));
//     }
//     return days;
//   };

//   const monthDays = getMonthDays(currentMonth);

//   const calculateCurrentStreak = () => {
//     const sortedWorkouts = workouts
//       .map(w => new Date(w.date))
//       .sort((a, b) => b - a);
    
//     let streak = 0;
//     const today = new Date();
//     today.setHours(23, 59, 59, 999);
    
//     for (let i = 0; i < sortedWorkouts.length; i++) {
//       const workoutDate = sortedWorkouts[i];
//       const expectedDate = new Date(today);
//       expectedDate.setDate(today.getDate() - streak);
      
//       if (isSameDay(workoutDate, expectedDate)) {
//         streak++;
//       } else {
//         break;
//       }
//     }
//     return streak;
//   };

//   const getDayStatus = (day) => {
//     const hasWorkout = workouts.some(workout => 
//       isSameDay(new Date(workout.date), day)
//     );
//     return hasWorkout ? 'completed' : 'empty';
//   };

//   const calculateStats = () => {
//     let monthWorkouts = 0;
//     let bestStreak = 0;
//     let currentMonthStreak = 0;

//     monthDays.forEach((day) => {
//       const hasWorkout = getDayStatus(day) === 'completed';
//       if (hasWorkout) {
//         monthWorkouts++;
//         currentMonthStreak++;
//         bestStreak = Math.max(bestStreak, currentMonthStreak);
//       } else {
//         currentMonthStreak = 0;
//       }
//     });

//     return { 
//       currentStreak: calculateCurrentStreak(),
//       bestStreak, 
//       totalWorkouts: monthWorkouts 
//     };
//   };

//   const stats = calculateStats();
//   const today = new Date();

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex flex-col items-center justify-center px-4 py-12 sm:py-20">
//         <div className="text-center max-w-md w-full">
//           <div className="text-6xl sm:text-7xl mb-6 mx-auto">🔥</div>
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 mb-4 leading-tight">
//             Log in for streaks
//           </h2>
//           <p className="text-lg sm:text-xl text-gray-600 px-4">Track your workout consistency!</p>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex flex-col items-center justify-center px-4 py-12 sm:py-20">
//         <div className="text-center">
//           <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-orange-400 border-t-orange-600 rounded-full animate-spin mx-auto mb-6"></div>
//           <p className="text-xl sm:text-2xl text-gray-600 font-semibold">Loading streaks...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 px-4 py-12 sm:py-16 md:py-20 md:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* HEADER */}
//         <div className="text-center mb-8 sm:mb-12 md:mb-16">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent mb-4 sm:mb-6 tracking-tight leading-tight px-2">
//             🔥 Streak Calendar
//           </h1>
//           <p className="text-xl sm:text-2xl md:text-2xl text-gray-700 font-semibold mb-6 sm:mb-8 px-2">
//             Build consistency, not perfection
//           </p>
          
//           {/* STREAK STATS - MOBILE STACKED, DESKTOP GRID */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
//             <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-orange-200 text-center group hover:scale-[1.02] transition-all h-full flex flex-col justify-center">
//               <div className="text-4xl sm:text-5xl md:text-5xl font-black text-orange-500 mb-3 sm:mb-2">{stats.currentStreak}</div>
//               <div className="text-lg sm:text-xl font-bold text-gray-700">Current Streak</div>
//               {stats.currentStreak === 0 && (
//                 <div className="text-orange-600 mt-3 sm:mt-2 font-semibold text-base sm:text-lg animate-pulse px-2">
//                   Hit the gym today! 💪
//                 </div>
//               )}
//             </div>
//             <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-red-200 text-center group hover:scale-[1.02] transition-all h-full flex flex-col justify-center">
//               <div className="text-4xl sm:text-5xl md:text-5xl font-black text-red-500 mb-3 sm:mb-2">{stats.bestStreak}</div>
//               <div className="text-lg sm:text-xl font-bold text-gray-700">Best Streak</div>
//             </div>
//             <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-green-200 text-center group hover:scale-[1.02] transition-all h-full flex flex-col justify-center">
//               <div className="text-4xl sm:text-5xl md:text-5xl font-black text-green-500 mb-3 sm:mb-2">{stats.totalWorkouts}</div>
//               <div className="text-lg sm:text-xl font-bold text-gray-700">This Month</div>
//             </div>
//           </div>

//           {/* MONTH NAV - MOBILE FRIENDLY */}
//           <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-12 px-2">
//             <button
//               onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
//               className="p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 bg-white/80 hover:bg-white rounded-2xl sm:rounded-full shadow-xl hover:shadow-2xl transition-all text-xl sm:text-2xl font-bold hover:scale-110 flex items-center justify-center shrink-0"
//               title="Previous month"
//             >
//               ‹
//             </button>
//             <div className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 px-8 sm:px-16 py-6 sm:py-8 bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-orange-200 min-w-[200px] sm:min-w-[280px]">
//               {format(currentMonth, 'MMMM yyyy')}
//             </div>
//             <button
//               onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
//               className="p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 bg-white/80 hover:bg-white rounded-2xl sm:rounded-full shadow-xl hover:shadow-2xl transition-all text-xl sm:text-2xl font-bold hover:scale-110 flex items-center justify-center shrink-0"
//               title="Next month"
//             >
//               ›
//             </button>
//           </div>
//         </div>

//         {/* CALENDAR - FULLY RESPONSIVE */}
//         <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border-2 sm:border-4 border-orange-200 max-w-full sm:max-w-3xl mx-auto mx-auto">
//           {/* DAYS HEADER - RESPONSIVE */}
//           <div className="grid grid-cols-7 gap-2 sm:gap-4 md:gap-6 text-center mb-8 sm:mb-12">
//             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//               <div key={day} className="font-black text-lg sm:text-xl md:text-2xl text-gray-700 py-3 sm:py-4 md:py-6 uppercase tracking-wider bg-gradient-to-r from-orange-100 to-red-100 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all text-xs sm:text-sm md:text-base">
//                 {day}
//               </div>
//             ))}
//           </div>

//           {/* DAYS GRID - MOBILE FRIENDLY SIZING */}
//           <div className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-6">
//             {monthDays.map((day, index) => {
//               const status = getDayStatus(day);
//               const isToday = isSameDay(day, today);
//               const dayNumber = getDate(day);
              
//               return (
//                 <div
//                   key={index}
//                   className={`
//                     relative h-20 sm:h-24 md:h-24 w-20 sm:w-24 md:w-24 rounded-2xl sm:rounded-3xl shadow-xl transition-all duration-300 hover:scale-105 sm:hover:scale-110 cursor-pointer group border-2 sm:border-4 hover:shadow-2xl aspect-square flex-shrink-0
//                     ${status === 'completed' 
//                       ? 'bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 border-emerald-500 shadow-emerald-400 hover:shadow-emerald-500 text-white hover:rotate-3' 
//                       : isToday 
//                       ? 'bg-gradient-to-r from-orange-400 to-red-500 border-orange-500 shadow-orange-400 hover:shadow-orange-500 text-white ring-2 sm:ring-4 ring-orange-300 scale-105 animate-pulse' 
//                       : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-orange-400 hover:shadow-orange-300 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50'
//                     }
//                   `}
//                   onClick={() => status === 'empty' && window.open('/add', '_blank')}
//                 >
//                   <div className="absolute inset-0 flex items-center justify-center font-black text-xl sm:text-2xl md:text-2xl z-10 drop-shadow-lg px-1">
//                     {dayNumber}
//                   </div>
                  
//                   {/* 🔥 FIRE DOT - RESPONSIVE */}
//                   {status === 'completed' && (
//                     <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl sm:rounded-2xl shadow-xl animate-bounce-slow">
//                       <div className="w-4 sm:w-6 h-4 sm:h-6 bg-white rounded-lg sm:rounded-xl mx-auto mt-1 sm:mt-2 shadow-lg flex items-center justify-center text-xs sm:text-sm">
//                         🔥
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* MOBILE-FRIENDLY HOVER TOOLTIP */}
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-all duration-200 pointer-events-none bg-black/95 backdrop-blur-md text-white text-xs sm:text-sm md:text-sm rounded-2xl sm:rounded-3xl flex items-center justify-center p-2 sm:p-4 shadow-2xl min-h-0">
//                     {status === 'completed' ? '✅ Gym day complete!' : 
//                      isToday ? '💪 Today! Log workout now!' : 'Click → Log workout!'}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* 🔥 BIG CTA - FULL RESPONSIVE */}
//         <div className="text-center mt-12 sm:mt-16 md:mt-20 px-4">
//           <button
//             onClick={() => window.location.href = '/add'}
//             className="inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white px-12 sm:px-16 md:px-20 py-8 sm:py-10 rounded-2xl sm:rounded-3xl font-black text-2xl sm:text-3xl shadow-2xl hover:shadow-3xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:scale-[1.02] sm:hover:scale-[1.05] border-4 sm:border-8 border-orange-400/30 animate-pulse w-full sm:w-auto max-w-sm sm:max-w-md mx-auto"
//           >
//             💪 Log Workout Today
//             <span className="text-3xl sm:text-4xl">🔥</span>
//           </button>
//           <p className="text-lg sm:text-xl md:text-xl text-gray-600 mt-6 sm:mt-8 font-semibold px-4 max-w-md mx-auto">
//             Keep the fire burning! Don't break the streak
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
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
