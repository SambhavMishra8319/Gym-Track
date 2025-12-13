// // // // // // // // import React, { useState } from "react";
// // // // // // // // import { Link, useLocation } from "react-router-dom";
// // // // // // // // import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// // // // // // // // import Navbar from "../components/Navbar";
// // // // // // // // import Footer from "../components/Footer";

// // // // // // // // export default function MainLayout({ children }) {
// // // // // // // //   const location = useLocation();
// // // // // // // //   const [open, setOpen] = useState(false);
// // // // // // // //   const [theme, setTheme] = useState("light");

// // // // // // // //   const toggleTheme = () =>
// // // // // // // //     setTheme((prev) => (prev === "light" ? "dark" : "light"));

// // // // // // // //   const isActive = (path) => location.pathname === path;

// // // // // // // //   return (
// // // // // // // //     <div className={theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}>

// // // // // // // //       {/* ===== FIXED NAVBAR (Always top) ===== */}
// // // // // // // //       <div className="fixed top-0 left-0 right-0 z-40 hidden md:block">
// // // // // // // //         <Navbar
// // // // // // // //           title="FitTrack"
// // // // // // // //           onMenuClick={() => setOpen(!open)}
// // // // // // // //           toggleTheme={toggleTheme}
// // // // // // // //           theme={theme}
// // // // // // // //         />
// // // // // // // //       </div>

// // // // // // // //       {/* ===== MOBILE TOP BAR ===== */}
// // // // // // // //       <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-50">
// // // // // // // //         <h1 className="text-2xl font-bold text-blue-600">FitTrack</h1>
// // // // // // // //         <button onClick={() => setOpen(!open)}>
// // // // // // // //           {open ? <HiOutlineX size={30} /> : <HiOutlineMenu size={30} />}
// // // // // // // //         </button>
// // // // // // // //       </div>

// // // // // // // //       {/* ===== MOBILE OVERLAY ===== */}
// // // // // // // //       {open && (
// // // // // // // //         <div
// // // // // // // //           className="fixed inset-0 bg-black/40 z-40 md:hidden"
// // // // // // // //           onClick={() => setOpen(false)}
// // // // // // // //         />
// // // // // // // //       )}

// // // // // // // //       {/* ===== SIDEBAR ===== */}
// // // // // // // //       <div
// // // // // // // //         className={`
// // // // // // // //           fixed md:static top-0 left-0 h-full bg-white shadow-lg p-5 flex flex-col gap-5
// // // // // // // //           transform transition-transform duration-300 ease-in-out
// // // // // // // //           w-64 z-50
// // // // // // // //           ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
// // // // // // // //         `}
// // // // // // // //       >
// // // // // // // //         <h1 className="text-2xl font-bold text-blue-600 hidden md:block">
// // // // // // // //           FitTrack
// // // // // // // //         </h1>

// // // // // // // //         <nav className="flex flex-col gap-3 mt-6 text-lg">
// // // // // // // //           {/* links copy from your version */}
// // // // // // // //           {[
// // // // // // // //             ["/", "🏠 Dashboard"],
// // // // // // // //             ["/add", "➕ Add Workout"],
// // // // // // // //             ["/history", "📜 History"],
// // // // // // // //             ["/templates", "📁 Templates"],
// // // // // // // //             ["/analytics", "📊 Analytics"],
// // // // // // // //             ["/profile", "👤 Profile"],
// // // // // // // //             ["/achievements", "🥇 Achievements"],
// // // // // // // //             ["/streaks", "🔥 Streaks"],
// // // // // // // //             ["/settings", "⚙️ Settings"],
// // // // // // // //           ].map(([to, label]) => (
// // // // // // // //             <Link
// // // // // // // //               key={to}
// // // // // // // //               className={`p-2 rounded hover:bg-gray-200 ${
// // // // // // // //                 isActive(to) ? "bg-blue-500 text-white shadow" : ""
// // // // // // // //               }`}
// // // // // // // //               to={to}
// // // // // // // //               onClick={() => setOpen(false)}
// // // // // // // //             >
// // // // // // // //               {label}
// // // // // // // //             </Link>
// // // // // // // //           ))}
// // // // // // // //         </nav>
// // // // // // // //       </div>

