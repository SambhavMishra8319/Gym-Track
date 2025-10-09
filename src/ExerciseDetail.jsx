
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import "./ExerciseDetail.css";

// Optional: small beep sound
const beepUrl = "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg";

export default function ExerciseDetail() {
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [showTag, setShowTag] = useState(false);

  const storageKey = `records:${category}:${name}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setRecords(JSON.parse(stored));
  }, [storageKey]);

  const playSound = () => {
    const audio = new Audio(beepUrl);
    audio.play();
  };

  const handleAddRecord = () => {
    if (!sets || !reps || !weight) return;

    const newRecord = {
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseFloat(weight),
      date: new Date().toISOString(),
    };

    const updatedRecords = [newRecord, ...records];
    setRecords(updatedRecords);
    localStorage.setItem(storageKey, JSON.stringify(updatedRecords));

    // Reset inputs
    setSets("");
    setReps("");
    setWeight("");

    // Show completion tag
    setShowTag(true);
    setTimeout(() => setShowTag(false), 2000);

    // Play completion sound
    playSound();
  };

  return (
    <div className="exercise-root">
      <header className="exercise-header">
        <h1 className="exercise-title">{name}</h1>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </header>

      <div className="exercise-inputs">
        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button onClick={handleAddRecord}>Add Record</button>
      </div>

      {/* Completion tag */}
      {showTag && <div className="completion-tag">✅ Record Added!</div>}

      <div className="records-table">
        {records.length === 0 ? (
          <p className="no-data">No records yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Weight (kg)</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i}>
                  <td>{new Date(r.date).toLocaleString()}</td>
                  <td>{r.sets}</td>
                  <td>{r.reps}</td>
                  <td>{r.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

