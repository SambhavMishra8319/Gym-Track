import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Exercise from "./pages/Exercise";
import Stats from "./pages/Stats";
import DayExercises from "./pages/DayExercises";
// import AllDays from "./pages/AllDays"; // ✅ fixed the import path
import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
          <Route path="/" element={<Home />} />
         
          <Route path="/day/:day" element={<DayExercises />} />
          <Route path="/exercise/:day/:name" element={<ProtectedRoute><Exercise/></ProtectedRoute>} />
        <Route path="/stats" element={<ProtectedRoute><Stats/></ProtectedRoute>} />
    
          {/* <Route path="/days" element={<AllDays />} /> ✅ now this works */}
        </Routes>
      </div>
    </Router>
  );
}
