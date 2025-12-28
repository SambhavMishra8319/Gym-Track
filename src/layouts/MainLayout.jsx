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
// // //     setTheme(prev => (prev === "light" ? "dark" : "light"));

// // //   const isActive = (path) => location.pathname === path;

// // //   return (
// // //     <div
// // //       className={`min-h-screen flex ${
// // //         theme === "dark"
// // //           ? "dark bg-gray-900 text-white"
// // //           : "bg-gray-100 text-gray-800"
// // //       }`}
// // //     >
// // //       {/* ===== SIDEBAR ===== */}
// // //       <aside
// // //         className={`fixed md:static inset-y-0 left-0 z-50 w-64
// // //         bg-white dark:bg-gray-800 shadow-lg p-5
// // //         transform transition-transform duration-300 ease-in-out
// // //         ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
// // //       >
// // //         <h1 className="text-2xl font-bold text-blue-600 hidden md:block">
// // //           FitTrack
// // //         </h1>

// // //         <nav className="flex flex-col gap-2 mt-8 text-base">
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
// // //               to={to}
// // //               onClick={() => setOpen(false)}
// // //               className={`px-3 py-2 rounded-md transition
// // //                 hover:bg-gray-200 dark:hover:bg-gray-700
// // //                 ${isActive(to) ? "bg-blue-500 text-white shadow" : ""}
// // //               `}
// // //             >
// // //               {label}
// // //             </Link>
// // //           ))}
// // //         </nav>
// // //       </aside>

// // //       {/* ===== MOBILE OVERLAY ===== */}
// // //       {open && (
// // //         <div
// // //           className="fixed inset-0 bg-black/40 z-40 md:hidden"
// // //           onClick={() => setOpen(false)}
// // //         />
// // //       )}

// // //       {/* ===== MAIN AREA ===== */}
// // //       {/* ❌ NO md:ml-64 here */}
// // //       <div className="flex-1 flex flex-col">
// // //         {/* ===== NAVBAR ===== */}
// // //         <header className="fixed top-0 left-0 right-0 z-40">
// // //           {/* Desktop Navbar */}
// // //           <div className="hidden md:block">
// // //             <Navbar
// // //               title="FitTrack"
// // //               onMenuClick={() => setOpen(!open)}
// // //               toggleTheme={toggleTheme}
// // //               theme={theme}
// // //             />
// // //           </div>

// // //           {/* Mobile Navbar */}
// // //           <div className="md:hidden bg-white dark:bg-gray-800 shadow px-4 py-3 flex justify-between items-center">
// // //             <h1 className="text-xl font-bold text-blue-600">FitTrack</h1>
// // //             <button onClick={() => setOpen(!open)}>
// // //               {open ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
// // //             </button>
// // //           </div>
// // //         </header>

// // //         {/* ===== MAIN CONTENT ===== */}
// // //         <main
// // //           className="
// // //             flex-1
// // //             overflow-y-auto
// // //             pt-16 md:pt-20
// // //             px-4 sm:px-6
// // //             bg-gray-100 dark:bg-gray-900
// // //           "
// // //         >
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
// //     setTheme((prev) => (prev === "light" ? "dark" : "light"));

// //   const isActive = (path) => location.pathname === path;

// //   return (
// //     <div
// //       className={`min-h-screen flex flex-col md:flex-row ${
// //         theme === "dark"
// //           ? "dark bg-gray-900 text-white"
// //           : "bg-gray-100 text-gray-800"
// //       }`}
// //     >
// //       {/* ===== SIDEBAR ===== */}
// //       <aside
// //         className={`
// //           fixed md:static inset-y-0 left-0 z-50 w-64
// //           bg-white dark:bg-gray-800 shadow-lg p-5
// //           transform transition-transform duration-300 ease-in-out
// //           md:translate-x-0
// //           ${open ? "translate-x-0" : "-translate-x-full"}
// //         `}
// //       >
// //         {/* Mobile header inside sidebar */}
// //         <div className="flex items-center justify-between md:hidden mb-4">
// //           <h1 className="text-xl font-bold text-blue-600">FitTrack</h1>
// //           <button onClick={() => setOpen(false)}>
// //             <HiOutlineX size={24} />
// //           </button>
// //         </div>

