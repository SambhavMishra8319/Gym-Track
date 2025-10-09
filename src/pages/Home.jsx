// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const days = [
    { name: "chest", icon: "fas fa-dumbbell" },
    { name: "legs", icon: "fas fa-running" },
    { name: "abs", icon: "fas fa-apple-alt" },
    { name: "back", icon: "fas fa-weight-hanging" },
    { name: "biceps", icon: "fas fa-hand-rock" },
    { name: "shoulders", icon: "fas fa-arrows-up-to-line" },
    { name: "triceps", icon: "fas fa-hand-fist" },
  ];

  return (
    <div className="home-container">
      <h1>SetTrack Workout Tracker</h1>
      <div className="days-grid">
        {days.map((day) => (
          <div
            key={day.name}
            className="day-card"
            onClick={() => navigate(`/day/${day.name}`)}
          >
            <i className={day.icon}></i>
            <span>{day.name.charAt(0).toUpperCase() + day.name.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
