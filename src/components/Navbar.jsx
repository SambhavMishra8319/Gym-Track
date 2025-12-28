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