// //         {/* Desktop logo */}
// //         <h1 className="text-2xl font-bold text-blue-600 hidden md:block">
// //           FitTrack
// //         </h1>

// //         <nav className="flex flex-col gap-2 mt-6 text-base">
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
// //               to={to}
// //               onClick={() => setOpen(false)}
// //               className={`px-3 py-2 rounded-md text-sm sm:text-base transition
// //                 hover:bg-gray-200 dark:hover:bg-gray-700
// //                 ${isActive(to) ? "bg-blue-500 text-white shadow" : ""}
// //               `}
// //             >
// //               {label}
// //             </Link>
// //           ))}
// //         </nav>
// //       </aside>

// //       {/* ===== MOBILE OVERLAY ===== */}
// //       {open && (
// //         <div
// //           className="fixed inset-0 bg-black/40 z-40 md:hidden"
// //           onClick={() => setOpen(false)}
// //         />
// //       )}

// //       {/* ===== MAIN AREA ===== */}
// //       <div className="flex-1 flex flex-col min-h-screen">
// //         {/* ===== NAVBAR =====
// //         <header className="fixed top-0 left-0 right-0 z-40">
// //           {/* Desktop Navbar */}
// //           <div className="hidden md:block">
// //             <Navbar
// //               title="FitTrack"
// //               onMenuClick={() => setOpen(!open)}
// //               toggleTheme={toggleTheme}
// //               theme={theme}
// //               user={user}
// //             />
// //           </div>

// //           {/* Mobile Navbar */}
// //           <div className="md:hidden bg-white dark:bg-gray-800 shadow px-4 py-3 flex justify-between items-center">
// //             <h1 className="text-xl font-bold text-blue-600">FitTrack</h1>
// //             <div className="flex items-center gap-3">
// //               {/* Optional theme toggle on mobile */}
// //               <button
// //                 onClick={toggleTheme}
// //                 className="text-sm px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600"
// //               >
// //                 {theme === "light" ? "Dark" : "Light"}
// //               </button>
// //               <button onClick={() => setOpen(!open)}>
// //                 {open ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
// //               </button>
// //             </div>
// //           </div>
// //         </header> */}

// //         {/* ===== MAIN CONTENT =====
// //         <main
// //           className="
// //             flex-1
// //             overflow-y-auto
// //             pt-16 md:pt-20
// //             pb-16
// //             px-3 xs:px-4 sm:px-6 lg:px-8
// //             bg-gray-100 dark:bg-gray-900
// //           "
// //         >
// //           <div className="max-w-5xl mx-auto">{children}</div>
// //         </main> */}
// // // in MainLayout.jsx

// // <main
// //   className="
// //     flex-1
// //     overflow-y-auto
// //     pt-16 md:pt-20
// //     pb-28 md:pb-6
// //     px-4 sm:px-6
// //     bg-gray-100 dark:bg-gray-900
// //   "
// // >
// //   {children}
// // </main>

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

// export default function MainLayout({ children, user }) {  // ← ADD user prop
//   const location = useLocation();
//   const [open, setOpen] = useState(false);
//   const [theme, setTheme] = useState("light");

//   const toggleTheme = () =>
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div
//       className={`min-h-screen flex flex-col md:flex-row ${
//         theme === "dark"
//           ? "dark bg-gray-900 text-white"
//           : "bg-gray-100 text-gray-800"
//       }`}
//     >
//       {/* ===== SIDEBAR ===== */}
//       <aside
//         className={`
//           fixed md:static inset-y-0 left-0 z-50 w-64
//           bg-white dark:bg-gray-800 shadow-lg p-5
//           transform transition-transform duration-300 ease-in-out
//           md:translate-x-0
//           ${open ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         {/* Mobile header inside sidebar */}
//         <div className="flex items-center justify-between md:hidden mb-4">
//           <h1 className="text-xl font-bold text-blue-600">FitTrack</h1>
//           <button onClick={() => setOpen(false)}>
//             <HiOutlineX size={24} />
//           </button>
//         </div>

