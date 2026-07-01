import React from "react";

const WaterTracker = ({ water, setWater, target = 4 }) => {
  const percent = Math.min((water / target) * 100, 100);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
        Water Tracker
      </h2>

      <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
        {water.toFixed(1)} / {target} L
      </h3>

      <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded-full mt-3">
        <div
          className="h-3 bg-black dark:bg-white rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <button
          onClick={() => setWater((prev) => +(prev + 0.25).toFixed(2))}
          className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 dark:text-white"
        >
          +250ml
        </button>

        <button
          onClick={() => setWater((prev) => +(prev + 0.5).toFixed(2))}
          className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 dark:text-white"
        >
          +500ml
        </button>

        <button
          onClick={() => setWater(0)}
          className="p-3 rounded-xl bg-red-100 text-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default WaterTracker;