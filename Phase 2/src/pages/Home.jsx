import { getWorkouts, deleteWorkout } from "../firebase/exercises";
import { getGoals } from "../firebase/goals";
import Stats from "../components/Stats";
import GoalsSection from "../components/GoalsSection";
import GoalModal from "../components/GoalModal";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";

function workoutVolume(workout) {
  return (workout.exercises || []).reduce(
    (sum, ex) => sum + (ex.sets || []).reduce((s, set) => s + (Number(set.reps) || 0) * (parseFloat(set.weight) || 0), 0),
    0
  );
}

export default function Home({ user }) {
  const [entries, setEntries] = useState([]);
  const [goals, setGoals] = useState([]);
  const [addingGoal, setAddingGoal] = useState(false);
  const navigate = useNavigate();

  const loadWorkouts = async () => {
    if (!user) return setEntries([]);
    const data = await getWorkouts(user.uid);
    setEntries(data);
  };

  const loadGoals = async () => {
    if (!user) return setGoals([]);
    const data = await getGoals(user.uid);
    setGoals(data);
  };

  useEffect(() => {
    loadWorkouts();
    loadGoals();
  }, [user]);

  const summary = useMemo(() => {
    const totalVolume = entries.reduce((sum, e) => sum + workoutVolume(e), 0);
    const exerciseCount = entries.reduce((sum, e) => sum + (e.exercises?.length || 0), 0);
    return { totalVolume, exerciseCount, workouts: entries.length };
  }, [entries]);

  const handleDeleteWorkout = async (workoutId) => {
    if (!user || !confirm("Delete this workout?")) return;
    try {
      await deleteWorkout(user.uid, workoutId);
      loadWorkouts();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete workout");
    }
  };

  const handleEditWorkout = (workout) => {
    navigate("/add", { state: { workoutToEdit: workout }, replace: true });
  };

  if (!user) {
    return <div className="premium-card text-center">Please log in to see your workouts.</div>;
  }

  return (
    <div className="space-y-8">
      <section className="premium-hero overflow-hidden relative">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-300">Performance dashboard</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">Build your strongest version.</h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Log workouts with clean exercise names, track volume, follow plans, and keep analytics accurate.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button onClick={() => navigate("/add")} className="premium-button">➕ Log Workout</button>
              <button onClick={() => navigate("/templates")} className="premium-button-soft">🗓️ Open Plans</button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 xs:grid-cols-3 sm:grid-cols-3">
            <div className="metric-card">
              <p className="text-xs text-slate-300">Workouts</p>
              <p className="mt-2 text-3xl font-black">{summary.workouts}</p>
            </div>
            <div className="metric-card">
              <p className="text-xs text-slate-300">Exercises</p>
              <p className="mt-2 text-3xl font-black">{summary.exerciseCount}</p>
            </div>
            <div className="metric-card">
              <p className="text-xs text-slate-300">Volume</p>
              <p className="mt-2 text-2xl font-black">{Math.round(summary.totalVolume / 1000)}k</p>
              <p className="text-xs text-slate-400">kg</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.65fr_1fr]">
        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-300">Latest activity</p>
              <h2 className="text-2xl font-black text-white">Recent Workouts</h2>
            </div>
            <button onClick={() => navigate("/history")} className="premium-button-soft !py-2">View all</button>
          </div>

          {entries.length === 0 && (
            <div className="premium-card text-center">
              <p className="text-4xl">🏋️</p>
              <h3 className="mt-3 text-xl font-black">No workouts yet</h3>
              <p className="mt-1 text-slate-500 dark:text-slate-300">Start with your first premium log.</p>
            </div>
          )}

          <div className="space-y-4">
            {entries.slice(0, 5).map((e) => (
              <article key={e.id} className="premium-card">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                  <div>
                    <div className="text-xl font-black text-slate-900 dark:text-white">{e.date}</div>
                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                      {e.exercises?.length || 0} exercises • {Math.round(workoutVolume(e))}kg volume
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleEditWorkout(e)} className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100">Edit</button>
                    <button onClick={() => handleDeleteWorkout(e.id)} className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100">Delete</button>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {(e.exercises || []).slice(0, 4).map((ex, i) => (
                    <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/5">
                      <div className="font-bold text-slate-900 dark:text-white">{ex.name}</div>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-300">
                        {(ex.sets || []).slice(0, 3).map((s, si) => (
                          <span key={si} className="rounded-full bg-white px-2 py-1 dark:bg-white/10">
                            {s.reps || "-"} × {s.weight || "-"}kg
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="premium-card"><Stats entries={entries} /></div>
          <div className="premium-card"><GoalsSection goals={goals} onAddGoal={() => setAddingGoal(true)} /></div>
          {addingGoal && <GoalModal user={user} onClose={() => { setAddingGoal(false); loadGoals(); }} />}
        </aside>
      </div>
    </div>
  );
}
