// // // // // import React from "react";
// // // // // import { Link, useLocation } from "react-router-dom";
// // // // // import { Home, BarChart2, PlusCircle, User, FolderOpen } from "lucide-react";

// // // // // export default function Footer() {
// // // // //   const location = useLocation();

// // // // //   const navItems = [
// // // // //     { to: "/", icon: <Home size={26} />, label: "Home" },
// // // // //     { to: "/analytics", icon: <BarChart2 size={26} />, label: "Stats" },
// // // // //     { to: "/add", icon: <PlusCircle size={32} />, label: "Add" },
// // // // //     { to: "/templates", icon: <FolderOpen size={26} />, label: "Templates" },
// // // // //     { to: "/profile", icon: <User size={26} />, label: "Profile" },
// // // // //   ];

// // // // //   return (
// // // // //     <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] h-20 flex items-center justify-around z-30 md:hidden">
// // // // //       {navItems.map((item) => (
// // // // //         <Link
// // // // //           key={item.to}
// // // // //           to={item.to}
// // // // //           className={`flex flex-col items-center gap-1 text-sm ${
// // // // //             location.pathname === item.to
// // // // //               ? "text-blue-600 font-semibold"
// // // // //               : "text-gray-500"
// // // // //           }`}
// // // // //         >
// // // // //           {item.icon}
// // // // //           <span>{item.label}</span>
// // // // //         </Link>
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // import React from "react";
// // // // import { Link, useLocation } from "react-router-dom";
// // // // import { Home, BarChart2, PlusCircle, User, FolderOpen } from "lucide-react";

// // // // export default function Footer() {
// // // //   const location = useLocation();

// // // //   const navItems = [
// // // //     { to: "/", icon: Home, label: "Home" },
// // // //     { to: "/analytics", icon: BarChart2, label: "Stats" },
// // // //     { to: "/add", icon: PlusCircle, label: "Add", isPrimary: true },
// // // //     { to: "/templates", icon: FolderOpen, label: "Templates" },
// // // //     { to: "/profile", icon: User, label: "Profile" },
// // // //   ];

// // // //   return (
// // // //     <nav
// // // //       className="
// // // //         fixed bottom-0 left-0 w-full z-30 md:hidden
// // // //         bg-white dark:bg-gray-900
// // // //         border-t border-gray-200 dark:border-gray-800
// // // //         h-16
// // // //       "
// // // //       aria-label="Bottom navigation"
// // // //     >
// // // //       <ul className="h-full grid grid-cols-5 max-w-md mx-auto">
// // // //         {navItems.map(({ to, icon: Icon, label, isPrimary }) => {
// // // //           const active = location.pathname === to;

// // // //           return (
// // // //             <li key={to}>
// // // //               <Link
// // // //                 to={to}
// // // //                 className={`
// // // //                   flex flex-col items-center justify-center
// // // //                   text-[11px] xs:text-xs
// // // //                   ${active ? "text-blue-600 font-semibold" : "text-gray-500 dark:text-gray-400"}
// // // //                 `}
// // // //               >
// // // //                 <div
// // // //                   className={`
// // // //                     flex items-center justify-center
// // // //                     ${isPrimary ? "w-12 h-12 rounded-full -mt-6 bg-blue-600 text-white shadow-lg" : ""}
// // // //                   `}
// // // //                 >
// // // //                   <Icon
// // // //                     className={isPrimary ? "" : "mb-0.5"}
// // // //                     size={isPrimary ? 26 : 22}
// // // //                     strokeWidth={2.1}
// // // //                   />
// // // //                 </div>
// // // //                 {!isPrimary && <span>{label}</span>}
// // // //                 {isPrimary && <span className="text-[11px] mt-0.5">{label}</span>}
// // // //               </Link>
// // // //             </li>
// // // //           );
// // // //         })}
// // // //       </ul>
// // // //     </nav>
// // // //   );
// // // // }
// // // import React, { useState, useEffect } from "react";
// // // import { Link, useLocation, useNavigate } from "react-router-dom";
// // // import { 
// // //   Home, 
// // //   BarChart2, 
// // //   PlusCircle, 
// // //   User, 
// // //   FolderOpen,
// // //   Crown,
// // //   Flame,
// // //   Zap 
// // // } from "lucide-react";