// // // // // // // //       {/* ===== MAIN CONTENT AREA ===== */}
// // // // // // // //       <div className="flex-1 overflow-y-auto md:ml-64 pt-20 md:pt-20 p-6">
// // // // // // // //         {children}
// // // // // // // //         <Footer />
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // import React, { useState } from "react";
// // // // // // // import { Link, useLocation } from "react-router-dom";
// // // // // // // import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// // // // // // // import Navbar from "../components/Navbar";
// // // // // // // import Footer from "../components/Footer";

// // // // // // // export default function MainLayout({ children }) {
// // // // // // //   const location = useLocation();
// // // // // // //   const [open, setOpen] = useState(false);
// // // // // // //   const [theme, setTheme] = useState("light");

// // // // // // //   const toggleTheme = () =>
// // // // // // //     setTheme((prev) => (prev === "light" ? "dark" : "light"));

// // // // // // //   const isActive = (path) => location.pathname === path;

// // // // // // //   return (
// // // // // // //     <div className={`min-h-screen ${theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>

// // // // // // //       {/* ===== FIXED NAVBAR (Always top) ===== */}
// // // // // // //       <div className="fixed top-0 left-0 right-0 z-40 hidden md:block">
// // // // // // //         <Navbar
// // // // // // //           title="FitTrack"
// // // // // // //           onMenuClick={() => setOpen(!open)}
// // // // // // //           toggleTheme={toggleTheme}
// // // // // // //           theme={theme}
// // // // // // //         />
// // // // // // //       </div>

// // // // // // //       {/* ===== MOBILE TOP BAR ===== */}
// // // // // // //       <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-50">
// // // // // // //         <h1 className="text-2xl font-bold text-blue-600">FitTrack</h1>
// // // // // // //         <button onClick={() => setOpen(!open)}>
// // // // // // //           {open ? <HiOutlineX size={30} /> : <HiOutlineMenu size={30} />}
// // // // // // //         </button>
// // // // // // //       </div>

// // // // // // //       {/* ===== MOBILE OVERLAY ===== */}
// // // // // // //       {open && (
// // // // // // //         <div
// // // // // // //           className="fixed inset-0 bg-black/40 z-40 md:hidden"
// // // // // // //           onClick={() => setOpen(false)}
// // // // // // //         />
// // // // // // //       )}

// // // // // // //       {/* ===== SIDEBAR ===== */}
// // // // // // //       <div
// // // // // // //         className={`
// // // // // // //           fixed md:static top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg p-5 flex flex-col gap-5
// // // // // // //           transform transition-transform duration-300 ease-in-out
// // // // // // //           w-64 z-50
// // // // // // //           ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
// // // // // // //         `}
// // // // // // //       >
// // // // // // //         <h1 className="text-2xl font-bold text-blue-600 hidden md:block">
// // // // // // //           FitTrack
// // // // // // //         </h1>

// // // // // // //         <nav className="flex flex-col gap-3 mt-6 text-lg">
// // // // // // //           {[
// // // // // // //             ["/", "🏠 Dashboard"],
// // // // // // //             ["/add", "➕ Add Workout"],
// // // // // // //             ["/history", "📜 History"],
// // // // // // //             ["/templates", "📁 Templates"],
// // // // // // //             ["/analytics", "📊 Analytics"],
// // // // // // //             ["/profile", "👤 Profile"],
// // // // // // //             ["/achievements", "🥇 Achievements"],
// // // // // // //             ["/streaks", "🔥 Streaks"],
// // // // // // //             ["/settings", "⚙️ Settings"],
// // // // // // //           ].map(([to, label]) => (
// // // // // // //             <Link
// // // // // // //               key={to}
// // // // // // //               className={`p-2 rounded hover:bg-gray-200 ${
// // // // // // //                 isActive(to) ? "bg-blue-500 text-white shadow" : ""
// // // // // // //               }`}
// // // // // // //               to={to}
// // // // // // //               onClick={() => setOpen(false)}
// // // // // // //             >
// // // // // // //               {label}
// // // // // // //             </Link>
// // // // // // //           ))}
// // // // // // //         </nav>
// // // // // // //       </div>

