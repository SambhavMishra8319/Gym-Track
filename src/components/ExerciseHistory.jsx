
import React from "react";
import ExerciseCard from "./ExerciseCard";

export default function ExerciseHistory({ entry }) {
  return (
    <div className="border p-3 rounded bg-white">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium">{entry.date}</div>
        <div className="text-xs text-gray-500">
          {new Date(entry.createdAt).toLocaleString()}
        </div>
      </div>

      <div className="space-y-2">
        {entry.exercises.map((ex, idx) => (
          <ExerciseCard key={idx} exercise={ex} />
        ))}
      </div>
    </div>
  );
}