// // // export default function Footer() {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const [pressed, setPressed] = useState(false);
// // //   const [hasNewAchievements, setHasNewAchievements] = useState(true);
// // //   const [streakActive, setStreakActive] = useState(true);

// // //   // Simulate real-time badge states
// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       setHasNewAchievements(Math.random() > 0.7);
// // //       setStreakActive(Math.random() > 0.3);
// // //     }, 8000);
// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   const navItems = [
// // //     { 
// // //       to: "/", 
// // //       icon: Home, 
// // //       label: "Home",
// // //       badge: null,
// // //       notification: false
// // //     },
// // //     { 
// // //       to: "/analytics", 
// // //       icon: BarChart2, 
// // //       label: "Stats",
// // //       badge: hasNewAchievements ? <Crown className="h-3 w-3" /> : null,
// // //       notification: hasNewAchievements
// // //     },
// // //     { 
// // //       to: "/add", 
// // //       icon: PlusCircle, 
// // //       label: "Add", 
// // //       isPrimary: true,
// // //       badge: null
// // //     },
// // //     { 
// // //       to: "/templates", 
// // //       icon: FolderOpen, 
// // //       label: "Templates",
// // //       badge: null,
// // //       notification: false
// // //     },
// // //     { 
// // //       to: "/profile", 
// // //       icon: User, 
// // //       label: "Profile",
// // //       badge: streakActive ? <Flame className="h-3 w-3 animate-pulse" /> : null,
// // //       notification: streakActive
// // //     },
// // //   ];

// // //   const handlePrimaryPress = () => {
// // //     setPressed(true);
// // //     // Haptic feedback simulation
// // //     navigator.vibrate?.(30);
// // //     navigate("/add");
// // //     setTimeout(() => setPressed(false), 150);
// // //   };

// // //   return (
// // //     <nav
// // //       className="
// // //         fixed bottom-0 left-0 w-full z-50 md:hidden
// // //         bg-white/98 dark:bg-gray-900/98 backdrop-blur-2xl
// // //         border-t border-gray-200/50 dark:border-gray-800/50
// // //         h-[5.25rem] shadow-[0_-12px_40px_rgba(0,0,0,0.12)]
// // //         supports-[backdrop-filter:blur(40px)]:bg-white/95
// // //       "
// // //       role="navigation"
// // //       aria-label="Primary navigation"
// // //     >
// // //       {/* iPhone X+ safe area */}
// // //       <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-white/90 via-white/50 to-transparent pointer-events-none" />
      
// // //       <div className="relative h-full">
// // //         <ul className="h-full grid grid-cols-5 max-w-sm mx-auto px-1.5">
// // //           {navItems.map(({ to, icon: Icon, label, isPrimary, badge, notification }) => {
// // //             const active = location.pathname === to;
            
