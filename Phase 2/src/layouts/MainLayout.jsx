// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// import Footer from "../components/Footer";

// const navItems = [
//   ["/", "🏠", "Dashboard"],
//   ["/add", "➕", "Add Workout"],
//   ["/history", "📜", "History"],
//   ["/templates", "🗓️", "Workout Plans"],
//   ["/progress", "⚖️", "Progress"],
//   ["/analytics", "📊", "Analytics"],
//   ["/profile", "👤", "Profile"],
//   ["/achievements", "🥇", "Achievements"],
//   ["/streaks", "🔥", "Streaks"],
//   ["/settings", "⚙️", "Settings"],
// ];

// const bottomItems = navItems.slice(0, 6);

// export default function MainLayout({ children, user }) {
//   const location = useLocation();
//   const [open, setOpen] = useState(false);
//   const [theme, setTheme] = useState("dark");

//   const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className={`${theme === "dark" ? "dark app-shell" : "min-h-screen bg-slate-100 text-slate-900"}`}>
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex w-[86vw] max-w-72 flex-col border-r border-white/10 bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 md:w-72 md:translate-x-0 md:p-5 ${
//           open ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="mb-5 flex shrink-0 items-center justify-between md:mb-8">
//           <Link to="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-3">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-base font-black shadow-lg shadow-blue-500/30 md:h-12 md:w-12 md:text-lg">
//               FT
//             </div>
//             <div className="min-w-0">
//               <h1 className="truncate text-xl font-black tracking-tight md:text-2xl">FitTrack</h1>
//               <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-300 md:text-xs md:tracking-[0.28em]">Elite Training</p>
//             </div>
//           </Link>
//           <button className="rounded-xl p-2 md:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
//             <HiOutlineX size={24} />
//           </button>
//         </div>

//         <nav className="flex-1 space-y-1 overflow-y-auto pr-1 pb-28 md:pb-4">
//           {navItems.map(([to, icon, label]) => (
//             <Link
//               key={to}
//               to={to}
//               onClick={() => setOpen(false)}
//               className={`sidebar-link ${isActive(to) ? "sidebar-link-active" : ""}`}
//             >
//               <span className="text-lg">{icon}</span>
//               <span className="truncate">{label}</span>
//             </Link>
//           ))}
//         </nav>

//         <div className="hidden shrink-0 rounded-3xl border border-white/10 bg-white/10 p-4 md:block">
//           <p className="text-sm font-bold">Train smarter</p>
//           <p className="mt-1 text-xs text-slate-300">Clean analytics, better progress, responsive anywhere.</p>
//         </div>
//       </aside>

//       {open && <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setOpen(false)} />}

//       <div className="min-h-screen md:pl-72">
//         <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 px-3 py-2.5 backdrop-blur-xl sm:px-4 md:px-8 md:py-3">
//           <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
//             <div className="flex min-w-0 items-center gap-2 sm:gap-3">
//               <button className="rounded-2xl border border-white/10 bg-white/10 p-2.5 text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">
//                 {open ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
//               </button>
//               <div className="min-w-0">
//                 <p className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300 sm:text-xs sm:tracking-[0.24em]">Welcome back</p>
//                 <h2 className="truncate text-base font-black text-white sm:text-lg md:text-2xl">{user?.displayName || "Athlete"}</h2>
//               </div>
//             </div>
//             <button onClick={toggleTheme} className="premium-button-soft !rounded-full !px-3 !py-2 text-xs sm:!px-4 sm:text-sm">
//               {theme === "dark" ? "Light" : "Dark"}
//             </button>
//           </div>
//         </header>

//         <main className="px-3 py-4 pb-28 sm:px-4 sm:py-6 md:px-8 md:py-8 lg:pb-10">
//           <div className="mx-auto w-full max-w-7xl overflow-x-hidden">{children}</div>
//         </main>

//         <Footer />
//       </div>

//       <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/90 px-2 py-2 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden">
//         <div className="grid grid-cols-6 gap-1">
//           {bottomItems.map(([to, icon, label]) => (
//             <Link
//               key={to}
//               to={to}
//               className={`flex min-w-0 flex-col items-center justify-center rounded-2xl px-1 py-2 text-[10px] font-bold transition ${
//                 isActive(to) ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"
//               }`}
//             >
//               <span className="text-base leading-none">{icon}</span>
//               <span className="mt-1 max-w-full truncate">{label.replace("Workout ", "")}</span>
//             </Link>
//           ))}
//         </div>
//       </nav>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  CalendarDays,
  Activity,
  BarChart3,
  Trophy,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
  Flame,
} from "lucide-react";
import Footer from "../components/Footer";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/add", icon: PlusCircle, label: "Log Workout" },
  { path: "/history", icon: History, label: "History" },
  { path: "/templates", icon: CalendarDays, label: "Workout Plans" },
  { path: "/progress", icon: Activity, label: "Progress" },
  { path: "/analytics", icon: BarChart3, label: "Analytics" },
  { path: "/achievements", icon: Trophy, label: "Achievements" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

const bottomItems = navItems.slice(0, 5);

export default function MainLayout({ children, user }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const isActive = (path) => location.pathname === path;

  const profileUrl =
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.displayName || user?.email || "Athlete"
    )}&rounded=true&size=128&background=2563eb&color=fff`;

  return (
    <div
      className={
        theme === "dark"
          ? "dark app-shell"
          : "min-h-screen bg-slate-100 text-slate-900"
      }
    >
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[86vw] max-w-72 flex-col border-r border-white/10 bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 md:w-72 md:translate-x-0 md:p-5 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-5 flex shrink-0 items-center justify-between md:mb-8">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-base font-black shadow-lg shadow-blue-500/30 md:h-12 md:w-12 md:text-lg">
              FT
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-black tracking-tight md:text-2xl">
                FitTrack
              </h1>
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-300 md:text-xs md:tracking-[0.28em]">
                Elite Training
              </p>
            </div>
          </Link>

          <button
            className="rounded-xl p-2 md:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-1 pb-28 md:pb-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`sidebar-link group ${
                  isActive(item.path) ? "sidebar-link-active" : ""
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl transition ${
                    isActive(item.path)
                      ? "bg-white/20 text-white"
                      : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white"
                  }`}
                >
                  <Icon size={19} strokeWidth={2.2} />
                </span>

                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 md:block">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
              <Flame size={19} />
            </div>
            <div>
              <p className="text-sm font-bold">Current Streak</p>
              <p className="text-xs text-slate-300">Keep training daily</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">
            Clean analytics, better progress, responsive anywhere.
          </p>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="min-h-screen md:pl-72">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 px-3 py-2.5 backdrop-blur-xl sm:px-4 md:px-8 md:py-3">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <button
                className="rounded-2xl border border-white/10 bg-white/10 p-2.5 text-white md:hidden"
                onClick={() => setOpen(!open)}
                aria-label="Open menu"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>

              <div className="min-w-0">
                <p className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300 sm:text-xs sm:tracking-[0.24em]">
                  Welcome back
                </p>
                <h2 className="truncate text-base font-black text-white sm:text-lg md:text-2xl">
                  {user?.displayName || "Athlete"}
                </h2>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white shadow-lg transition hover:bg-white/15 active:scale-95"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <Link
                to="/settings"
                className="hidden h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-lg sm:flex"
              >
                <img
                  src={profileUrl}
                  alt="Profile"
                  className="h-8 w-8 rounded-xl object-cover"
                />
              </Link>
            </div>
          </div>
        </header>

        <main className="px-3 py-4 pb-28 sm:px-4 sm:py-6 md:px-8 md:py-8 lg:pb-10">
          <div className="mx-auto w-full max-w-7xl overflow-x-hidden">
            {children}
          </div>
        </main>

        <Footer />
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/90 px-2 py-2 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-5 gap-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex min-w-0 flex-col items-center justify-center rounded-2xl px-1 py-2 text-[10px] font-bold transition ${
                  isActive(item.path)
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} strokeWidth={2.3} />
                <span className="mt-1 max-w-full truncate">
                  {item.label.replace("Workout ", "").replace("Log ", "Log")}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}