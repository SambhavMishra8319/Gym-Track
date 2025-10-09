import React from "react";
import "./ProgressChart.css";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function ProgressChart({ data }) {
  if (!data || data.length === 0) return null;

  const setKeys = Object.keys(data[0]).filter((key) => key !== "date");
  const colors = ["#00b894", "#0984e3", "#fd79a8", "#e17055", "#6c5ce7"];

  const personalBests = {};
  setKeys.forEach((key) => {
    personalBests[key] = Math.max(...data.map((d) => d[key] || 0));
  });

  const renderDot = (props, key) => {
    const { cx, cy, value } = props;
    if (value === personalBests[key]) {
      return (
        <circle cx={cx} cy={cy} r={6} fill="gold" stroke="#ffa500" strokeWidth={2} />
      );
    }
    return <circle cx={cx} cy={cy} r={3} fill={colors[0]} />;
  };

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {setKeys.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[i % colors.length]}
              dot={(props) => renderDot(props, key)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
