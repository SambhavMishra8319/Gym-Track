
import React from "react";
import "./Home.css"; // reuse your existing day-card grid styling

export default function AllDays() {
  const days = [
    { name: "Chest Day", icon: "fa-solid fa-dumbbell" },
    { name: "Leg Day", icon: "fa-solid fa-person-running" },
    { name: "Back Day", icon: "fa-solid fa-weight-hanging" },
    { name: "Arm Day", icon: "fa-solid fa-hand-fist" },
    { name: "Core Day", icon: "fa-solid fa-person-praying" },
    { name: "Rest & Recovery", icon: "fa-solid fa-bed" },
  ];

  return (
    <div className="home-container">
      <h1>All Workout Days</h1>
      <div className="days-grid">
        {days.map((day, index) => (
          <div key={index} className="day-card">
            <i className={day.icon}></i>
            <span>{day.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
