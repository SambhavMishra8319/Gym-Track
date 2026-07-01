// src/pages/Templates.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddWorkout from "./AddWorkout";
import { getTemplates, deleteTemplate, addTemplate } from "../firebase/templates";
import { workoutPlans } from "../data/workoutPlans";

export default function Templates({ user }) {
  const [customPlans, setCustomPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewPlan, setShowNewPlan] = useState(false);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    if (!user) {
      setCustomPlans([]);
      setLoading(false);
      return;
    }

    try {
      const saved = await getTemplates(user.uid);
      setCustomPlans(saved.map((plan) => ({ ...plan, type: "Custom", isCustom: true })));
    } catch (error) {
      console.error("Error loading plans:", error);
      setCustomPlans([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [user]);

  const planTypes = useMemo(
    () => ["All", ...new Set([...workoutPlans, ...customPlans].map((plan) => plan.type || "Custom"))],
    [customPlans]
  );

  const plans = useMemo(() => {
    const allPlans = [...workoutPlans, ...customPlans];
    return filter === "All" ? allPlans : allPlans.filter((plan) => (plan.type || "Custom") === filter);
  }, [customPlans, filter]);

  function startPlan(plan) {
    navigate("/add", {
      state: {
        template: {
          name: plan.name,
          exercises: plan.exercises,
        },
      },
    });
  }

  const handleSavePlan = async (workoutData) => {
    if (!user) return;
    try {
      const planData = {
        name: workoutData.name || `My Plan ${new Date().toLocaleDateString()}`,
        type: "Custom",
        focus: "Custom workout plan",
        exercises: workoutData.exercises,
        createdAt: new Date().toISOString(),
      };
      await addTemplate(user.uid, planData);
      await load();
      setShowNewPlan(false);
      alert("✅ Plan saved!");
    } catch (err) {
      alert("Error saving plan");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="premium-card text-center">Loading workout plans...</div>;
  }

  return (
    <div className="space-y-8 pb-24">
      <section className="premium-hero">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-300">Workout planning</p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl md:text-5xl">Workout Plans</h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              One clean place for ready-made plans and your custom plans. Choose any plan and start logging it directly.
            </p>
          </div>
          {user && (
            <button
              onClick={() => setShowNewPlan(true)}
              className="premium-button"
            >
              ➕ Create Plan
            </button>
          )}
        </div>
      </section>

      <section className="premium-card !p-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {planTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold border transition ${
                filter === type
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                  : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-white/10"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {plans.map((plan, index) => (
          <div
            key={plan.id || `${plan.name}-${index}`}
            className="premium-card flex flex-col"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{plan.focus || "Custom workout plan"}</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold whitespace-nowrap">
                {plan.type || "Custom"}
              </span>
            </div>

            {plan.recommendedDay && (
              <p className="text-xs text-gray-500 mb-3">Suggested: {plan.recommendedDay}</p>
            )}

            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 flex-1">
              {plan.exercises.slice(0, 6).map((exercise, idx) => (
                <li key={idx} className="flex justify-between gap-3 border-b border-gray-100 dark:border-gray-700 pb-1">
                  <span>{exercise.name}</span>
                  <span className="text-gray-500 whitespace-nowrap">{exercise.sets?.[0]?.reps || ""}</span>
                </li>
              ))}
              {plan.exercises.length > 6 && <li className="text-gray-500">+ more</li>}
            </ul>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => startPlan(plan)}
                className="premium-button flex-1 !py-2"
              >
                Start Workout
              </button>
              {plan.isCustom && user && (
                <button
                  onClick={async () => {
                    if (confirm("Delete this plan?")) {
                      await deleteTemplate(user.uid, plan.id);
                      load();
                    }
                  }}
                  className="rounded-2xl bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </section>

      {showNewPlan && user && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border bg-white p-4 shadow-2xl sm:rounded-2xl sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Create Workout Plan</h2>
              <button onClick={() => setShowNewPlan(false)} className="text-2xl font-bold text-gray-500 hover:text-gray-700">×</button>
            </div>
            <AddWorkout user={user} onClose={() => setShowNewPlan(false)} onSave={handleSavePlan} />
          </div>
        </div>
      )}
    </div>
  );
}