// // //             return (
// // //               <li key={to} className="group relative">
// // //                 {isPrimary ? (
// // //                   /* === PRIMARY ACTION === */
// // //                   <button
// // //                     onClick={handlePrimaryPress}
// // //                     onMouseDown={() => setPressed(true)}
// // //                     onMouseUp={() => setPressed(false)}
// // //                     onTouchStart={() => setPressed(true)}
// // //                     onTouchEnd={() => setPressed(false)}
// // //                     className={`
// // //                       relative flex flex-col items-center justify-center h-full -mt-2.5 p-1.5
// // //                       rounded-2xl transition-all duration-200 ease-out
// // //                       ${pressed 
// // //                         ? "scale-90 shadow-inner" 
// // //                         : "hover:scale-[1.05] active:scale-95 group-hover:shadow-xl"
// // //                       }
// // //                     `}
// // //                     aria-label="Add workout"
// // //                   >
// // //                     <div className={`
// // //                       w-14 h-14 rounded-3xl flex items-center justify-center
// // //                       shadow-2xl border-4 ${pressed ? "border-white/60" : "border-white/90"}
// // //                       bg-gradient-to-br ${
// // //                         pressed
// // //                           ? "from-blue-600/90 to-blue-700/90 shadow-inner"
// // //                           : "from-blue-500 via-blue-600 to-blue-700 shadow-[0_8px_25px_rgba(59,130,246,0.4)]"
// // //                       }
// // //                       dark:border-gray-900/80
// // //                       backdrop-blur-sm
// // //                       transform-gpu transition-all duration-200
// // //                     `}>
// // //                       <Icon 
// // //                         size={26} 
// // //                         strokeWidth={2.8}
// // //                         className={pressed ? "scale-110" : ""}
// // //                       />
// // //                     </div>
// // //                     <span className="text-xs font-bold text-white mt-0.5 drop-shadow-sm">
// // //                       {label}
// // //                     </span>
// // //                   </button>
// // //                 ) : (
// // //                   /* === REGULAR NAV ITEMS === */
// // //                   <Link
// // //                     to={to}
// // //                     className={`
// // //                       relative flex flex-col items-center justify-center h-full p-1.5
// // //                       rounded-2xl transition-all duration-250 ease-out hover:scale-[1.03]
// // //                       ${active 
// // //                         ? "scale-[1.08] shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 dark:from-blue-950/50 dark:to-blue-900/50" 
// // //                         : "hover:bg-gray-50/50 active:scale-95 group-hover:shadow-md dark:hover:bg-gray-800/50"
// // //                       }
// // //                     `}
// // //                     aria-current={active ? "page" : undefined}
// // //                   >
// // //                     {/* Notification badge */}
// // //                     {notification && badge && (
// // //                       <div className="
// // //                         absolute -top-1.5 -right-1.5
// // //                         bg-gradient-to-r from-red-500 to-pink-500 rounded-full p-1.5
// // //                         shadow-lg border-2 border-white/80 backdrop-blur-sm
// // //                         animate-bounce-slow
// // //                       ">
// // //                         {badge}
// // //                       </div>
// // //                     )}

// // //                     <Icon 
// // //                       size={active ? 26 : 23} 
// // //                       strokeWidth={active ? 2.8 : 2.2}
// // //                       className={`
// // //                         transition-all duration-200
// // //                         ${active ? "drop-shadow-lg shadow-blue-500/25" : "group-hover:drop-shadow-sm"}
// // //                       `}
// // //                     />
                    
// // //                     <span 
// // //                       className={`
// // //                         text-[10px] xs:text-xs font-semibold leading-none tracking-tight mt-0.5
// // //                         px-1 py-0.5 rounded-full backdrop-blur-sm
// // //                         ${active 
// // //                           ? "text-blue-600 bg-blue-100/80 shadow-sm dark:bg-blue-900/60 dark:text-blue-300 drop-shadow-md" 
// // //                           : "text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200 bg-gray-100/60 dark:bg-gray-800/50"
// // //                         }
// // //                       `}
// // //                     >
// // //                       {label}
// // //                     </span>
// // //                   </Link>
// // //                 )}
// // //               </li>
// // //             );
// // //           })}
// // //         </ul>

// // //         {/* Subtle home indicator */}
// // //         <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-white/60 rounded-full shadow-sm backdrop-blur" />
// // //       </div>
// // //     </nav>
// // //   );
// // // }
// // import React, { useState, useEffect } from "react";
// // import { PlusCircle, Zap, Sparkles } from "lucide-react";

// // export default function FloatingAddButton({ onClick, className = "" }) {
// //   const [pulse, setPulse] = useState(false);
// //   const [pressed, setPressed] = useState(false);
// //   const [sparkle, setSparkle] = useState(false);

// //   // Breathing pulse animation
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setPulse(true);
// //       setTimeout(() => setPulse(false), 1000);
// //     }, 3000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const handleClick = (e) => {
// //     e.preventDefault();
// //     setPressed(true);
// //     setSparkle(true);
    
// //     // Haptic feedback
// //     if (navigator.vibrate) {
// //       navigator.vibrate([20, 10, 20]);
// //     }
    
