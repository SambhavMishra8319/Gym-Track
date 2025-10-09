import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/*
 Expect localStorage 'workouts' to be an array of objects with a date field:
  [{ date: '2025-10-05', metric: 30 }, ...]
 If your data shape differs, adapt mapping inside useEffect.
*/
export default function DashboardChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("workouts") || "[]";
      const workouts = JSON.parse(raw);
      // map to {date, value}
      const chartData = workouts
        .map((w) => ({
          date: w.date,
          value: Number(w.weight ?? w.metric ?? w.value ?? 0),
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setData(chartData);
    } catch (e) {
      console.error("Error reading workouts for chart:", e);
    }
  }, []);

  return (
    <div style={{ width: "100%", height: 340 }}>
      <h3>Progress over time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#2f80ed" dot={{ r: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
