import React from "react";

export default function GoalsSection({ goals, onAddGoal }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow border">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Your Goals</h2>
        <button
          onClick={onAddGoal}
          className="px-3 py-1 bg-green-600 text-white rounded-md"
        >
          Add Goal
        </button>
      </div>

      {goals.length === 0 && (
        <p className="text-gray-500 text-sm">You have no goals yet.</p>
      )}

      <div className="space-y-3">
        {goals.map((g) => (
          <div
            key={g.id}
            className="p-3 border rounded-md bg-gray-50 shadow-sm"
          >
            <div className="font-medium">{g.title}</div>
            <div className="text-sm text-gray-600">{g.description}</div>
            <div className="text-xs text-gray-400 mt-1">
              Target: {g.targetDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
