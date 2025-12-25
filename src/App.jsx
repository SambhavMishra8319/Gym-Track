// // // import React, { useState, useEffect } from "react";
// // // import { Routes, Route } from "react-router-dom";
// // // import MainLayout from "./layouts/MainLayout";
// // // import Home from "./pages/Home";
// // // import History from "./pages/History";
// // // import AnalyticsPage from "./pages/AnalyticsPage";
// // // import AddWorkout from "./pages/AddWorkout";
// // // import Profile from "./pages/Profile";
// // // import { onAuthChange } from "./firebase/auth";
// // // import Templates from "./pages/Templates";
// // // import PRPage from "./pages/PRPage";
// // // import ProfilePage from "./pages/ProfilePage";
// // // import SettingsPage from "./pages/SettingsPage";
// // // import AchievementsPage from "./pages/AchievementsPage";
// // // import StreakCalendar from "./pages/StreakCalendar";

// // // export default function App() {
// // //   const [user, setUser] = useState(null);

// // //   useEffect(() => {
// // //     // Subscribe to auth changes
// // //     const unsubscribe = onAuthChange((u) => setUser(u));
// // //     return () => unsubscribe();
// // //   }, []);

// // //   return (
// // //     <Routes>
// // //       <Route
// // //         path="/"
// // //         element={
// // //           <MainLayout user={user}>
// // //             <Home user={user} />
// // //           </MainLayout>
// // //         }
// // //       />

// // //       <Route
// // //         path="/history"
// // //         element={
// // //           <MainLayout user={user}>
// // //             <History user={user} />
// // //           </MainLayout>
// // //         }
// // //       />

// // //       <Route
// // //         path="/add"
// // //         element={
// // //           <MainLayout user={user}>
// // //             <AddWorkout user={user} />
// // //           </MainLayout>
// // //         }
// // //       />

// // //       <Route
// // //         path="/analytics"
// // //         element={
// // //           <MainLayout user={user}>
// // //             <AnalyticsPage user={user} />
// // //           </MainLayout>
// // //         }
// // //       />
// // //       <Route
// // //         path="/templates"
// // //         element={
// // //           <MainLayout user={user}>
// // //             <Templates user={user} />
// // //           </MainLayout>
// // //         }
// // //       />
// // //       <Route
// // //         path="/pr"
// // //         element={
// // //           <MainLayout user={user}>
// // //             <PRPage user={user} />
// // //           </MainLayout>
// // //         }
// // //       />

// // //       <Route
// // //         path="/profile"
// // //         element={
// // //           <MainLayout user={user}>
// // //             <Profile user={user} />
// // //           </MainLayout>
// // //         }
// // //       />
// // //       <Route path="/settings" element={<SettingsPage user={user} />} />
// // // <Route path="/achievements" element={<AchievementsPage user={user} />} />
// // // <Route path="/streaks" element={<StreakCalendar user={user} />} />

// // //     </Routes>

// // //   );
// // // }
// // import React, { useState, useEffect } from "react";
// // import { Routes, Route } from "react-router-dom";
// // import MainLayout from "./layouts/MainLayout";

// // import Home from "./pages/Home";
// // import History from "./pages/History";
// // import AnalyticsPage from "./pages/AnalyticsPage";
// // import AddWorkout from "./pages/AddWorkout";
// // import Templates from "./pages/Templates";
// // import PRPage from "./pages/PRPage";
// // import ProfilePage from "./pages/ProfilePage";
// // import SettingsPage from "./pages/SettingsPage";
// // import AchievementsPage from "./pages/AchievementsPage";
// // import StreakCalendar from "./pages/StreakCalendar";

// // // import { onAuthChange } from "./firebase/auth";
// // import { auth } from "./firebase/config";
// // import { onAuthStateChanged } from "firebase/auth";

// // export default function App() {
// //   const [user, setUser] = useState(null);

// //  useEffect(() => {
// //   const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
// //   return () => unsubscribe();
// // }, []);

