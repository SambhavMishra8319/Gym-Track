// // // // // import React, { useEffect, useState } from "react";
// // // // // import { Bell, Search, Flame, Menu } from "lucide-react";

// // // // // export default function Navbar({
// // // // //   title = "FitTrack",
// // // // //   onTodayClick,
// // // // //   onMenuClick,
// // // // //   toggleTheme, // add this
// // // // //   theme, // add this
// // // // // }) {
// // // // //   const [streak, setStreak] = useState(0);

// // // // //   useEffect(() => {
// // // // //     const storedStreak = Number(localStorage.getItem("streak")) || 0;
// // // // //     const lastOpen = localStorage.getItem("lastOpen");
// // // // //     const today = new Date().toDateString();

// // // // //     if (lastOpen === today) {
// // // // //       setStreak(storedStreak);
// // // // //     } else {
// // // // //       const newStreak = storedStreak + 1;
// // // // //       setStreak(newStreak);
// // // // //       localStorage.setItem("streak", newStreak);
// // // // //       localStorage.setItem("lastOpen", today);
// // // // //     }
// // // // //   }, []);

// // // // //   return (
// // // // //     <div className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 h-14 md:h-16 flex items-center px-4 md:px-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
// // // // //       {/* MOBILE MENU BUTTON */}
// // // // //       <button className="md:hidden mr-3" onClick={onMenuClick}>
// // // // //         <Menu size={24} className="text-gray-700" />
// // // // //       </button>

// // // // //       {/* LOGO */}
// // // // //       <div className="flex items-center gap-2 md:gap-3">
// // // // //         <div className="h-9 w-9 md:h-10 md:w-10 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-inner border border-blue-200">
// // // // //           <span className="text-blue-600 font-bold text-base md:text-lg">
// // // // //             FT
// // // // //           </span>
// // // // //         </div>
// // // // //         <h1 className="text-lg md:text-xl font-semibold text-gray-800 tracking-wide">
// // // // //           {title}
// // // // //         </h1>
// // // // //       </div>

// // // // //       {/* SEARCH BAR (DESKTOP ONLY) */}
// // // // //       <div className="hidden md:flex items-center mx-auto w-1/3">
// // // // //         <div className="flex items-center gap-2 bg-gray-100/80 backdrop-blur-md border border-gray-200 px-3 py-1.5 rounded-xl w-full shadow-inner">
// // // // //           <Search size={18} className="text-gray-500" />
// // // // //           <input
// // // // //             type="text"
// // // // //             placeholder="Search workouts..."
// // // // //             className="bg-transparent w-full outline-none text-sm"
// // // // //           />
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* RIGHT ACTIONS */}
// // // // //       <div className="flex items-center gap-3 md:gap-5 ml-auto">
// // // // //         {/* SEARCH ICON (MOBILE) */}
// // // // //         <button className="block md:hidden">
// // // // //           <Search size={22} className="text-gray-600" />
// // // // //         </button>

// // // // //         {/* Streak */}
// // // // //         <div className="hidden sm:flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-xl shadow-sm">
// // // // //           <Flame size={18} className="text-orange-500" />
// // // // //           <span className="text-orange-600 font-semibold text-xs sm:text-sm">
// // // // //             {streak} days
// // // // //           </span>
// // // // //         </div>

// // // // //         {/* TODAY BUTTON */}
// // // // //         <button
// // // // //           onClick={onTodayClick}
// // // // //           className="hidden md:block px-4 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm"
// // // // //         >
// // // // //           Today
// // // // //         </button>

// // // // //         {/* Notification */}
// // // // //         <button className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
// // // // //           <Bell size={20} className="text-gray-600" />
// // // // //         </button>

// // // // //         {/* THEME TOGGLE */}
// // // // //         {/* <button onClick={toggleTheme} className="px-3 py-1 bg-gray-200 rounded">
// // // // //           {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
// // // // //         </button> */}