// // // // // // //       {/* ===== MAIN CONTENT AREA ===== */}
// // // // // // //       <div className="flex-1 overflow-y-auto md:ml-64 pt-24 md:pt-20 p-6">
// // // // // // //         {children}
// // // // // // //         <Footer />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // import React, { useState } from "react";
// // // // // // import { Link, useLocation } from "react-router-dom";
// // // // // // import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// // // // // // import Navbar from "../components/Navbar";
// // // // // // import Footer from "../components/Footer";

// // // // // // export default function MainLayout({ children }) {
// // // // // //   const location = useLocation();
// // // // // //   const [open, setOpen] = useState(false);
// // // // // //   const [theme, setTheme] = useState("light");

// // // // // //   const toggleTheme = () =>
// // // // // //     setTheme((prev) => (prev === "light" ? "dark" : "light"));

// // // // // //   const isActive = (path) => location.pathname === path;

// // // // // //   return (
// // // // // //     <div className={`min-h-screen ${theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>

// // // // // //       {/* ===== FIXED NAVBAR (Always top) ===== */}
// // // // // //       <div className="fixed top-0 left-0 right-0 z-40 hidden md:block">
// // // // // //         <Navbar
// // // // // //           title="FitTrack"
// // // // // //           onMenuClick={() => setOpen(!open)}
// // // // // //           toggleTheme={toggleTheme}
// // // // // //           theme={theme}
// // // // // //         />
// // // // // //       </div>

// // // // // //       {/* ===== MOBILE TOP BAR ===== */}
// // // // // //       <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-50">
// // // // // //         <h1 className="text-2xl font-bold text-blue-600">FitTrack</h1>
// // // // // //         <button onClick={() => setOpen(!open)}>
// // // // // //           {open ? <HiOutlineX size={30} /> : <HiOutlineMenu size={30} />}
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       {/* ===== MOBILE OVERLAY ===== */}
// // // // // //       {open && (
// // // // // //         <div
// // // // // //           className="fixed inset-0 bg-black/40 z-40 md:hidden"
// // // // // //           onClick={() => setOpen(false)}
// // // // // //         />
// // // // // //       )}

// // // // // //       {/* ===== SIDEBAR ===== */}
// // // // // //       <div
// // // // // //         className={`
// // // // // //           fixed md:static top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg p-5 flex flex-col gap-5
// // // // // //           transform transition-transform duration-300 ease-in-out
// // // // // //           w-64 z-50
// // // // // //           ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
// // // // // //         `}
// // // // // //       >
// // // // // //         <h1 className="text-2xl font-bold text-blue-600 hidden md:block">
// // // // // //           FitTrack
// // // // // //         </h1>

// // // // // //         <nav className="flex flex-col gap-3 mt-6 text-lg">
// // // // // //           {[
// // // // // //             ["/", "🏠 Dashboard"],
// // // // // //             ["/add", "➕ Add Workout"],
// // // // // //             ["/history", "📜 History"],
// // // // // //             ["/templates", "📁 Templates"],
// // // // // //             ["/analytics", "📊 Analytics"],
// // // // // //             ["/profile", "👤 Profile"],
// // // // // //             ["/achievements", "🥇 Achievements"],
// // // // // //             ["/streaks", "🔥 Streaks"],
// // // // // //             ["/settings", "⚙️ Settings"],
// // // // // //           ].map(([to, label]) => (
// // // // // //             <Link
// // // // // //               key={to}
// // // // // //               className={`p-2 rounded hover:bg-gray-200 ${
// // // // // //                 isActive(to) ? "bg-blue-500 text-white shadow" : ""
// // // // // //               }`}
// // // // // //               to={to}
// // // // // //               onClick={() => setOpen(false)}
// // // // // //             >
// // // // // //               {label}
// // // // // //             </Link>
// // // // // //           ))}
// // // // // //         </nav>
// // // // // //       </div>

// // // // // //       {/* ===== MAIN CONTENT AREA ===== */}
// // // // // //       <div className="flex-1 overflow-y-auto md:ml-64 pt-24 md:pt-20 p-6">
// // // // // //         {children}
// // // // // //         <Footer />
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // import React, { useState } from "react";
// // // // // import { Link, useLocation } from "react-router-dom";
// // // // // import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// // // // // import Navbar from "../components/Navbar";
// // // // // import Footer from "../components/Footer";

// // // // // export default function MainLayout({ children }) {
// // // // //   const location = useLocation();
// // // // //   const [open, setOpen] = useState(false);
// // // // //   const [theme, setTheme] = useState("light");

