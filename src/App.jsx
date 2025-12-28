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
import WeightTracking from "./pages/WeightTracking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// Route definitions
const protectedRoutes = [
  { path: "/", element: <Home /> },
  { path: "/history", element: <History /> },
  { path: "/add", element: <AddWorkout /> },
  { path: "/analytics", element: <AnalyticsPage /> },
  { path: "/templates", element: <Templates /> },
  { path: "/pr", element: <PRPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/settings", element: <SettingsPage /> },
  { path: "/achievements", element: <AchievementsPage /> },
  { path: "/streaks", element: <StreakCalendar /> },
  // In your protectedRoutes array:
{ path: "/weight-tracking", element: <WeightTracking /> },

];

const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <PublicRoute user={user}>
              {element}
            </PublicRoute>
          }
        />
      ))}

      {/* Protected Routes */}
      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute user={user}>
              <MainLayout user={user}>
                {React.cloneElement(element, { user })}
              </MainLayout>
            </ProtectedRoute>
          }
        />
      ))}

      {/* Catch-all redirect to home */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