// // // // //         {/* Profile */}
// // // // //         <button className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
// // // // //           <img
// // // // //             src="https://ui-avatars.com/api/?name=Sam&rounded=true&background=E0F2FE&color=0284C7"
// // // // //             alt="profile"
// // // // //             className="h-9 w-9 md:h-10 md:w-10 rounded-full"
// // // // //           />
// // // // //         </button>
// // // // //       </div>
// // // // //       <div className="flex items-center gap-2">
// // // // //         {user ? (
// // // // //           <>
// // // // //             <span>Hello, {user.displayName}</span>
// // // // //             <button onClick={logOut} className="px-3 py-1 bg-gray-200 rounded">
// // // // //               Sign Out
// // // // //             </button>
// // // // //           </>
// // // // //         ) : (
// // // // //           <button onClick={signIn} className="px-3 py-1 bg-gray-200 rounded">
// // // // //             Sign In
// // // // //           </button>
// // // // //         )}
// // // // //       </div>

// // // // //     </div>
// // // // //   );
// // // // // }
// // // // import React from "react";
// // // // import { Bell, Search, Flame, Menu } from "lucide-react";
// // // // import { signIn, logOut } from "../firebase";
// // // // import { signInWithGoogle, logOut } from "../config";

// // // // export default function Navbar({ user, onMenuClick, toggleTheme, theme, streak = 0, onTodayClick }) {
// // // //   return (
// // // //     <div className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 h-14 md:h-16 flex items-center px-4 md:px-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
      
// // // //       {/* MOBILE MENU BUTTON */}
// // // //       <button className="md:hidden mr-3" onClick={onMenuClick}>
// // // //         <Menu size={24} className="text-gray-700" />
// // // //       </button>

// // // //       {/* LOGO */}
// // // //       <div className="flex items-center gap-2 md:gap-3">
// // // //         <div className="h-9 w-9 md:h-10 md:w-10 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-inner border border-blue-200">
// // // //           <span className="text-blue-600 font-bold text-base md:text-lg">FT</span>
// // // //         </div>
// // // //         <h1 className="text-lg md:text-xl font-semibold text-gray-800 tracking-wide">FitTrack</h1>
// // // //       </div>

// // // //       {/* SEARCH BAR (DESKTOP ONLY) */}
// // // //       <div className="hidden md:flex items-center mx-auto w-1/3">
// // // //         <div className="flex items-center gap-2 bg-gray-100/80 backdrop-blur-md border border-gray-200 px-3 py-1.5 rounded-xl w-full shadow-inner">
// // // //           <Search size={18} className="text-gray-500" />
// // // //           <input type="text" placeholder="Search workouts..." className="bg-transparent w-full outline-none text-sm" />
// // // //         </div>
// // // //       </div>

// // // //       {/* RIGHT ACTIONS */}
// // // //       <div className="flex items-center gap-3 md:gap-5 ml-auto">
// // // //         {/* Streak */}
// // // //         {streak > 0 && (
// // // //           <div className="hidden sm:flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-xl shadow-sm">
// // // //             <Flame size={18} className="text-orange-500" />
// // // //             <span className="text-orange-600 font-semibold text-xs sm:text-sm">{streak} days</span>
// // // //           </div>
// // // //         )}

// // // //         {/* TODAY BUTTON */}
// // // //         <button onClick={onTodayClick} className="hidden md:block px-4 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm">Today</button>

// // // //         {/* Notification */}
// // // //         <button className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
// // // //           <Bell size={20} className="text-gray-600" />
// // // //         </button>

// // // //         {/* Theme toggle */}
// // // //         <button onClick={toggleTheme} className="px-3 py-1 bg-gray-200 rounded">
// // // //           {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
// // // //         </button>

// // // //         {/* Sign in/out + profile */}
// // // //         {user ? (
// // // //           <>
// // // //             <img
// // // //               src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&rounded=true&background=E0F2FE&color=0284C7`}
// // // //               alt="profile"
// // // //               className="h-9 w-9 md:h-10 md:w-10 rounded-full"
// // // //             />
// // // //             <button onClick={logOut} className="px-3 py-1 bg-gray-200 rounded">Sign Out</button>
// // // //           </>
// // // //         ) : (
// // // //           <button onClick={signIn} className="px-3 py-1 bg-gray-200 rounded">Sign In</button>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import React, { useEffect, useState } from "react";
// // // import { Bell, Search, Flame, Menu } from "lucide-react";
// // // import { auth, signInWithGoogle, logOut } from "../firebase/config";

// // // export default function Navbar({ title = "FitTrack", onTodayClick, onMenuClick, theme, toggleTheme }) {
// // //   const [streak, setStreak] = useState(0);
// // //   const [user, setUser] = useState(null);
// // //   const [profileUrl, setProfileUrl] = useState("");

