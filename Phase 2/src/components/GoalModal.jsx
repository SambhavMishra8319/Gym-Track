import React, { useState } from "react";
import { addGoal } from "../firebase/goals";

export default function GoalModal({ user, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const saveGoal = async () => {
    if (!title.trim()) return alert("Goal title required");

    await addGoal(user.uid, {
      title,
      description,
      targetDate,
    });

    onClose(); // close and refresh
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Goal</h2>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Goal Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="e.g. Lose 5kg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="w-full p-2 border rounded mt-1"
              placeholder="Short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="text-sm font-medium">Target Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded mt-1"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            className="px-3 py-2 bg-gray-300 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md"
            onClick={saveGoal}
          >
            Save Goal
          </button>
        </div>
      </div>
    </div>
  );
}
