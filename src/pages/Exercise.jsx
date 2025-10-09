import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Exercise() {
  const { day, name } = useParams();
  const [sets, setSets] = useState([]);
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [setNumber, setSetNumber] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [lastWorkout, setLastWorkout] = useState([]);

  useEffect(() => {
    const key = `exercise-${day}-${name}-${date}`;
    const stored = JSON.parse(localStorage.getItem(key)) || [];
    setSets(stored);

    const allKeys = Object.keys(localStorage)
      .filter((k) => k.startsWith(`exercise-${day}-${name}-`))
      .sort();
    if (allKeys.length > 0) {
      const lastKey = allKeys[allKeys.length - 1];
      setLastWorkout(JSON.parse(localStorage.getItem(lastKey)));
    } else {
      setLastWorkout([]);
    }
  }, [day, name, date]);

  const addOrUpdateSet = () => {
    if (!reps || !weight) return;
    const num = setNumber ? Number(setNumber) : sets.length + 1;
    const index = sets.findIndex((s) => s.setNumber === num);
    let updatedSets = [...sets];
    if (index !== -1) {
      updatedSets[index] = {
        setNumber: num,
        reps: Number(reps),
        weight: Number(weight),
      };
    } else {
      updatedSets.push({
        setNumber: num,
        reps: Number(reps),
        weight: Number(weight),
      });
    }
    setSets(updatedSets);
    localStorage.setItem(
      `exercise-${day}-${name}-${date}`,
      JSON.stringify(updatedSets)
    );
    setReps("");
    setWeight("");
    setSetNumber("");
  };

  return (
    // <div style={{ textAlign: "center", marginTop: "2rem" }}>
    // <div style={{ textAlign: "center", marginTop: "2rem", position: "relative", zIndex: 10 }}>
<div style={{ textAlign: "center", marginTop: "2rem", position: "relative", background: "rgba(255,0,0,0.1)" }}>

      <h2>
        {name.charAt(0).toUpperCase() + name.slice(1)} ({day})
      </h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Set # (optional)"
          value={setNumber}
          onChange={(e) => setSetNumber(e.target.value)}
          style={{ marginRight: "0.5rem", width: "80px" }}
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={addOrUpdateSet}>Add / Update Set</button>
      </div>

      {sets.length > 0 && (
        <div>
          <h3>Sets for {date}</h3>
          <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                  Set
                </th>
                <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                  Reps
                </th>
                <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                  Weight
                </th>
              </tr>
            </thead>
            <tbody>
              {sets.map((s) => (
                <tr key={s.setNumber}>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    {s.setNumber}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    {s.reps}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    {s.weight}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {lastWorkout.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Last Workout</h3>
          <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                  Set
                </th>
                <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                  Reps
                </th>
                <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                  Weight
                </th>
              </tr>
            </thead>
            <tbody>
              {lastWorkout.map((s) => (
                <tr key={s.setNumber}>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    {s.setNumber}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    {s.reps}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    {s.weight}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