//         {/* Desktop logo */}
//         <h1 className="text-2xl font-bold text-blue-600 hidden md:block">
//           FitTrack
//         </h1>

//         <nav className="flex flex-col gap-2 mt-6 text-base">
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
//               className={`px-3 py-2 rounded-md text-sm sm:text-base transition
//                 hover:bg-gray-200 dark:hover:bg-gray-700
//                 ${isActive(to) ? "bg-blue-500 text-white shadow" : ""}
//               `}
//             >
//               {label}
//             </Link>
//           ))}
//         </nav>
//       </aside>

//       {/* ===== MOBILE OVERLAY ===== */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* ===== MAIN AREA ===== */}
//       <div className="flex-1 flex flex-col min-h-screen">
//         {/* ===== NAVBAR ===== */}
//         <header className="fixed top-0 left-0 right-0 z-40">
//           {/* Desktop Navbar */}
//           <div className="hidden md:block">
//             <Navbar
//               title="FitTrack"
//               onMenuClick={() => setOpen(!open)}
//               toggleTheme={toggleTheme}
//               theme={theme}
//               user={user}  // ✅ FIXED: Pass user prop
//             />
//           </div>

//           {/* Mobile Navbar */}
//           <div className="md:hidden bg-white dark:bg-gray-800 shadow px-4 py-3 flex justify-between items-center">
//             <h1 className="text-xl font-bold text-blue-600">FitTrack</h1>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={toggleTheme}
//                 className="text-sm px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600"
//               >
//                 {theme === "light" ? "Dark" : "Light"}
//               </button>
//               <button onClick={() => setOpen(!open)}>
//                 {open ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* ===== MAIN CONTENT ===== */}
//         <main
//           className="
//             flex-1
//             overflow-y-auto
//             pt-16 md:pt-20
//             pb-28 md:pb-6
//             px-4 sm:px-6
//             bg-gray-100 dark:bg-gray-900
//           "
//         >
//           <div className="max-w-5xl mx-auto">{children}</div>
//         </main>

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

export default function MainLayout({ children, user }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row ${
        theme === "dark"
          ? "dark bg-gray-900 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 w-64
          bg-white dark:bg-gray-800 shadow-lg p-5
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between md:hidden mb-4">
          <h1 className="text-xl font-bold text-blue-600">FitTrack</h1>
          <button onClick={() => setOpen(false)}>
            <HiOutlineX size={24} />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-blue-600 hidden md:block">
          FitTrack
        </h1>

        <nav className="flex flex-col gap-2 mt-6 text-base">
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
              className={`px-3 py-2 rounded-md text-sm sm:text-base transition
                hover:bg-gray-200 dark:hover:bg-gray-700
                ${isActive(to) ? "bg-blue-500 text-white shadow" : ""}
              `}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        {/* NAVBAR */}
        <header className="fixed top-0 left-0 right-0 z-40">
          <div className="hidden md:block">
            <Navbar
              title="FitTrack"
              onMenuClick={() => setOpen(!open)}
              toggleTheme={toggleTheme}
              theme={theme}
              user={user}
            />
          </div>

          <div className="md:hidden bg-white dark:bg-gray-800 shadow px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">FitTrack</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="text-sm px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600"
              >
                {theme === "light" ? "Dark" : "Light"}
              </button>
              <button onClick={() => setOpen(!open)}>
                {open ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
              </button>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main
          className="
            flex-1
            overflow-y-auto
            pt-16 md:pt-20
            pb-28 md:pb-6
            px-4 sm:px-6
            bg-gray-100 dark:bg-gray-900
          "
        >
          <div className="max-w-5xl mx-auto">{children}</div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