// // //   // Listen for auth changes
// // //   useEffect(() => {
// // //     const unsubscribe = auth.onAuthStateChanged((u) => {
// // //       setUser(u);
// // //       if (u && u.photoURL) setProfileUrl(u.photoURL);
// // //     });
// // //     return unsubscribe;
// // //   }, []);

// // //   // Streak logic
// // //   useEffect(() => {
// // //     const storedStreak = Number(localStorage.getItem("streak")) || 0;
// // //     const lastOpen = localStorage.getItem("lastOpen");
// // //     const today = new Date().toDateString();

// // //     if (lastOpen === today) {
// // //       setStreak(storedStreak);
// // //     } else {
// // //       const newStreak = storedStreak + 1;
// // //       setStreak(newStreak);
// // //       localStorage.setItem("streak", newStreak);
// // //       localStorage.setItem("lastOpen", today);
// // //     }
// // //   }, []);

// // //   // Profile upload
// // //   // const handleProfileUpload = async (e) => {
// // //   //   if (!user) return alert("Sign in first!");
// // //   //   const file = e.target.files[0];
// // //   //   if (file) {
// // //   //     const url = await uploadProfileImage(file, user.uid);
// // //   //     setProfileUrl(url);
// // //   //   }
// // //   // };

// // //   return (
// // //     <div className="fixed top-0 z-50
// // //   left-0 md:left-64
// // //   right-0
// // //   bg-white/70 backdrop-blur-xl
// // //   border-b border-gray-200
// // //   h-14 md:h-16
// // //   flex items-center
// // //   px-4 md:px-6
// // //   shadow-[0_2px_12px_rgba(0,0,0,0.05)]">

// // //       {/* Mobile Menu Button */}
// // //       <button className="md:hidden mr-3" onClick={onMenuClick}>
// // //         <Menu size={24} className="text-gray-700" />
// // //       </button>

// // //       {/* Logo */}
// // //       <div className="flex items-center gap-2 md:gap-3">
// // //         <div className="h-9 w-9 md:h-10 md:w-10 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-inner border border-blue-200">
// // //           <span className="text-blue-600 font-bold text-base md:text-lg">FT</span>
// // //         </div>
// // //         <h1 className="text-lg md:text-xl font-semibold text-gray-800 tracking-wide">{title}</h1>
// // //       </div>

// // //       {/* Search Bar */}
// // //       <div className="hidden md:flex items-center mx-auto w-1/3">
// // //         <div className="flex items-center gap-2 bg-gray-100/80 backdrop-blur-md border border-gray-200 px-3 py-1.5 rounded-xl w-full shadow-inner">
// // //           <Search size={18} className="text-gray-500" />
// // //           <input type="text" placeholder="Search workouts..." className="bg-transparent w-full outline-none text-sm"/>
// // //         </div>
// // //       </div>

// // //       {/* Right Actions */}
// // //       <div className="flex items-center gap-3 md:gap-5 ml-auto">

// // //         {/* Streak */}
// // //         <div className="hidden sm:flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-xl shadow-sm">
// // //           <Flame size={18} className="text-orange-500" />
// // //           <span className="text-orange-600 font-semibold text-xs sm:text-sm">{streak} days</span>
// // //         </div>

// // //         {/* Today Button */}
// // //         <button onClick={onTodayClick} className="hidden md:block px-4 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm">Today</button>

// // //         {/* Notification */}
// // //         <button className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
// // //           <Bell size={20} className="text-gray-600" />
// // //         </button>

// // //         {/* Theme Toggle */}
// // //         <button onClick={toggleTheme} className="px-3 py-1 bg-gray-200 rounded">
// // //           {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
// // //         </button>

// // //         {/* Profile / Auth */}
// // //         {!user ? (
// // //           <button onClick={signInWithGoogle} className="px-3 py-1 bg-blue-500 text-white rounded">Sign In</button>
// // //         ) : (
// // //           <div className="flex items-center gap-2">
// // //             {/* <input type="file" onChange={handleProfileUpload} className="hidden" id="profileUpload" /> */}
// // //             <label htmlFor="profileUpload" className="cursor-pointer">
// // //               <img src={profileUrl || `https://ui-avatars.com/api/?name=${user.displayName}&rounded=true&background=E0F2FE&color=0284C7`} alt="profile" className="h-9 w-9 md:h-10 md:w-10 rounded-full" />
// // //             </label>
// // //             <button onClick={logOut} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Sign Out</button>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, { useEffect, useState } from "react";
// // import { Bell, Search, Flame, Menu, Sun, Moon } from "lucide-react";
// // import { auth, signInWithGoogle, logOut } from "../firebase/config";