// //     // Sparkle effect
// //     setTimeout(() => setSparkle(false), 500);
    
// //     onClick?.();
// //     setTimeout(() => setPressed(false), 150);
// //   };

// //   return (
// //     <div className={`
// //       fixed right-6 bottom-24 z-40 md:bottom-8 md:right-8
// //       ${className}
// //       transform translate-z-0
// //     `}>
// //       {/* Outer glow ring */}
// //       <div className={`
// //         absolute inset-0 w-20 h-20 rounded-full
// //         bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500
// //         opacity-30 blur-xl animate-ping-slow
// //         ${pulse ? 'scale-110' : ''}
// //       `} />
      
// //       {/* Sparkle particles */}
// //       {sparkle && (
// //         <div className="absolute inset-0 flex items-center justify-center">
// //           <Sparkles className="h-8 w-8 text-yellow-400 animate-explode opacity-80" />
// //         </div>
// //       )}

// //       {/* Main button */}
// //       <button
// //         onClick={handleClick}
// //         onMouseDown={() => setPressed(true)}
// //         onMouseUp={() => setPressed(false)}
// //         onTouchStart={() => setPressed(true)}
// //         onTouchEnd={() => setPressed(false)}
// //         className={`
// //           relative group
// //           w-16 h-16 rounded-3xl flex items-center justify-center
// //           bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600
// //           shadow-2xl border-4 border-white/20 dark:border-gray-900/50
// //           hover:shadow-[0_20px_40px_rgba(59,130,246,0.4)]
// //           hover:-translate-y-1 active:translate-y-0 active:scale-95
// //           transition-all duration-300 ease-out
// //           backdrop-blur-xl
// //           ${pressed 
// //             ? 'shadow-inner scale-95 border-white/40' 
// //             : 'shadow-[0_12px_30px_rgba(59,130,246,0.35)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.45)]'
// //           }
// //           ${pulse ? 'animate-pulse-gentle ring-4 ring-blue-400/30' : 'ring-2 ring-blue-500/20'}
// //         `}
// //         aria-label="Add new workout"
// //       >
// //         {/* Icon container */}
// //         <div className={`
// //           w-10 h-10 rounded-2xl flex items-center justify-center
// //           backdrop-blur-xl bg-white/20 dark:bg-white/10
// //           border border-white/30
// //           group-hover:bg-white/30 transition-all duration-200
// //           ${pressed ? 'scale-110 rotate-90' : 'group-hover:scale-110 group-hover:rotate-12'}
// //         `}>
// //           <PlusCircle 
// //             size={24} 
// //             strokeWidth={3} 
// //             className={`
// //               text-white drop-shadow-lg
// //               transition-all duration-200
// //               ${pressed ? 'scale-125 rotate-180' : 'group-hover:scale-110'}
// //             `}
// //           />
// //         </div>

// //         {/* Subtle shine effect */}
// //         <div className="
// //           absolute top-1 left-1 w-3 h-3 bg-gradient-to-r from-white/60 to-transparent
// //           rounded-full blur-sm animate-shimmer opacity-0 group-hover:opacity-100
// //         " />
// //       </button>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { 
//   Home, 
//   BarChart2, 
//   User, 
//   FolderOpen,
//   Crown,
//   Flame,
//   PlusCircle  // ← Add this back
// } from "lucide-react";

// export default function Footer() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [pressed, setPressed] = useState(false);
//   const [hasNewAchievements, setHasNewAchievements] = useState(true);
//   const [streakActive, setStreakActive] = useState(true);

//   // Simulate real-time badge states
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setHasNewAchievements(Math.random() > 0.7);
//       setStreakActive(Math.random() > 0.3);
//     }, 8000);
//     return () => clearInterval(interval);
//   }, []);

