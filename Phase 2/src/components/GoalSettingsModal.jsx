import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function GoalSettingsModal({ open, onClose, onSave }) {
  const [goals, setGoals] = useState({
    sets: 10,
    calories: 300,
    water: 2000,
    minutes: 45,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dailyGoals"));
    if (saved) setGoals(saved);
  }, []);

  const handleChange = (key, value) => {
    setGoals((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const saveGoals = () => {
    localStorage.setItem("dailyGoals", JSON.stringify(goals));
    onSave(goals);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96 border border-gray-200 relative">

        {/* CLOSE BUTTON */}
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X size={22} className="text-gray-600 hover:text-black" />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">Set Your Daily Goals</h2>

        {/* INPUT GRID */}
        <div className="grid grid-cols-2 gap-4">
          <GoalInput label="Sets" value={goals.sets} onChange={(v) => handleChange("sets", v)} />
          <GoalInput label="Calories" value={goals.calories} onChange={(v) => handleChange("calories", v)} />
          <GoalInput label="Water (ml)" value={goals.water} onChange={(v) => handleChange("water", v)} />
          <GoalInput label="Minutes" value={goals.minutes} onChange={(v) => handleChange("minutes", v)} />
        </div>

        <button
          onClick={saveGoals}
          className="w-full mt-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow"
        >
          Save Goals
        </button>
      </div>
    </div>
  );
}

function GoalInput({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type="number"
        value={value}
        className="w-full mt-1 px-3 py-2 border rounded-xl bg-gray-50 outline-none shadow-inner"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
