import React from "react";

const DietHistory = ({ history }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
        Diet History
      </h2>

      {history.length === 0 ? (
        <p className="text-zinc-500 text-sm">No history available yet.</p>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.date}
              className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3"
            >
              <p className="font-semibold text-zinc-900 dark:text-white">
                {item.date}
              </p>
              <p className="text-sm text-zinc-500">
                {item.totals.calories} kcal · {item.totals.protein}g protein ·{" "}
                {item.water}L water
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DietHistory;