//   const navItems = [
//     { 
//       to: "/", 
//       icon: Home, 
//       label: "Home",
//       badge: null,
//       notification: false
//     },
//     { 
//       to: "/analytics", 
//       icon: BarChart2, 
//       label: "Stats",
//       badge: hasNewAchievements ? <Crown className="h-3 w-3" /> : null,
//       notification: hasNewAchievements
//     },
//     { 
//       to: "/templates", 
//       icon: FolderOpen, 
//       label: "Templates",
//       badge: null,
//       notification: false
//     },
//     { 
//       to: "/profile", 
//       icon: User, 
//       label: "Profile",
//       badge: streakActive ? <Flame className="h-3 w-3 animate-pulse" /> : null,
//       notification: streakActive
//     },
//   ];

//   const handleAddPress = () => {
//     setPressed(true);
//     navigator.vibrate?.([20, 10, 20]);
//     navigate("/add");
//     setTimeout(() => setPressed(false), 150);
//   };

//   return (
//     <nav
//       className="
//         fixed bottom-0 left-0 w-full z-50 md:hidden
//         bg-white/98 dark:bg-gray-900/98 backdrop-blur-2xl
//         border-t border-gray-200/50 dark:border-gray-800/50
//         h-[5.25rem] shadow-[0_-12px_40px_rgba(0,0,0,0.12)]
//         supports-[backdrop-filter:blur(40px)]:bg-white/95
//       "
//       role="navigation"
//       aria-label="Primary navigation"
//     >
//       {/* iPhone X+ safe area */}
//       <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-white/90 via-white/50 to-transparent pointer-events-none" />
      
//       <div className="relative h-full">
//         <ul className="h-full grid grid-cols-5 max-w-sm mx-auto px-1.5">
//           {/* LEFT 2 ITEMS */}
//           {navItems.slice(0, 2).map(({ to, icon: Icon, label, badge, notification }, index) => {
//             const active = location.pathname === to;
//             return (
//               <li key={to} className="group relative">
//                 <Link
//                   to={to}
//                   className={`
//                     relative flex flex-col items-center justify-center h-full p-1.5
//                     rounded-2xl transition-all duration-250 ease-out hover:scale-[1.03]
//                     ${active 
//                       ? "scale-[1.08] shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 dark:from-blue-950/50 dark:to-blue-900/50" 
//                       : "hover:bg-gray-50/50 active:scale-95 group-hover:shadow-md dark:hover:bg-gray-800/50"
//                     }
//                   `}
//                   aria-current={active ? "page" : undefined}
//                 >
//                   {notification && badge && (
//                     <div className="
//                       absolute -top-1.5 -right-1.5
//                       bg-gradient-to-r from-red-500 to-pink-500 rounded-full p-1.5
//                       shadow-lg border-2 border-white/80 backdrop-blur-sm
//                       animate-bounce-slow
//                     ">
//                       {badge}
//                     </div>
//                   )}
//                   <Icon 
//                     size={active ? 26 : 23} 
//                     strokeWidth={active ? 2.8 : 2.2}
//                     className={`
//                       transition-all duration-200
//                       ${active ? "drop-shadow-lg shadow-blue-500/25" : "group-hover:drop-shadow-sm"}
//                     `}
//                   />
//                   <span 
//                     className={`
//                       text-[10px] xs:text-xs font-semibold leading-none tracking-tight mt-0.5
//                       px-1 py-0.5 rounded-full backdrop-blur-sm
//                       ${active 
//                         ? "text-blue-600 bg-blue-100/80 shadow-sm dark:bg-blue-900/60 dark:text-blue-300 drop-shadow-md" 
//                         : "text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200 bg-gray-100/60 dark:bg-gray-800/50"
//                       }
//                     `}
//                   >
//                     {label}
//                   </span>
//                 </Link>
//               </li>
//             );
//           })}

//           {/* === ULTIMATE FLOATING ADD BUTTON (CENTER) === */}
//           <li className="relative -mt-3 z-10">
//             {/* Glow ring */}
//             <div className="
//               absolute inset-0 w-20 h-20 rounded-full mx-auto
//               bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500
//               opacity-30 blur-xl animate-ping-slow pointer-events-none
//             " />
            