// // export default function Navbar({
// //   title = "FitTrack",
// //   onTodayClick,
// //   onMenuClick,
// //   theme,
// //   toggleTheme,
// // }) {
// //   const [streak, setStreak] = useState(0);
// //   const [user, setUser] = useState(null);
// //   const [profileUrl, setProfileUrl] = useState("");

// //   useEffect(() => {
// //     const unsubscribe = auth.onAuthStateChanged((u) => {
// //       setUser(u);
// //       if (u?.photoURL) setProfileUrl(u.photoURL);
// //     });
// //     return unsubscribe;
// //   }, []);

// //   useEffect(() => {
// //     const storedStreak = Number(localStorage.getItem("streak")) || 0;
// //     const lastOpen = localStorage.getItem("lastOpen");
// //     const today = new Date().toDateString();

// //     if (lastOpen === today) setStreak(storedStreak);
// //     else {
// //       const newStreak = storedStreak + 1;
// //       setStreak(newStreak);
// //       localStorage.setItem("streak", newStreak);
// //       localStorage.setItem("lastOpen", today);
// //     }
// //   }, []);

// //   return (
// //     <div
// //       className="
// //         fixed top-0 z-50
// //         left-0 md:left-64 right-0
// //         h-14 md:h-16
// //         bg-white/80 backdrop-blur-xl
// //         border-b border-gray-200
// //         flex items-center
// //         px-3 sm:px-4 md:px-6
// //         shadow-[0_2px_12px_rgba(0,0,0,0.05)]
// //       "
// //     >
// //       {/* Mobile Menu */}
// //       <button className="md:hidden mr-2" onClick={onMenuClick}>
// //         <Menu size={24} />
// //       </button>

// //       {/* Logo */}
// //       <div className="flex items-center gap-2 min-w-0">
// //         <div className="h-9 w-9 rounded-xl bg-blue-100 flex items-center justify-center">
// //           <span className="text-blue-600 font-bold">FT</span>
// //         </div>
// //         <h1 className="text-sm sm:text-base md:text-lg font-semibold truncate">
// //           {title}
// //         </h1>
// //       </div>

// //       {/* Search (Desktop only) */}
// //       <div className="hidden lg:flex mx-auto w-[320px]">
// //         <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-xl w-full">
// //           <Search size={16} className="text-gray-500" />
// //           <input
// //             type="text"
// //             placeholder="Search workouts..."
// //             className="bg-transparent w-full outline-none text-sm"
// //           />
// //         </div>
// //       </div>

// //       {/* Right Actions */}
// //       <div className="flex items-center gap-2 sm:gap-3 ml-auto">

// //         {/* Streak (hide on small) */}
// //         <div className="hidden md:flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
// //           <Flame size={16} className="text-orange-500" />
// //           <span className="text-xs font-semibold">{streak}</span>
// //         </div>

// //         {/* Today */}
// //         <button
// //           onClick={onTodayClick}
// //           className="hidden lg:block px-3 py-1.5 rounded-lg bg-gray-100 text-sm"
// //         >
// //           Today
// //         </button>

// //         {/* Notification */}
// //         <button className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
// //           <Bell size={18} />
// //         </button>

// //         {/* Theme Toggle */}
// //         <button
// //           onClick={toggleTheme}
// //           className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center"
// //         >
// //           {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
// //         </button>

// //         {/* Auth */}
// //         {!user ? (
// //           <button
// //             onClick={signInWithGoogle}
// //             className="hidden sm:block px-3 py-1 bg-blue-500 text-white rounded text-sm"
// //           >
// //             Sign In
// //           </button>
// //         ) : (
// //           <div className="flex items-center gap-2">
// //             <img
// //               src={
// //                 profileUrl ||
// //                 `https://ui-avatars.com/api/?name=${user.displayName}&rounded=true`
// //               }
// //               alt="profile"
// //               className="h-8 w-8 rounded-full"
// //             />
// //             <button
// //               onClick={logOut}
// //               className="hidden sm:block px-2 py-1 bg-red-500 text-white rounded text-xs"
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { Bell, Search, Flame, Menu } from "lucide-react";
// import { auth, signInWithGoogle, logOut } from "../firebase/config";

