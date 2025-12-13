
// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// export default function MainLayout({ children }) {
//   const location = useLocation();
//   const [open, setOpen] = useState(false);
//   const [theme, setTheme] = useState("light");

//   const toggleTheme = () =>
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));

//   const isActive = (path) => location.pathname === path;

//   const sidebarWidth = "w-64"; // 16rem

//   return (
//     <div className={theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}>
      
//       {/* MOBILE TOP BAR */}
//       <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-50">
//         <h1 className="text-2xl font-bold text-blue-600">FitTrack</h1>
//         <button onClick={() => setOpen(!open)}>
//           {open ? <HiOutlineX size={30} /> : <HiOutlineMenu size={30} />}
//         </button>
//       </div>

//       {/* BACKDROP OVERLAY (Mobile only) */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* SIDEBAR */}
//       <div
//         className={`
//           fixed md:static top-0 left-0 h-full bg-white shadow-lg p-5 flex flex-col gap-5
//           transform transition-transform duration-300 ease-in-out
//           ${sidebarWidth} z-50
//           ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//         `}
//       >
//         <h1 className="text-2xl font-bold text-blue-600 hidden md:block">
//           FitTrack
//         </h1>

//         <nav className="flex flex-col gap-3 mt-6 text-lg">
//           <Link
//             className={`p-2 rounded hover:bg-gray-200 ${
//               isActive("/") ? "bg-blue-500 text-white shadow" : ""
//             }`}
//             to="/"
//             onClick={() => setOpen(false)}
//           >
//             🏠 Dashboard
//           </Link>
//           <Link
//             className={`p-2 rounded hover:bg-gray-200 ${
//               isActive("/add") ? "bg-blue-500 text-white shadow" : ""
//             }`}
//             to="/add"
//             onClick={() => setOpen(false)}
//           >
//             ➕ Add Workout
//           </Link>
//           <Link
//             className={`p-2 rounded hover:bg-gray-200 ${
//               isActive("/history") ? "bg-blue-500 text-white shadow" : ""
//             }`}
//             to="/history"
//             onClick={() => setOpen(false)}
//           >
//             📜 History
//           </Link>
//           <Link
//             className={`p-2 rounded hover:bg-gray-200 ${
//               isActive("/templates") ? "bg-blue-500 text-white shadow" : ""
//             }`}
//             to="/templates"
//             onClick={() => setOpen(false)}
//           >
//             📁 Templates
//           </Link>
//           {/* <Link
//             className={`p-2 rounded hover:bg-gray-200 ${
//               isActive("/pr") ? "bg-blue-500 text-white shadow" : ""
//             }`}
//             to="/pr"
//             onClick={() => setOpen(false)}
//           >
//             🏆 PR Charts
//           </Link> */}
//           <Link
//             className={`p-2 rounded hover:bg-gray-200 ${
//               isActive("/analytics") ? "bg-blue-500 text-white shadow" : ""
//             }`}
//             to="/analytics"
//             onClick={() => setOpen(false)}
//           >
//             📊 Analytics
//           </Link>
//           <Link
//             className={`p-2 rounded hover:bg-gray-200 ${
//               isActive("/profile") ? "bg-blue-500 text-white shadow" : ""
//             }`}
//             to="/profile"
//             onClick={() => setOpen(false)}
//           >
//             👤 Profile
//           </Link>
//           <Link
//             className={`p-2 rounded hover:bg-gray-200 ${
//               isActive("/achievements") ? "bg-blue-500 text-white shadow" : ""
//             }`}
//             to="/achievements"
//             onClick={() => setOpen(false)}
//           >
//             🥇 Achievements
//           </Link>
//           <Link
//             className={`p-2 rounded hover:bg-gray-200 ${
//               isActive("/streaks") ? "bg-blue-500 text-white shadow" : ""
//             }`}
//             to="/streaks"
//             onClick={() => setOpen(false)}
//           >
//             🔥 Streaks
//           </Link>
//           <Link
//             className={`p-2 rounded hover:bg-gray-200 ${
//               isActive("/settings") ? "bg-blue-500 text-white shadow" : ""
//             }`}
//             to="/settings"
//             onClick={() => setOpen(false)}
//           >
//             ⚙️ Settings
//           </Link>
//         </nav>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className={`flex-1 p-8 overflow-y-auto pt-20 md:pt-16 md:ml-64`}>
//         {/* DESKTOP NAVBAR */}
//         <div className="hidden md:block">
//           <Navbar
//             title="FitTrack"
//             onMenuClick={() => setOpen(!open)}
//             toggleTheme={toggleTheme}
//             theme={theme}
//           />
//         </div>

//         {children}

//         <Footer />
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const isActive = (path) => location.pathname === path;

  return (
    <div className={theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}>

      {/* ===== FIXED NAVBAR (Always top) ===== */}
      <div className="fixed top-0 left-0 right-0 z-40 hidden md:block">
        <Navbar
          title="FitTrack"
          onMenuClick={() => setOpen(!open)}
          toggleTheme={toggleTheme}
          theme={theme}
        />
      </div>

      {/* ===== MOBILE TOP BAR ===== */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-50">
        <h1 className="text-2xl font-bold text-blue-600">FitTrack</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <HiOutlineX size={30} /> : <HiOutlineMenu size={30} />}
        </button>
      </div>

      {/* ===== MOBILE OVERLAY ===== */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full bg-white shadow-lg p-5 flex flex-col gap-5
          transform transition-transform duration-300 ease-in-out
          w-64 z-50
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <h1 className="text-2xl font-bold text-blue-600 hidden md:block">
          FitTrack
        </h1>

        <nav className="flex flex-col gap-3 mt-6 text-lg">
          {/* links copy from your version */}
          {[
            ["/", "🏠 Dashboard"],
            ["/add", "➕ Add Workout"],
            ["/history", "📜 History"],
            ["/templates", "📁 Templates"],
            ["/analytics", "📊 Analytics"],
            ["/profile", "👤 Profile"],
            ["/achievements", "🥇 Achievements"],
            ["/streaks", "🔥 Streaks"],
            ["/settings", "⚙️ Settings"],
          ].map(([to, label]) => (
            <Link
              key={to}
              className={`p-2 rounded hover:bg-gray-200 ${
                isActive(to) ? "bg-blue-500 text-white shadow" : ""
              }`}
              to={to}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="flex-1 overflow-y-auto md:ml-64 pt-20 md:pt-20 p-6">
        {children}
        <Footer />
      </div>
    </div>
  );
}

