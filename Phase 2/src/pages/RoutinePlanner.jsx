import React, { useMemo, useState } from "react";
import { ROUTINE_PLANS } from "../data/routinePlans";

export default function RoutinePlanner() {
  const [selected, setSelected] = useState(() => ROUTINE_PLANS.slice(0, 4).map((p) => p.id));
  const selectedPlans = useMemo(
    () => ROUTINE_PLANS.filter((plan) => selected.includes(plan.id)),
    [selected]
  );

  const togglePlan = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
        <p className="text-sm text-blue-600 font-semibold">Tracksy upgrade added</p>
        <h1 className="text-2xl font-bold mt-1">Routine Planner</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Choose body-part plans and build your weekly split. This keeps FitTrack focused on gym progress while adding Tracksy-style structured planning.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ROUTINE_PLANS.map((plan) => {
          const active = selected.includes(plan.id);
          return (
            <button
              key={plan.id}
              onClick={() => togglePlan(plan.id)}
              className={`text-left rounded-2xl border p-4 shadow-sm transition bg-white dark:bg-gray-800 ${
                active ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">{plan.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{plan.days}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${active ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                  {active ? "Selected" : "Add"}
                </span>
              </div>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{plan.focus}</p>
              <ul className="mt-3 text-sm space-y-1 text-gray-700 dark:text-gray-200">
                {plan.exercises.slice(0, 3).map((ex) => <li key={ex}>• {ex}</li>)}
              </ul>
            </button>
          );
        })}
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
        <h2 className="text-xl font-bold">Your Selected Split</h2>
        {selectedPlans.length === 0 ? (
          <p className="text-gray-500 mt-3">Select at least one plan to create your routine.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {selectedPlans.map((plan, index) => (
              <div key={plan.id} className="border dark:border-gray-700 rounded-xl p-4">
                <div className="font-semibold">Day {index + 1}: {plan.title}</div>
                <div className="text-sm text-gray-500">{plan.focus}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm">
                  {plan.exercises.map((ex) => <div key={ex} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2">{ex}</div>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
