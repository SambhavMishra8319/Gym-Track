// // import React, { useEffect, useState } from "react";
// // import { Bell, Search, Flame, Menu } from "lucide-react";

// // export default function Navbar({
// //   title = "FitTrack",
// //   onTodayClick,
// //   onMenuClick,
// //   toggleTheme, // add this
// //   theme, // add this
// // }) {
// //   const [streak, setStreak] = useState(0);

// //   useEffect(() => {
// //     const storedStreak = Number(localStorage.getItem("streak")) || 0;
// //     const lastOpen = localStorage.getItem("lastOpen");
// //     const today = new Date().toDateString();

// //     if (lastOpen === today) {
// //       setStreak(storedStreak);
// //     } else {
// //       const newStreak = storedStreak + 1;
// //       setStreak(newStreak);
// //       localStorage.setItem("streak", newStreak);
// //       localStorage.setItem("lastOpen", today);
// //     }
// //   }, []);

// //   return (
// //     <div className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 h-14 md:h-16 flex items-center px-4 md:px-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
// //       {/* MOBILE MENU BUTTON */}
// //       <button className="md:hidden mr-3" onClick={onMenuClick}>
// //         <Menu size={24} className="text-gray-700" />
// //       </button>

// //       {/* LOGO */}
// //       <div className="flex items-center gap-2 md:gap-3">
// //         <div className="h-9 w-9 md:h-10 md:w-10 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-inner border border-blue-200">
// //           <span className="text-blue-600 font-bold text-base md:text-lg">
// //             FT
// //           </span>
// //         </div>
// //         <h1 className="text-lg md:text-xl font-semibold text-gray-800 tracking-wide">
// //           {title}
// //         </h1>
// //       </div>

// //       {/* SEARCH BAR (DESKTOP ONLY) */}
// //       <div className="hidden md:flex items-center mx-auto w-1/3">
// //         <div className="flex items-center gap-2 bg-gray-100/80 backdrop-blur-md border border-gray-200 px-3 py-1.5 rounded-xl w-full shadow-inner">
// //           <Search size={18} className="text-gray-500" />
// //           <input
// //             type="text"
// //             placeholder="Search workouts..."
// //             className="bg-transparent w-full outline-none text-sm"
// //           />
// //         </div>
// //       </div>

// //       {/* RIGHT ACTIONS */}
// //       <div className="flex items-center gap-3 md:gap-5 ml-auto">
// //         {/* SEARCH ICON (MOBILE) */}
// //         <button className="block md:hidden">
// //           <Search size={22} className="text-gray-600" />
// //         </button>

// //         {/* Streak */}
// //         <div className="hidden sm:flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-xl shadow-sm">
// //           <Flame size={18} className="text-orange-500" />
// //           <span className="text-orange-600 font-semibold text-xs sm:text-sm">
// //             {streak} days
// //           </span>
// //         </div>

// //         {/* TODAY BUTTON */}
// //         <button
// //           onClick={onTodayClick}
// //           className="hidden md:block px-4 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm"
// //         >
// //           Today
// //         </button>

// //         {/* Notification */}
// //         <button className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
// //           <Bell size={20} className="text-gray-600" />
// //         </button>

// //         {/* THEME TOGGLE */}
// //         {/* <button onClick={toggleTheme} className="px-3 py-1 bg-gray-200 rounded">
// //           {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
// //         </button> */}

// //         {/* Profile */}
// //         <button className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
// //           <img
// //             src="https://ui-avatars.com/api/?name=Sam&rounded=true&background=E0F2FE&color=0284C7"
// //             alt="profile"
// //             className="h-9 w-9 md:h-10 md:w-10 rounded-full"
// //           />
// //         </button>
// //       </div>
// //       <div className="flex items-center gap-2">
// //         {user ? (
// //           <>
// //             <span>Hello, {user.displayName}</span>
// //             <button onClick={logOut} className="px-3 py-1 bg-gray-200 rounded">
// //               Sign Out
// //             </button>
// //           </>
// //         ) : (
// //           <button onClick={signIn} className="px-3 py-1 bg-gray-200 rounded">
// //             Sign In
// //           </button>
// //         )}
// //       </div>

// //     </div>
// //   );
// // }
// import React from "react";
// import { Bell, Search, Flame, Menu } from "lucide-react";
// import { signIn, logOut } from "../firebase";
// import { signInWithGoogle, logOut } from "../config";

// export default function Navbar({ user, onMenuClick, toggleTheme, theme, streak = 0, onTodayClick }) {
//   return (
//     <div className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 h-14 md:h-16 flex items-center px-4 md:px-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
      
//       {/* MOBILE MENU BUTTON */}
//       <button className="md:hidden mr-3" onClick={onMenuClick}>
//         <Menu size={24} className="text-gray-700" />
//       </button>

//       {/* LOGO */}
//       <div className="flex items-center gap-2 md:gap-3">
//         <div className="h-9 w-9 md:h-10 md:w-10 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-inner border border-blue-200">
//           <span className="text-blue-600 font-bold text-base md:text-lg">FT</span>
//         </div>
//         <h1 className="text-lg md:text-xl font-semibold text-gray-800 tracking-wide">FitTrack</h1>
//       </div>