// // // // //   const toggleTheme = () =>
// // // // //     setTheme((prev) => (prev === "light" ? "dark" : "light"));

// // // // //   const isActive = (path) => location.pathname === path;

// // // // //   return (
// // // // //     <div className={`min-h-screen flex ${theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      
// // // // //       {/* ===== SIDEBAR ===== */}
// // // // //       <div className={`
// // // // //         fixed md:static top-0 left-0 h-screen bg-white shadow-lg p-5 flex flex-col gap-5
// // // // //         transform transition-transform duration-300 ease-in-out
// // // // //         w-64 z-50
// // // // //         ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
// // // // //       `}>
// // // // //         <h1 className="text-2xl font-bold text-blue-600 hidden md:block">
// // // // //           FitTrack
// // // // //         </h1>

// // // // //         <nav className="flex flex-col gap-3 mt-6 text-lg">
// // // // //           {[
// // // // //             ["/", "🏠 Dashboard"],
// // // // //             ["/add", "➕ Add Workout"],
// // // // //             ["/history", "📜 History"],
// // // // //             ["/templates", "📁 Templates"],
// // // // //             ["/analytics", "📊 Analytics"],
// // // // //             ["/profile", "👤 Profile"],
// // // // //             ["/achievements", "🥇 Achievements"],
// // // // //             ["/streaks", "🔥 Streaks"],
// // // // //             ["/settings", "⚙️ Settings"],
// // // // //           ].map(([to, label]) => (
// // // // //             <Link
// // // // //               key={to}
// // // // //               className={`p-2 rounded hover:bg-gray-200 ${
// // // // //                 isActive(to) ? "bg-blue-500 text-white shadow" : ""
// // // // //               }`}
// // // // //               to={to}
// // // // //               onClick={() => setOpen(false)}
// // // // //             >
// // // // //               {label}
// // // // //             </Link>
// // // // //           ))}
// // // // //         </nav>
// // // // //       </div>

// // // // //       {/* ===== MAIN AREA ===== */}
// // // // //       <div className="flex-1 flex flex-col min-h-screen md:ml-64">
// // // // //         {/* Navbar */}
// // // // //         <div className="fixed top-0 left-0 right-0 md:static z-40">
// // // // //           <div className="hidden md:block">
// // // // //             <Navbar
// // // // //               title="FitTrack"
// // // // //               onMenuClick={() => setOpen(!open)}
// // // // //               toggleTheme={toggleTheme}
// // // // //               theme={theme}
// // // // //             />
// // // // //           </div>
// // // // //           <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-50">
// // // // //             <h1 className="text-2xl font-bold text-blue-600">FitTrack</h1>
// // // // //             <button onClick={() => setOpen(!open)}>
// // // // //               {open ? <HiOutlineX size={30} /> : <HiOutlineMenu size={30} />}
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Mobile overlay */}
// // // // //         {open && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} />}

// // // // //         {/* Main content */}
// // // // //         <main className="flex-1 pt-20 md:pt-4 p-6">
// // // // //           {children}
// // // // //         </main>

// // // // //         <Footer />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // import React, { useState } from "react";
// // // // import { Link, useLocation } from "react-router-dom";
// // // // import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// // // // import Navbar from "../components/Navbar";
// // // // import Footer from "../components/Footer";

// // // // export default function MainLayout({ children }) {
// // // //   const location = useLocation();
// // // //   const [open, setOpen] = useState(false);
// // // //   const [theme, setTheme] = useState("light");

// // // //   const toggleTheme = () =>
// // // //     setTheme((prev) => (prev === "light" ? "dark" : "light"));

// // // //   const isActive = (path) => location.pathname === path;

