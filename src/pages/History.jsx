
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
      <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl">Loading workouts...</p>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📜 Workout History
          </h2>
          <span className="text-2xl font-bold text-gray-700">
            {entries.length} workouts
          </span>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl p-12 shadow-xl border-4 border-dashed border-gray-200">
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
              <div key={entry.id} className="bg-white border rounded-2xl shadow-md hover:shadow-xl transition-all p-6">
                {/* Workout Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {format(new Date(entry.date), 'MMM dd, yyyy')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {entry.exercises?.length || 0} exercises •{' '}
                      {entry.exercises?.reduce((total, ex) => {
                        return total + ex.sets.reduce((setTotal, set) => setTotal + (set.reps * set.weight || 0), 0);
                      }, 0).toFixed(0)}kg total volume
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 shadow-md hover:shadow-lg transition-all"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>

                {/* Exercises */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {entry.exercises?.slice(0, 6).map((exercise, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl border-l-4 border-blue-500">
                      <div className="font-semibold text-gray-800 mb-2 truncate">
                        {exercise.name}
                      </div>
                      <div className="space-y-1 text-sm">
                        {exercise.sets.slice(0, 3).map((set, setIdx) => (
                          <div key={setIdx} className="text-gray-700">
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