//       {/* SEARCH BAR (DESKTOP ONLY) */}
//       <div className="hidden md:flex items-center mx-auto w-1/3">
//         <div className="flex items-center gap-2 bg-gray-100/80 backdrop-blur-md border border-gray-200 px-3 py-1.5 rounded-xl w-full shadow-inner">
//           <Search size={18} className="text-gray-500" />
//           <input type="text" placeholder="Search workouts..." className="bg-transparent w-full outline-none text-sm" />
//         </div>
//       </div>

//       {/* RIGHT ACTIONS */}
//       <div className="flex items-center gap-3 md:gap-5 ml-auto">
//         {/* Streak */}
//         {streak > 0 && (
//           <div className="hidden sm:flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-xl shadow-sm">
//             <Flame size={18} className="text-orange-500" />
//             <span className="text-orange-600 font-semibold text-xs sm:text-sm">{streak} days</span>
//           </div>
//         )}

//         {/* TODAY BUTTON */}
//         <button onClick={onTodayClick} className="hidden md:block px-4 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm">Today</button>

//         {/* Notification */}
//         <button className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
//           <Bell size={20} className="text-gray-600" />
//         </button>

//         {/* Theme toggle */}
//         <button onClick={toggleTheme} className="px-3 py-1 bg-gray-200 rounded">
//           {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
//         </button>

//         {/* Sign in/out + profile */}
//         {user ? (
//           <>
//             <img
//               src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&rounded=true&background=E0F2FE&color=0284C7`}
//               alt="profile"
//               className="h-9 w-9 md:h-10 md:w-10 rounded-full"
//             />
//             <button onClick={logOut} className="px-3 py-1 bg-gray-200 rounded">Sign Out</button>
//           </>
//         ) : (
//           <button onClick={signIn} className="px-3 py-1 bg-gray-200 rounded">Sign In</button>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { Bell, Search, Flame, Menu } from "lucide-react";
import { auth, signInWithGoogle, logOut } from "../firebase/config";

export default function Navbar({ title = "FitTrack", onTodayClick, onMenuClick, theme, toggleTheme }) {
  const [streak, setStreak] = useState(0);
  const [user, setUser] = useState(null);
  const [profileUrl, setProfileUrl] = useState("");

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (u && u.photoURL) setProfileUrl(u.photoURL);
    });
    return unsubscribe;
  }, []);

  // Streak logic
  useEffect(() => {
    const storedStreak = Number(localStorage.getItem("streak")) || 0;
    const lastOpen = localStorage.getItem("lastOpen");
    const today = new Date().toDateString();

    if (lastOpen === today) {
      setStreak(storedStreak);
    } else {
      const newStreak = storedStreak + 1;
      setStreak(newStreak);
      localStorage.setItem("streak", newStreak);
      localStorage.setItem("lastOpen", today);
    }
  }, []);

  // Profile upload
  // const handleProfileUpload = async (e) => {
  //   if (!user) return alert("Sign in first!");
  //   const file = e.target.files[0];
  //   if (file) {
  //     const url = await uploadProfileImage(file, user.uid);
  //     setProfileUrl(url);
  //   }
  // };

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 h-14 md:h-16 flex items-center px-4 md:px-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
      
      {/* Mobile Menu Button */}
      <button className="md:hidden mr-3" onClick={onMenuClick}>
        <Menu size={24} className="text-gray-700" />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 md:gap-3">
        <div className="h-9 w-9 md:h-10 md:w-10 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-inner border border-blue-200">
          <span className="text-blue-600 font-bold text-base md:text-lg">FT</span>
        </div>
        <h1 className="text-lg md:text-xl font-semibold text-gray-800 tracking-wide">{title}</h1>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center mx-auto w-1/3">
        <div className="flex items-center gap-2 bg-gray-100/80 backdrop-blur-md border border-gray-200 px-3 py-1.5 rounded-xl w-full shadow-inner">
          <Search size={18} className="text-gray-500" />
          <input type="text" placeholder="Search workouts..." className="bg-transparent w-full outline-none text-sm"/>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-5 ml-auto">

        {/* Streak */}
        <div className="hidden sm:flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-xl shadow-sm">
          <Flame size={18} className="text-orange-500" />
          <span className="text-orange-600 font-semibold text-xs sm:text-sm">{streak} days</span>
        </div>

        {/* Today Button */}
        <button onClick={onTodayClick} className="hidden md:block px-4 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm">Today</button>

        {/* Notification */}
        <button className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
          <Bell size={20} className="text-gray-600" />
        </button>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="px-3 py-1 bg-gray-200 rounded">
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        {/* Profile / Auth */}
        {!user ? (
          <button onClick={signInWithGoogle} className="px-3 py-1 bg-blue-500 text-white rounded">Sign In</button>
        ) : (
          <div className="flex items-center gap-2">
            {/* <input type="file" onChange={handleProfileUpload} className="hidden" id="profileUpload" /> */}
            <label htmlFor="profileUpload" className="cursor-pointer">
              <img src={profileUrl || `https://ui-avatars.com/api/?name=${user.displayName}&rounded=true&background=E0F2FE&color=0284C7`} alt="profile" className="h-9 w-9 md:h-10 md:w-10 rounded-full" />
            </label>
            <button onClick={logOut} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
}