// //   return (
// //     <Routes>
// //       <Route
// //         path="/"
// //         element={<MainLayout user={user}><Home user={user} /></MainLayout>}
// //       />
// //       <Route
// //         path="/history"
// //         element={<MainLayout user={user}><History user={user} /></MainLayout>}
// //       />
// //       <Route
// //         path="/add"
// //         element={<MainLayout user={user}><AddWorkout user={user} /></MainLayout>}
// //       />
// //       <Route
// //         path="/analytics"
// //         element={<MainLayout user={user}><AnalyticsPage user={user} /></MainLayout>}
// //       />
// //       <Route
// //         path="/templates"
// //         element={<MainLayout user={user}><Templates user={user} /></MainLayout>}
// //       />
// //       <Route
// //         path="/pr"
// //         element={<MainLayout user={user}><PRPage user={user} /></MainLayout>}
// //       />
// //       <Route
// //         path="/profile"
// //         element={<MainLayout user={user}><ProfilePage user={user} /></MainLayout>}
// //       />
// //       <Route
// //         path="/settings"
// //         element={<MainLayout user={user}><SettingsPage user={user} /></MainLayout>}
// //       />
// //       <Route
// //         path="/achievements"
// //         element={<MainLayout user={user}><AchievementsPage user={user} /></MainLayout>}
// //       />
// //       <Route
// //         path="/streaks"
// //         element={<MainLayout user={user}><StreakCalendar user={user} /></MainLayout>}
// //       />
// //     </Routes>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";

// import Home from "./pages/Home";
// import History from "./pages/History";
// import AnalyticsPage from "./pages/AnalyticsPage";
// import AddWorkout from "./pages/AddWorkout";
// import Templates from "./pages/Templates";
// import PRPage from "./pages/PRPage";
// import ProfilePage from "./pages/ProfilePage";
// import SettingsPage from "./pages/SettingsPage";
// import AchievementsPage from "./pages/AchievementsPage";
// import StreakCalendar from "./pages/StreakCalendar";

// import { auth } from "./firebase/config";
// import { onAuthStateChanged } from "firebase/auth";

// export default function App() {
//   const [user, setUser] = useState(null);

//   // 🔥 Detect user login (popup + redirect + refresh)
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
//     return () => unsubscribe();
//   }, []);

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <MainLayout user={user}>
//             <Home user={user} />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/history"
//         element={
//           <MainLayout user={user}>
//             <History user={user} />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/add"
//         element={
//           <MainLayout user={user}>
//             <AddWorkout user={user} />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/analytics"
//         element={
//           <MainLayout user={user}>
//             <AnalyticsPage user={user} />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/templates"
//         element={
//           <MainLayout user={user}>
//             <Templates user={user} />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/pr"
//         element={
//           <MainLayout user={user}>
//             <PRPage user={user} />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/profile"
//         element={
//           <MainLayout user={user}>
//             {/* FIX: pass setUser for redirect login */}
//             <ProfilePage user={user} setUser={setUser} />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/settings"
//         element={
//           <MainLayout user={user}>
//             <SettingsPage user={user} />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/achievements"
//         element={
//           <MainLayout user={user}>
//             <AchievementsPage user={user} />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/streaks"
//         element={
//           <MainLayout user={user}>
//             <StreakCalendar user={user} />
//           </MainLayout>
//         }
//       />
//     </Routes>
//   );
// }
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import History from "./pages/History";
import AnalyticsPage from "./pages/AnalyticsPage";
import AddWorkout from "./pages/AddWorkout";
import Templates from "./pages/Templates";
import PRPage from "./pages/PRPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import AchievementsPage from "./pages/AchievementsPage";
import StreakCalendar from "./pages/StreakCalendar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔥 Detect auth state */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <Routes>
      {/* 🔓 Public Routes */}
      {/* <Route path="/login" element={<Login />} /> */}
      <Route
        path="/login"
        element={
          <PublicRoute user={user}>
            <Login />
          </PublicRoute>
        }
      />

      {/* <Route path="/signup" element={<Signup />} /> */}
      <Route
        path="/signup"
        element={
          <PublicRoute user={user}>
            <Signup />
          </PublicRoute>
        }
      />

      {/* 🔐 Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute user={user}>
            <MainLayout user={user}>
              <Home user={user} />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute user={user}>
            <MainLayout user={user}>
              <History user={user} />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add"
        element={
          <ProtectedRoute user={user}>
            <MainLayout user={user}>
              <AddWorkout user={user} />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute user={user}>
            <MainLayout user={user}>
              <AnalyticsPage user={user} />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/templates"
        element={
          <ProtectedRoute user={user}>
            <MainLayout user={user}>
              <Templates user={user} />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/pr"
        element={
          <ProtectedRoute user={user}>
            <MainLayout user={user}>
              <PRPage user={user} />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute user={user}>
            <MainLayout user={user}>
              <ProfilePage user={user} setUser={setUser} />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute user={user}>
            <MainLayout user={user}>
              <SettingsPage user={user} />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/achievements"
        element={
          <ProtectedRoute user={user}>
            <MainLayout user={user}>
              <AchievementsPage user={user} />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/streaks"
        element={
          <ProtectedRoute user={user}>
            <MainLayout user={user}>
              <StreakCalendar user={user} />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
