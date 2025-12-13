import React, { useEffect, useState } from "react";
import AddWorkout from "./AddWorkout";
import { getWorkouts, deleteWorkout } from "../firebase/exercises";

export default function History({ user }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingWorkout, setEditingWorkout] = useState(null);

  useEffect(() => {
    async function load() {
      if (!user) return;
      setLoading(true);
      const data = await getWorkouts(user.uid);
      setEntries(data);
      setLoading(false);
    }
    load();
  }, [user]);

  // const handleDelete=async(id)=>{
  //   if(!window.confirm("Delete this workout?")) return;
  //   await deleteWorkout(user.uid, id);
  //   setEntries(entries.filter(e=>e.id!==id));
  // }
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this workout?")) return;
  try {
    const success = await deleteWorkout(user.uid, id);
    if (!success) throw new Error("Delete failed");
    setEntries(prev => prev.filter(e => e.id !== id));
  } catch (e) {
    console.error(e);
    alert("Failed to delete workout");
  }
};

  return (
   
  <div className="pt-20 p-6">
    <h2 className="text-xl font-semibold mb-4">Workout History</h2>
    {loading && <p>Loading...</p>}
    {!loading && entries.length === 0 && <p>No workouts logged yet.</p>}
<div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="border p-3 rounded shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div>{entry.date}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingWorkout(entry)}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {entry.exercises.map((ex, i) => (
                <div key={i} className="border p-2 rounded">
                  <div className="font-medium">{ex.name}</div>
                  {ex.sets.map((s, j) => (
                    <div key={j} className="text-sm">
                      Set {j + 1}: {s.reps} reps @ {s.weight} kg
                    </div>
                  ))}
                  {ex.notes && (
                    <div className="text-xs text-gray-500">
                      Notes: {ex.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {editingWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full relative">
            <AddWorkout
              user={user}
              existingWorkout={editingWorkout}
              onClose={() => setEditingWorkout(null)}
            />
            <button
              onClick={() => setEditingWorkout(null)}
              className="absolute top-2 right-2 text-red-500 text-lg font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