// // // //   return (
// // // //     <div className={`flex min-h-screen ${theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      
// // // //       {/* ===== SIDEBAR ===== */}
// // // //       <aside className={`
// // // //         fixed md:static top-0 left-0 h-screen bg-white shadow-lg p-5 flex flex-col gap-5
// // // //         w-64 z-50 transform transition-transform duration-300 ease-in-out
// // // //         ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
// // // //       `}>
// // // //         <h1 className="text-2xl font-bold text-blue-600 hidden md:block">FitTrack</h1>
// // // //         <nav className="flex flex-col gap-3 mt-6 text-lg">
// // // //           {[
// // // //             ["/", "🏠 Dashboard"],
// // // //             ["/add", "➕ Add Workout"],
// // // //             ["/history", "📜 History"],
// // // //             ["/templates", "📁 Templates"],
// // // //             ["/analytics", "📊 Analytics"],
// // // //             ["/profile", "👤 Profile"],
// // // //             ["/achievements", "🥇 Achievements"],
// // // //             ["/streaks", "🔥 Streaks"],
// // // //             ["/settings", "⚙️ Settings"],
// // // //           ].map(([to, label]) => (
// // // //             <Link
// // // //               key={to}
// // // //               className={`p-2 rounded hover:bg-gray-200 ${isActive(to) ? "bg-blue-500 text-white shadow" : ""}`}
// // // //               to={to}
// // // //               onClick={() => setOpen(false)}
// // // //             >
// // // //               {label}
// // // //             </Link>
// // // //           ))}
// // // //         </nav>
// // // //       </aside>

// // // //       {/* ===== MAIN CONTENT AREA ===== */}
// // // //       <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        
// // // //         {/* ===== NAVBAR ===== */}
// // // //         <div className="fixed top-0 left-0 right-0 z-40">
// // // //           <div className="hidden md:block">
// // // //             <Navbar
// // // //               title="FitTrack"
// // // //               onMenuClick={() => setOpen(!open)}
// // // //               toggleTheme={toggleTheme}
// // // //               theme={theme}
// // // //             />
// // // //           </div>
// // // //           <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-50">
// // // //             <h1 className="text-2xl font-bold text-blue-600">FitTrack</h1>
// // // //             <button onClick={() => setOpen(!open)}>
// // // //               {open ? <HiOutlineX size={30} /> : <HiOutlineMenu size={30} />}
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* ===== MOBILE OVERLAY ===== */}
// // // //         {open && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setOpen(false)} />}

// // // //         {/* ===== MAIN CONTENT ===== */}
// // // //         <main className="flex-1 pt-24 md:pt-20 p-6">
// // // //           {children}
// // // //         </main>

// // // //         {/* ===== FOOTER ===== */}
// // // //         <Footer />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import React, { useState } from "react";
// // // import { Link, useLocation } from "react-router-dom";
// // // import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// // // import Navbar from "../components/Navbar";
// // // import Footer from "../components/Footer";

// // // export default function MainLayout({ children }) {
// // //   const location = useLocation();
// // //   const [open, setOpen] = useState(false);
// // //   const [theme, setTheme] = useState("light");

// // //   const toggleTheme = () =>
// // //     setTheme((prev) => (prev === "light" ? "dark" : "light"));

// // //   const isActive = (path) => location.pathname === path;

// // //   return (
// // //     <div className={`flex h-screen ${theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>

// // //       {/* ===== SIDEBAR ===== */}
// // //       <aside className={`
// // //         fixed md:static top-0 left-0 h-full md:h-screen bg-white shadow-lg p-5 flex flex-col gap-5
// // //         w-64 z-50 transform transition-transform duration-300 ease-in-out
// // //         ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
// // //       `}>
// // //         <h1 className="text-2xl font-bold text-blue-600 hidden md:block">FitTrack</h1>
// // //         <nav className="flex flex-col gap-3 mt-6 text-lg">
// // //           {[
// // //             ["/", "🏠 Dashboard"],
// // //             ["/add", "➕ Add Workout"],
// // //             ["/history", "📜 History"],
// // //             ["/templates", "📁 Templates"],
// // //             ["/analytics", "📊 Analytics"],
// // //             ["/profile", "👤 Profile"],
// // //             ["/achievements", "🥇 Achievements"],
// // //             ["/streaks", "🔥 Streaks"],
// // //             ["/settings", "⚙️ Settings"],
// // //           ].map(([to, label]) => (
// // //             <Link
// // //               key={to}
// // //               className={`p-2 rounded hover:bg-gray-200 ${isActive(to) ? "bg-blue-500 text-white shadow" : ""}`}
// // //               to={to}
// // //               onClick={() => setOpen(false)}
// // //             >
// // //               {label}
// // //             </Link>
// // //           ))}
// // //         </nav>
// // //       </aside>

// // //       {/* ===== MAIN CONTENT ===== */}
// // //       <div className="flex-1 flex flex-col md:ml-64">
        
