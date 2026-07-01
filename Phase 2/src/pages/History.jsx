
// src/pages/History.jsx - FULL WORKING VERSION
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddWorkout from "./AddWorkout";
import { getWorkouts, deleteWorkout } from "../firebase/exercises";
import { format } from 'date-fns';

export default function History({ user }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      if (!user) return;
      setLoading(true);
      try {
        const data = await getWorkouts(user.uid);
        // Sort by date DESC (newest first)
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEntries(sorted);
      } catch (error) {
        console.error("Error loading workouts:", error);
      }
      setLoading(false);
    }
    load();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;
    try {
      const success = await deleteWorkout(user.uid, id);
      if (success) {
        setEntries((prev) => prev.filter((e) => e.id !== id));
        alert("✅ Workout deleted!");
      } else {
        throw new Error("Delete failed");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to delete workout");
    }
  };

  const handleEdit = (workout) => {
    // Navigate to /add with workout data
    navigate("/add", { 
      state: { workoutToEdit: workout } 
    });
  };

  if (loading) {
    return (
      <div className="premium-card text-center">
        <p className="text-xl">Loading workouts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-24 sm:space-y-6">
      <div>
        <div className="premium-hero flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="text-3xl font-black text-white sm:text-4xl md:text-5xl">
            📜 Workout History
          </h2>
          <span className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-xl font-black text-white">
            {entries.length} workouts
          </span>
        </div>

        {entries.length === 0 ? (
          <div className="premium-card text-center py-16">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No workouts yet</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Your workout history will appear here. Start logging workouts!
            </p>
            <button
              onClick={() => navigate("/add")}
              className="px-8 py-4 bg-blue-600 text-white text-lg rounded-2xl font-bold hover:bg-blue-700 shadow-xl hover:shadow-2xl transition-all"
            >
              ➕ Log First Workout
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div key={entry.id} className="premium-card">
                {/* Workout Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <div className="text-xl font-black text-slate-900 dark:text-white mb-1 sm:text-2xl">
                      {format(new Date(entry.date), 'MMM dd, yyyy')}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-300">
                      {entry.exercises?.length || 0} exercises •{' '}
                      {entry.exercises?.reduce((total, ex) => {
                        return total + ex.sets.reduce((setTotal, set) => setTotal + (set.reps * set.weight || 0), 0);
                      }, 0).toFixed(0)}kg total volume
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-600"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>

                {/* Exercises */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {entry.exercises?.slice(0, 6).map((exercise, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="font-bold text-slate-900 dark:text-white mb-2 truncate">
                        {exercise.name}
                      </div>
                      <div className="space-y-1 text-sm">
                        {exercise.sets.slice(0, 3).map((set, setIdx) => (
                          <div key={setIdx} className="text-slate-600 dark:text-slate-300">
                            {set.reps} × {set.weight}kg
                          </div>
                        ))}
                        {exercise.sets.length > 3 && (
                          <div className="text-xs text-gray-500">+{exercise.sets.length - 3} more sets</div>
                        )}
                      </div>
                    </div>
                  ))}
                  {entry.exercises?.length > 6 && (
                    <div className="md:col-span-2 lg:col-span-3 p-8 text-center text-gray-500">
                      +{entry.exercises.length - 6} more exercises
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal - OPTIONAL (if you want modal editing) */}
        {editingWorkout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Edit Workout</h3>
                <button
                  onClick={() => setEditingWorkout(null)}
                  className="text-2xl font-bold text-gray-500 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-200"
                >
                  ×
                </button>
              </div>
              <AddWorkout
                user={user}
                existingWorkout={editingWorkout}
                onClose={() => setEditingWorkout(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
