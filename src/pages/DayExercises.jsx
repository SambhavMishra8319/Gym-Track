import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DayExercises.css";

export default function DayExercises() {
  const { day } = useParams();
  const navigate = useNavigate();

  const [exerciseName, setExerciseName] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    loadExercises();
  }, [day]);

  const loadExercises = () => {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith(`exercise-${day}-`)
    );
    const uniqueNames = [...new Set(keys.map((k) => k.split("-")[2]))];
    setExercises(uniqueNames);
  };

  const addExercise = () => {
    if (!exerciseName) return;
    const key = `exercise-${day}-${exerciseName}-default`;
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify([]));
    setExerciseName("");
    loadExercises();
  };

  const deleteExercise = (name) => {
    // Remove all keys that match this exercise
    const keysToRemove = Object.keys(localStorage).filter((k) =>
      k.startsWith(`exercise-${day}-${name}-`)
    );
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    loadExercises();
  };

  return (
    <div className="day-exercises-container">
      <h2>{day.charAt(0).toUpperCase() + day.slice(1)} Exercises</h2>

      <div className="add-exercise">
        <input
          placeholder="New Exercise"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
        <button onClick={addExercise}>Add Exercise</button>
      </div>

      <ul className="exercise-list">
        {exercises.map((ex) => (
          <li key={ex} className="exercise-item">
            <span onClick={() => navigate(`/exercise/${day}/${ex}`)}>{ex}</span>
            <button
              onClick={() => deleteExercise(ex)}
              style={{
                marginLeft: "10px",
                background: "red",
                color: "#fff",
                border: "none",
                padding: "2px 6px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
