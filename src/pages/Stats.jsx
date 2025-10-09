import React, { useState, useEffect, useRef } from "react";
import ProgressChart from "../components/ProgressChart";
import { toPng } from "html-to-image";
import "./Stats.css";

export default function Stats() {
  const chartRef = useRef(null);
  const allDays = [
    "chest",
    "legs",
    "abs",
    "back",
    "biceps",
    "shoulders",
    "triceps",
  ];

  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [weightData, setWeightData] = useState([]);
  const [repsData, setRepsData] = useState([]);
  const [avgData, setAvgData] = useState([]);
  const [percentData, setPercentData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Load all exercises from localStorage
  // Load all unique exercises from localStorage

  const loadExercises = () => {
    const uniqueExercises = [];

    allDays.forEach((day) => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(`exercise-${day}-`))
        .forEach((key) => {
          const parts = key.split("-");
          const name = parts[2];
          if (
            name &&
            !uniqueExercises.some((ex) => ex.name === name && ex.day === day)
          ) {
            uniqueExercises.push({ day, name });
          }
        });
    });

    setExercises(uniqueExercises);
  };

  useEffect(() => {
    loadExercises();
    const handleStorageChange = () => loadExercises();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (!selectedExercise) return;

    const { day, name } = selectedExercise;

    // ✅ Fetch all keys for this exercise (across dates)
    const allKeys = Object.keys(localStorage).filter((k) =>
      k.startsWith(`exercise-${day}-${name}-`)
    );

    // Create workouts [{ date, sets }]
    let storedWorkouts = allKeys.map((key) => {
      const parts = key.split("-");
      const date = parts.slice(3).join("-");
      const sets = JSON.parse(localStorage.getItem(key)) || [];
      return { date, sets };
    });

    // Sort by date
    storedWorkouts.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Filter by date range
    if (startDate)
      storedWorkouts = storedWorkouts.filter((w) => w.date >= startDate);
    if (endDate)
      storedWorkouts = storedWorkouts.filter((w) => w.date <= endDate);

    if (storedWorkouts.length === 0) {
      setWeightData([]);
      setRepsData([]);
      setAvgData([]);
      setPercentData([]);
      return;
    }

    // ---- Chart Data Preparation ----
    const weightChart = storedWorkouts.map((w) => {
      const setsObj = {};
      w.sets.forEach((s) => (setsObj[`Set ${s.setNumber}`] = s.weight));
      return { date: w.date, ...setsObj };
    });

    const repsChart = storedWorkouts.map((w) => {
      const setsObj = {};
      w.sets.forEach((s) => (setsObj[`Set ${s.setNumber}`] = s.reps));
      return { date: w.date, ...setsObj };
    });

    const avgChart = storedWorkouts.map((w) => {
      const totalWeight = w.sets.reduce((sum, s) => sum + s.weight, 0);
      const totalReps = w.sets.reduce((sum, s) => sum + s.reps, 0);
      const setsCount = w.sets.length || 1;
      return {
        date: w.date,
        "Average Weight": (totalWeight / setsCount).toFixed(1),
        "Average Reps": (totalReps / setsCount).toFixed(1),
      };
    });

    const firstWorkout = storedWorkouts[0];
    const percentChart = storedWorkouts.map((w) => {
      const totalWeight = w.sets.reduce((sum, s) => sum + s.weight, 0);
      const totalReps = w.sets.reduce((sum, s) => sum + s.reps, 0);
      const firstWeight =
        firstWorkout.sets.reduce((sum, s) => sum + s.weight, 0) || 1;
      const firstReps =
        firstWorkout.sets.reduce((sum, s) => sum + s.reps, 0) || 1;
      return {
        date: w.date,
        "Weight Improvement (%)": (
          ((totalWeight - firstWeight) / firstWeight) *
          100
        ).toFixed(1),
        "Reps Improvement (%)": (
          ((totalReps - firstReps) / firstReps) *
          100
        ).toFixed(1),
      };
    });

    setWeightData(weightChart);
    setRepsData(repsChart);
    setAvgData(avgChart);
    setPercentData(percentChart);
  }, [selectedExercise, startDate, endDate, localStorage.length]);

  // ---- Export Functions ----
  const exportChartAsImage = () => {
    if (!chartRef.current || !selectedExercise) return;
    toPng(chartRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${selectedExercise.name}-charts.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.log("Error exporting chart:", err));
  };

  const exportDataAsCSV = () => {
    if (!weightData.length || !selectedExercise) return;

    const allData = weightData.map((w, i) => ({
      date: w.date,
      ...Object.fromEntries(
        Object.keys(w)
          .filter((k) => k !== "date")
          .map((key) => [key, `${w[key]},${repsData[i][key]}`])
      ),
    }));

    let csv = "Date,Set,Weight,Reps\n";

    allData.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key === "date") return;
        const [setName, values] = [key, row[key].split(",")];
        csv += `${row.date},${setName},${values[0]},${values[1]}\n`;
      });
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedExercise.name}-data.csv`;
    link.click();
  };

  // ---- UI ----
  return (
    <div className="center margin-top">
      <h2>Exercise Progress Stats</h2>

      <div className="margin-top">
        <select
          value={selectedExercise ? selectedExercise.name : ""}
          onChange={(e) => {
            const ex = exercises.find((ex) => ex.name === e.target.value);
            setSelectedExercise(ex);
          }}
          className="input-select"
        >
          <option value="">Select Exercise</option>
          {exercises.map((ex, i) => (
            <option key={i} value={ex.name}>
              {ex.name.charAt(0).toUpperCase() + ex.name.slice(1)} ({ex.day})
            </option>
          ))}
        </select>
      </div>

      <div className="margin-top date-filter">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button
          onClick={() => {
            setStartDate("");
            setEndDate("");
          }}
        >
          Clear Filter
        </button>
      </div>

      {selectedExercise ? (
        weightData.length > 0 ? (
          <div ref={chartRef} className="chart-section">
            <h3>Weight Progress (kg)</h3>
            <ProgressChart data={weightData} />
            <h3>Reps Progress</h3>
            <ProgressChart data={repsData} />
            <h3>Average per Workout</h3>
            <ProgressChart data={avgData} />
            <h3>Percentage Improvement</h3>
            <ProgressChart data={percentData} />
            <div className="margin-top">
              <button onClick={exportChartAsImage} className="btn">
                Export Charts PNG
              </button>
              <button onClick={exportDataAsCSV} className="btn">
                Export Data CSV
              </button>
            </div>
          </div>
        ) : (
          <p>No sets logged for this exercise in the selected range.</p>
        )
      ) : (
        <p>Select an exercise to view progress.</p>
      )}
    </div>
  );
}