// export default function Navbar({ title = "FitTrack", onTodayClick, onMenuClick, theme, toggleTheme }) {
//   const [streak, setStreak] = useState(0);
//   const [user, setUser] = useState(null);
//   const [profileUrl, setProfileUrl] = useState("");

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((u) => {
//       setUser(u);
//       if (u && u.photoURL) setProfileUrl(u.photoURL);
//     });
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     const storedStreak = Number(localStorage.getItem("streak")) || 0;
//     const lastOpen = localStorage.getItem("lastOpen");
//     const today = new Date().toDateString();

//     if (lastOpen === today) setStreak(storedStreak);
//     else {
//       const newStreak = storedStreak + 1;
//       setStreak(newStreak);
//       localStorage.setItem("streak", newStreak);
//       localStorage.setItem("lastOpen", today);
//     }
//   }, []);

//   return (
//     <div className="fixed top-0 z-50 left-0 md:left-64 right-0 bg-white/70 backdrop-blur-xl border-b border-gray-200 h-14 md:h-16 flex items-center px-4 md:px-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">

//       {/* Mobile Menu */}
//       <button className="md:hidden mr-3" onClick={onMenuClick}>
//         <Menu size={28} className="text-gray-700" />
//       </button>

//       {/* Logo */}
//       <div className="flex items-center gap-2 md:gap-3">
//         <div className="h-9 w-9 md:h-10 md:w-10 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-inner border border-blue-200">
//           <span className="text-blue-600 font-bold text-base md:text-lg">FT</span>
//         </div>
//         <h1 className="text-lg md:text-xl font-semibold text-gray-800 tracking-wide">{title}</h1>
//       </div>

//       {/* Search */}
//       <div className="hidden md:flex items-center mx-auto w-1/3">
//         <div className="flex items-center gap-2 bg-gray-100/80 border border-gray-200 px-3 py-1.5 rounded-xl w-full shadow-inner">
//           <Search size={20} className="text-gray-500" />
//           <input type="text" placeholder="Search workouts..." className="bg-transparent w-full outline-none text-sm"/>
//         </div>
//       </div>

//       {/* Right Actions */}
//       <div className="flex items-center gap-4 ml-auto">

//         {/* Streak */}
//         <div className="hidden sm:flex items-center gap-2 bg-orange-50 border border-orange-200 px-3 py-1 rounded-xl shadow-sm">
//           <Flame size={22} className="text-orange-500" />
//           <span className="text-orange-600 font-semibold text-sm">{streak} days</span>
//         </div>

//         {/* Today */}
//         <button onClick={onTodayClick} className="hidden md:block px-4 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm">
//           Today
//         </button>

//         {/* Notification */}
//         <button className="h-10 w-10 md:h-11 md:w-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
//           <Bell size={22} className="text-gray-600" />
//         </button>

//         {/* Theme */}
//         <button onClick={toggleTheme} className="px-3 py-1 bg-gray-200 rounded">
//           {theme === "light" ? "🌙 Dark" : "☀️ Light"}
//         </button>

//         {/* Auth */}
//         {!user ? (
//           <button onClick={signInWithGoogle} className="px-3 py-1 bg-blue-500 text-white rounded">
//             Sign In
//           </button>
//         ) : (
//           <div className="flex items-center gap-3">
//             <img
//               src={profileUrl || `https://ui-avatars.com/api/?name=${user.displayName}&rounded=true`}
//               alt="profile"
//               className="h-10 w-10 md:h-11 md:w-11 rounded-full"
//             />
//             <button onClick={logOut} className="px-3 py-1 bg-red-500 text-white rounded text-sm">
//               Sign Out
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Bell, Search, Flame, Menu, Sun, Moon } from "lucide-react";
import { auth, signInWithGoogle, logOut } from "../firebase/config";

export default function Navbar({ 
  title = "FitTrack", 
  onMenuClick, 
  theme = "light", 
  toggleTheme,
  user 
}) {
  const [streak, setStreak] = useState(0);
  const [profileUrl, setProfileUrl] = useState("");

  // Auth state sync
  useEffect(() => {
    if (!user) return;
    setProfileUrl(user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&rounded=true&size=128&background=3b82f6&color=fff`);
  }, [user]);

  // Streak calculation
  useEffect(() => {
    const storedStreak = Number(localStorage.getItem("streak")) || 0;
    const lastOpen = localStorage.getItem("lastOpen");
    const today = new Date().toDateString();

    if (lastOpen !== today) {
      const newStreak = lastOpen ? storedStreak + 1 : 1;
      setStreak(newStreak);
      localStorage.setItem("streak", newStreak);
      localStorage.setItem("lastOpen", today);
    } else {
      setStreak(storedStreak);
    }
  }, []);

  return (
    <div className={`
      fixed top-0 z-50 left-0 right-0 
      bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl
      border-b border-gray-200/50 dark:border-gray-800/50
      h-14 md:h-16 shadow-[0_4px_20px_rgba(0,0,0,0.08)]
      supports-[backdrop-filter:blur(40px)]:bg-white/98
      ${theme === 'dark' ? 'dark' : ''}
    `}>
      <div className="h-full flex items-center px-3 md:px-6 max-w-7xl mx-auto">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-1 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all"
          aria-label="Open menu"
        >
          <Menu size={24} className="text-gray-700 dark:text-gray-300" />
        </button>

        {/* Logo & Title */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className={`
            h-10 w-10 rounded-2xl flex items-center justify-center shadow-lg
            bg-gradient-to-br from-blue-500 to-blue-600
            border border-white/20 dark:border-gray-800/50
            backdrop-blur-sm
          `}>
            <span className="text-white font-bold text-lg tracking-tight drop-shadow-sm">
              FT
            </span>
          </div>
          <h1 className={`
            text-lg md:text-xl font-bold text-gray-900 dark:text-white
            truncate tracking-tight
            bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200
            bg-clip-text text-transparent
          `}>
            {title}
          </h1>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center mx-auto w-64 max-w-sm flex-shrink-0">
          <div className={`
            flex items-center gap-2.5 bg-white/60 dark:bg-gray-800/60
            border border-gray-200/50 dark:border-gray-700/50
            px-4 py-2 rounded-2xl shadow-sm backdrop-blur-xl
            hover:shadow-md hover:border-gray-300/70 dark:hover:border-gray-600/70
            transition-all duration-200
          `}>
            <Search size={20} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Search workouts..." 
              className="bg-transparent outline-none w-full text-sm text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 md:gap-2 ml-auto">
          {/* Streak (Desktop + Large Mobile) */}
          <div className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-200/50 px-3 py-1.5 rounded-2xl shadow-sm backdrop-blur-sm">
            <Flame size={20} className="text-orange-500 drop-shadow-sm" />
            <span className="text-xs font-bold text-orange-700 dark:text-orange-300">
              {streak}d
            </span>
          </div>

          {/* Notifications */}
          <button className={`
            p-2 rounded-2xl flex items-center justify-center
            hover:bg-gray-100/50 dark:hover:bg-gray-800/50
            active:scale-95 transition-all duration-200 shadow-sm
            relative group
          `}
          aria-label="Notifications"
          >
            <Bell size={22} className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-sm animate-ping" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`
              p-2 rounded-2xl flex items-center justify-center
              hover:bg-gray-100/50 dark:hover:bg-gray-800/50
              active:scale-95 transition-all duration-200 shadow-sm
            `}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon size={22} className="text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun size={22} className="text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {/* Auth */}
          {!user ? (
            <button
              onClick={signInWithGoogle}
              className={`
                px-4 py-1.5 rounded-xl font-medium text-sm
                bg-gradient-to-r from-blue-600 to-blue-700 text-white
                shadow-lg hover:shadow-xl hover:-translate-y-0.5
                active:scale-95 active:translate-y-0
                transition-all duration-200 border border-blue-600/30
              `}
              aria-label="Sign in with Google"
            >
              Sign In
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className={`
                w-10 h-10 rounded-2xl flex items-center justify-center
                bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900
                border-2 border-gray-200/50 dark:border-gray-700/50
                shadow-md hover:shadow-lg transition-all duration-200
                overflow-hidden
              `}>
                <img
                  src={profileUrl}
                  alt=""
                  className="w-8 h-8 rounded-xl object-cover"
                />
              </div>
              <button
                onClick={logOut}
                className={`
                  px-3 py-1.5 rounded-xl font-medium text-xs bg-red-500/90
                  hover:bg-red-600 text-white shadow-md hover:shadow-lg
                  active:scale-95 transition-all duration-200
                `}
                aria-label="Sign out"
              >
                Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