// // //         {/* ===== NAVBAR ===== */}
// // //         <div className="fixed top-0 left-0 right-0 z-40">
// // //           <div className="hidden md:block">
// // //             <Navbar
// // //               title="FitTrack"
// // //               onMenuClick={() => setOpen(!open)}
// // //               toggleTheme={toggleTheme}
// // //               theme={theme}
// // //             />
// // //           </div>
// // //           <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-50">
// // //             <h1 className="text-2xl font-bold text-blue-600">FitTrack</h1>
// // //             <button onClick={() => setOpen(!open)}>
// // //               {open ? <HiOutlineX size={30} /> : <HiOutlineMenu size={30} />}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* ===== MOBILE OVERLAY ===== */}
// // //         {open && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setOpen(false)} />}

// // //         {/* ===== SCROLLABLE MAIN CONTENT ===== */}
// // //         <main className="flex-1 overflow-y-auto mt-16 md:mt-0 p-6">
// // //           {children}
// // //         </main>

// // //         <Footer />
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, { useState } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// // import Navbar from "../components/Navbar";
// // import Footer from "../components/Footer";

// // export default function MainLayout({ children }) {
// //   const location = useLocation();
// //   const [open, setOpen] = useState(false);
// //   const [theme, setTheme] = useState("light");

// //   const toggleTheme = () =>
// //     setTheme(prev => (prev === "light" ? "dark" : "light"));

// //   const isActive = (path) => location.pathname === path;

// //   return (
// //     <div className={`flex h-screen ${theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      
// //       {/* ===== SIDEBAR ===== */}
// //       <aside className={`fixed md:static top-0 left-0 h-full md:h-screen bg-white shadow-lg p-5 flex flex-col gap-5 w-64 z-50
// //         transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
// //         <h1 className="text-2xl font-bold text-blue-600 hidden md:block">FitTrack</h1>
// //         <nav className="flex flex-col gap-3 mt-6 text-lg">
// //           {[
// //             ["/", "🏠 Dashboard"],
// //             ["/add", "➕ Add Workout"],
// //             ["/history", "📜 History"],
// //             ["/templates", "📁 Templates"],
// //             ["/analytics", "📊 Analytics"],
// //             ["/profile", "👤 Profile"],
// //             ["/achievements", "🥇 Achievements"],
// //             ["/streaks", "🔥 Streaks"],
// //             ["/settings", "⚙️ Settings"],
// //           ].map(([to, label]) => (
// //             <Link
// //               key={to}
// //               className={`p-2 rounded hover:bg-gray-200 ${isActive(to) ? "bg-blue-500 text-white shadow" : ""}`}
// //               to={to}
// //               onClick={() => setOpen(false)}
// //             >
// //               {label}
// //             </Link>
// //           ))}
// //         </nav>
// //       </aside>

// //       {/* ===== MAIN CONTENT ===== */}
// //       <div className="flex-1 flex flex-col md:ml-64">
        
// //         {/* ===== NAVBAR ===== */}
// //         <div className="fixed top-0 left-0 right-0 z-40">
// //           <div className="hidden md:block">
// //             <Navbar
// //               title="FitTrack"
// //               onMenuClick={() => setOpen(!open)}
// //               toggleTheme={toggleTheme}
// //               theme={theme}
// //             />
// //           </div>
// //           <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-50">
// //             <h1 className="text-2xl font-bold text-blue-600">FitTrack</h1>
// //             <button onClick={() => setOpen(!open)}>
// //               {open ? <HiOutlineX size={30} /> : <HiOutlineMenu size={30} />}
// //             </button>
// //           </div>
// //         </div>

// //         {/* ===== MOBILE OVERLAY ===== */}
// //         {open && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setOpen(false)} />}

// //         {/* ===== SCROLLABLE MAIN CONTENT ===== */}
// //         <main className="flex-1 overflow-y-auto mt-16 md:mt-0 p-6">
// //           {children}
// //         </main>