//             <button
//               onClick={handleAddPress}
//               onMouseDown={() => setPressed(true)}
//               onMouseUp={() => setPressed(false)}
//               onTouchStart={() => setPressed(true)}
//               onTouchEnd={() => setPressed(false)}
//               className={`
//                 relative group mx-auto block
//                 w-16 h-16 rounded-3xl flex items-center justify-center
//                 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600
//                 shadow-2xl border-4 border-white/20
//                 hover:shadow-[0_20px_40px_rgba(59,130,246,0.4)]
//                 hover:-translate-y-1 active:translate-y-0 active:scale-95
//                 transition-all duration-300 ease-out
//                 backdrop-blur-xl
//                 ${pressed 
//                   ? 'shadow-inner scale-95 border-white/40 ring-4 ring-blue-400/50' 
//                   : 'shadow-[0_12px_30px_rgba(59,130,246,0.35)] ring-2 ring-blue-500/20'
//                 }
//               `}
//               aria-label="Add new workout"
//             >
//               <div className={`
//                 w-10 h-10 rounded-2xl flex items-center justify-center
//                 backdrop-blur-xl bg-white/20 border border-white/30
//                 group-hover:bg-white/30 transition-all duration-200
//                 ${pressed ? 'scale-110 rotate-90' : 'group-hover:scale-110 group-hover:rotate-12'}
//               `}>
//                 <PlusCircle 
//                   size={24} 
//                   strokeWidth={3} 
//                   className={`
//                     text-white drop-shadow-lg
//                     transition-all duration-200
//                     ${pressed ? 'scale-125 rotate-180' : 'group-hover:scale-110'}
//                   `}
//                 />
//               </div>
//               <div className="
//                 absolute top-1 left-1 w-3 h-3 bg-gradient-to-r from-white/60 to-transparent
//                 rounded-full blur-sm animate-shimmer opacity-0 group-hover:opacity-100
//               " />
//             </button>
//           </li>

//           {/* RIGHT 2 ITEMS */}
//           {navItems.slice(2).map(({ to, icon: Icon, label, badge, notification }) => {
//             const active = location.pathname === to;
//             return (
//               <li key={to} className="group relative">
//                 <Link
//                   to={to}
//                   className={`
//                     relative flex flex-col items-center justify-center h-full p-1.5
//                     rounded-2xl transition-all duration-250 ease-out hover:scale-[1.03]
//                     ${active 
//                       ? "scale-[1.08] shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 dark:from-blue-950/50 dark:to-blue-900/50" 
//                       : "hover:bg-gray-50/50 active:scale-95 group-hover:shadow-md dark:hover:bg-gray-800/50"
//                     }
//                   `}
//                   aria-current={active ? "page" : undefined}
//                 >
//                   {notification && badge && (
//                     <div className="
//                       absolute -top-1.5 -right-1.5
//                       bg-gradient-to-r from-red-500 to-pink-500 rounded-full p-1.5
//                       shadow-lg border-2 border-white/80 backdrop-blur-sm
//                       animate-bounce-slow
//                     ">
//                       {badge}
//                     </div>
//                   )}
//                   <Icon 
//                     size={active ? 26 : 23} 
//                     strokeWidth={active ? 2.8 : 2.2}
//                     className={`
//                       transition-all duration-200
//                       ${active ? "drop-shadow-lg shadow-blue-500/25" : "group-hover:drop-shadow-sm"}
//                     `}
//                   />
//                   <span 
//                     className={`
//                       text-[10px] xs:text-xs font-semibold leading-none tracking-tight mt-0.5
//                       px-1 py-0.5 rounded-full backdrop-blur-sm
//                       ${active 
//                         ? "text-blue-600 bg-blue-100/80 shadow-sm dark:bg-blue-900/60 dark:text-blue-300 drop-shadow-md" 
//                         : "text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200 bg-gray-100/60 dark:bg-gray-800/50"
//                       }
//                     `}
//                   >
//                     {label}
//                   </span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>

//         {/* Home indicator */}
//         <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-white/60 rounded-full shadow-sm backdrop-blur" />
//       </div>
//     </nav>
//   );
// }
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
