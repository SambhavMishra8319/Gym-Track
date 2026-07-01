import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  BarChart2, 
  User, 
  FolderOpen,
  PlusCircle 
} from "lucide-react";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pressed, setPressed] = useState(false);

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/analytics", icon: BarChart2, label: "Stats" },
    { to: "/templates", icon: FolderOpen, label: "Templates" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  const handleAddPress = () => {
    setPressed(true);
    navigator.vibrate?.([20, 10, 20]);
    navigate("/add");
    setTimeout(() => setPressed(false), 150);
  };

  return (
    <nav
      className="
        fixed bottom-0 left-0 w-full z-50 md:hidden
        bg-white/98 dark:bg-gray-900/98 backdrop-blur-2xl
        border-t border-gray-200/50 dark:border-gray-800/50
        h-[5.25rem] shadow-[0_-12px_40px_rgba(0,0,0,0.12)]
        supports-[backdrop-filter:blur(40px)]:bg-white/95
      "
      role="navigation"
      aria-label="Primary navigation"
    >
      {/* iPhone X+ safe area */}
      <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-white/90 via-white/50 to-transparent pointer-events-none" />
      
      <div className="relative h-full">
        <ul className="h-full grid grid-cols-5 max-w-sm mx-auto px-1.5">
          {/* LEFT 2 ITEMS */}
          {navItems.slice(0, 2).map(({ to, icon: Icon, label }, index) => {
            const active = location.pathname === to;
            return (
              <li key={to} className="group relative">
                <Link
                  to={to}
                  className={`
                    relative flex flex-col items-center justify-center h-full p-1.5
                    rounded-2xl transition-all duration-250 ease-out hover:scale-[1.03]
                    ${active 
                      ? "scale-[1.08] shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 dark:from-blue-950/50 dark:to-blue-900/50" 
                      : "hover:bg-gray-50/50 active:scale-95 group-hover:shadow-md dark:hover:bg-gray-800/50"
                    }
                  `}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon 
                    size={active ? 26 : 23} 
                    strokeWidth={active ? 2.8 : 2.2}
                    className={`
                      transition-all duration-200
                      ${active ? "drop-shadow-lg shadow-blue-500/25" : "group-hover:drop-shadow-sm"}
                    `}
                  />
                  <span 
                    className={`
                      text-[10px] xs:text-xs font-semibold leading-none tracking-tight mt-0.5
                      px-1 py-0.5 rounded-full backdrop-blur-sm
                      ${active 
                        ? "text-blue-600 bg-blue-100/80 shadow-sm dark:bg-blue-900/60 dark:text-blue-300 drop-shadow-md" 
                        : "text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200 bg-gray-100/60 dark:bg-gray-800/50"
                      }
                    `}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}

          {/* === CLEAN FLOATING ADD BUTTON (CENTER - MOVED DOWN) === */}
          <li className="relative -mt-4 z-10"> {/* -mt-4 moves it DOWN */}
            {/* Glow ring */}
            <div className="
              absolute inset-0 w-20 h-20 rounded-full mx-auto
              bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500
              opacity-30 blur-xl animate-ping-slow pointer-events-none
            " />
            
            <button
              onClick={handleAddPress}
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              onTouchStart={() => setPressed(true)}
              onTouchEnd={() => setPressed(false)}
              className={`
                relative group mx-auto block
                w-16 h-16 rounded-3xl flex items-center justify-center
                bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600
                shadow-2xl border-4 border-white/20
                hover:shadow-[0_20px_40px_rgba(59,130,246,0.4)]
                hover:-translate-y-1 active:translate-y-0 active:scale-95
                transition-all duration-300 ease-out
                backdrop-blur-xl
                ${pressed 
                  ? 'shadow-inner scale-95 border-white/40 ring-4 ring-blue-400/50' 
                  : 'shadow-[0_12px_30px_rgba(59,130,246,0.35)] ring-2 ring-blue-500/20'
                }
              `}
              aria-label="Add new workout"
            >
              <div className={`
                w-10 h-10 rounded-2xl flex items-center justify-center
                backdrop-blur-xl bg-white/20 border border-white/30
                group-hover:bg-white/30 transition-all duration-200
                ${pressed ? 'scale-110 rotate-90' : 'group-hover:scale-110 group-hover:rotate-12'}
              `}>
                <PlusCircle 
                  size={24} 
                  strokeWidth={3} 
                  className={`
                    text-white drop-shadow-lg
                    transition-all duration-200
                    ${pressed ? 'scale-125 rotate-180' : 'group-hover:scale-110'}
                  `}
                />
              </div>
              <div className="
                absolute top-1 left-1 w-3 h-3 bg-gradient-to-r from-white/60 to-transparent
                rounded-full blur-sm animate-shimmer opacity-0 group-hover:opacity-100
              " />
            </button>
          </li>

          {/* RIGHT 2 ITEMS */}
          {navItems.slice(2).map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to;
            return (
              <li key={to} className="group relative">
                <Link
                  to={to}
                  className={`
                    relative flex flex-col items-center justify-center h-full p-1.5
                    rounded-2xl transition-all duration-250 ease-out hover:scale-[1.03]
                    ${active 
                      ? "scale-[1.08] shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 dark:from-blue-950/50 dark:to-blue-900/50" 
                      : "hover:bg-gray-50/50 active:scale-95 group-hover:shadow-md dark:hover:bg-gray-800/50"
                    }
                  `}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon 
                    size={active ? 26 : 23} 
                    strokeWidth={active ? 2.8 : 2.2}
                    className={`
                      transition-all duration-200
                      ${active ? "drop-shadow-lg shadow-blue-500/25" : "group-hover:drop-shadow-sm"}
                    `}
                  />
                  <span 
                    className={`
                      text-[10px] xs:text-xs font-semibold leading-none tracking-tight mt-0.5
                      px-1 py-0.5 rounded-full backdrop-blur-sm
                      ${active 
                        ? "text-blue-600 bg-blue-100/80 shadow-sm dark:bg-blue-900/60 dark:text-blue-300 drop-shadow-md" 
                        : "text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200 bg-gray-100/60 dark:bg-gray-800/50"
                      }
                    `}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Home indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-white/60 rounded-full shadow-sm backdrop-blur" />
      </div>
    </nav>
  );
}