// //         <Footer />
// //       </div>
// //     </div>
// //   );
// // }
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
//     setTheme(prev => (prev === "light" ? "dark" : "light"));

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div
//       className={`min-h-screen flex ${
//         theme === "dark"
//           ? "dark bg-gray-900 text-white"
//           : "bg-gray-100 text-gray-800"
//       }`}
//     >
//       {/* ===== SIDEBAR ===== */}
//       <aside
//         className={`fixed md:static inset-y-0 left-0 z-50 w-64
//         bg-white dark:bg-gray-800 shadow-lg p-5
//         transform transition-transform duration-300 ease-in-out
//         ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//       >
//         <h1 className="text-2xl font-bold text-blue-600 hidden md:block">
//           FitTrack
//         </h1>

//         <nav className="flex flex-col gap-2 mt-8 text-base">
//           {[
//             ["/", "🏠 Dashboard"],
//             ["/add", "➕ Add Workout"],
//             ["/history", "📜 History"],
//             ["/templates", "📁 Templates"],
//             ["/analytics", "📊 Analytics"],
//             ["/profile", "👤 Profile"],
//             ["/achievements", "🥇 Achievements"],
//             ["/streaks", "🔥 Streaks"],
//             ["/settings", "⚙️ Settings"],
//           ].map(([to, label]) => (
//             <Link
//               key={to}
//               to={to}
//               onClick={() => setOpen(false)}
//               className={`px-3 py-2 rounded-md transition
//                 hover:bg-gray-200 dark:hover:bg-gray-700
//                 ${isActive(to)
//                   ? "bg-blue-500 text-white shadow"
//                   : ""
//                 }`}
//             >
//               {label}
//             </Link>
//           ))}
//         </nav>
//       </aside>

//       {/* ===== OVERLAY (MOBILE) ===== */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* ===== MAIN AREA ===== */}
//       <div className="flex-1 flex flex-col md:ml-64">
//         {/* ===== NAVBAR ===== */}
//         <header className="fixed top-0 left-0 right-0 z-40">
//           {/* Desktop */}
//           <div className="hidden md:block">
//             <Navbar
//               title="FitTrack"
//               onMenuClick={() => setOpen(!open)}
//               toggleTheme={toggleTheme}
//               theme={theme}
//             />
//           </div>

//           {/* Mobile */}
//           <div className="md:hidden bg-white dark:bg-gray-800 shadow px-4 py-3 flex justify-between items-center">
//             <h1 className="text-xl font-bold text-blue-600">FitTrack</h1>
//             <button onClick={() => setOpen(!open)}>
//               {open ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
//             </button>
//           </div>
//         </header>

//         {/* ===== CONTENT ===== */}
//         {/* <main className="flex-1 pt-16 md:pt-20 px-4 sm:px-6 overflow-y-auto">
//           {children}
//         </main> */}
//         <main
//   className="
//     flex-1
//     overflow-y-auto
//     pt-16 md:pt-20
//     px-4 sm:px-6
//     bg-gray-100 dark:bg-gray-900
//   "
// >
//   {children}
// </main>


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
    setTheme(prev => (prev === "light" ? "dark" : "light"));

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`min-h-screen flex ${
        theme === "dark"
          ? "dark bg-gray-900 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64
        bg-white dark:bg-gray-800 shadow-lg p-5
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h1 className="text-2xl font-bold text-blue-600 hidden md:block">
          FitTrack
        </h1>

        <nav className="flex flex-col gap-2 mt-8 text-base">
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
              to={to}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-md transition
                hover:bg-gray-200 dark:hover:bg-gray-700
                ${isActive(to) ? "bg-blue-500 text-white shadow" : ""}
              `}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ===== MOBILE OVERLAY ===== */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ===== MAIN AREA ===== */}
      {/* ❌ NO md:ml-64 here */}
      <div className="flex-1 flex flex-col">
        {/* ===== NAVBAR ===== */}
        <header className="fixed top-0 left-0 right-0 z-40">
          {/* Desktop Navbar */}
          <div className="hidden md:block">
            <Navbar
              title="FitTrack"
              onMenuClick={() => setOpen(!open)}
              toggleTheme={toggleTheme}
              theme={theme}
            />
          </div>

          {/* Mobile Navbar */}
          <div className="md:hidden bg-white dark:bg-gray-800 shadow px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">FitTrack</h1>
            <button onClick={() => setOpen(!open)}>
              {open ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
            </button>
          </div>
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <main
          className="
            flex-1
            overflow-y-auto
            pt-16 md:pt-20
            px-4 sm:px-6
            bg-gray-100 dark:bg-gray-900
          "
        >
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
