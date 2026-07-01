import React, { useEffect, useState } from "react";
import { getWorkouts } from "../firebase/exercises";
import { normalizeExerciseName, getExerciseMuscleGroup } from "../data/exerciseDatabase";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export default function Charts({ user }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchWorkouts = async () => {
      try {
        const data = await getWorkouts(user.uid);
        setWorkouts(data);
      } catch (err) {
        console.error("Error fetching workouts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [user]);

  if (!user) return <p>Please sign in to see your charts.</p>;
  if (loading) return <p>Loading charts...</p>;
  if (!workouts.length) return <p>No workouts found.</p>;

  const parseWeight = (value) => {
    if (typeof value === "number") return value;
    if (!value) return 0;
    const cleaned = String(value).toLowerCase().replace("body", "0");
    if (cleaned.includes("/")) {
      return cleaned
        .split("/")
        .map((part) => Number(String(part).replace(/[^0-9.]/g, "")) || 0)
        .reduce((sum, n) => sum + n, 0);
    }
    return Number(cleaned.replace(/[^0-9.]/g, "")) || 0;
  };

  const chartData = {};
  workouts
    .slice()
    .sort((a, b) => new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt))
    .forEach((workout) => {
      (workout.exercises || []).forEach((ex) => {
        const name = normalizeExerciseName(ex.name || ex.originalName);
        if (!chartData[name]) {
          chartData[name] = { muscleGroup: ex.muscleGroup || getExerciseMuscleGroup(name), points: [] };
        }

        const bestSet = (ex.sets || []).reduce((best, set) => {
          const weight = parseWeight(set.weight);
          return weight > best.weight ? { weight, reps: Number(set.reps) || 0 } : best;
        }, { weight: 0, reps: 0 });

        chartData[name].points.push({
          date: workout.date || String(workout.createdAt || "").slice(0, 10),
          weight: bestSet.weight,
          reps: bestSet.reps,
        });
      });
    });

  return (
    <div className="space-y-6">
      {Object.entries(chartData).map(([exName, exerciseData]) => (
        <div
          key={exName}
          className="bg-white p-4 rounded shadow"
        >
          <h3 className="font-semibold mb-2">
            {exName} Progress
          </h3>
          <p className="text-xs text-gray-500 mb-2">{exerciseData.muscleGroup}</p>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={exerciseData.points}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <XAxis
                  dataKey="date"
                  label={{
                    value: "Date",
                    position: "insideBottomRight",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "Weight (kg)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <CartesianGrid
                  stroke="#ccc"
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#3b82f6"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}
