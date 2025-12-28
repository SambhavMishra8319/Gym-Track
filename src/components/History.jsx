
// import React, { useEffect, useState } from "react";
// import { getWorkouts, deleteWorkout } from "../firebase/exercises";
// import AddWorkout from "../pages/AddWorkout";

// export default function History({ user }) {
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingWorkout, setEditingWorkout] = useState(null);

//   useEffect(() => {
//     async function load() {
//       setLoading(true);
//       if (!user) {
//         setEntries([]);
//         setLoading(false);
//         return;
//       }
//       const data = await getWorkouts(user.uid);
//       setEntries(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
//       setLoading(false);
//     }
//     load();
//   }, [user]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this workout?")) return;
//     try {
//       await deleteWorkout(id);
//       setEntries(entries.filter(e => e.id !== id));
//     } catch (e) {
//       console.error(e);
//       alert("Failed to delete workout");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Workout History</h2>
//       {loading && <p>Loading...</p>}
//       {!loading && entries.length === 0 && <p>No workouts logged yet.</p>}

//       <div className="space-y-4">
//         {entries.map(entry => (
//           <div key={entry.id} className="border p-3 rounded shadow-sm">
//             <div className="flex justify-between items-center mb-2">
//               <div className="font-medium">{entry.date}</div>
//               <div className="flex gap-2">
//                 <button
//                   className="text-blue-600 text-sm"
//                   onClick={() => setEditingWorkout(entry)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="text-red-600 text-sm"
//                   onClick={() => handleDelete(entry.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-2">
//               {entry.exercises.map((ex, i) => (
//                 <div key={i} className="border p-2 rounded">
//                   <div className="font-medium mb-1">{ex.name || "Exercise"}</div>
//                   {ex.sets.map((set, j) => (
//                     <div key={j} className="flex gap-4 text-sm">
//                       <div>Set {j + 1}: {set.reps} reps @ {set.weight}</div>
//                     </div>
//                   ))}
//                   {ex.notes && <div className="text-xs text-gray-500 mt-1">Notes: {ex.notes}</div>}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Edit Workout Modal */}
//       {editingWorkout && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full relative">
//             <AddWorkout
//               existingWorkout={editingWorkout}
//               userId={user.uid}
//             />
//             <button
//               className="absolute top-2 right-2 text-red-500 text-lg font-bold"
//               onClick={() => setEditingWorkout(null)}
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { getWorkouts, deleteWorkout } from "../firebase/exercises";
import AddWorkout from "../pages/AddWorkout";

export default function History({ user }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingWorkout, setEditingWorkout] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (!user) {
        setEntries([]);
        setLoading(false);
        return;
      }
      const data = await getWorkouts(user.uid);
      setEntries(
        data.sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
      setLoading(false);
    }
    load();
  }, [user]);

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this workout?"
      )
    )
      return;
    try {
      await deleteWorkout(user.uid, id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete workout");
    }
  };

  return (
    <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          Workout History
        </h2>
        {loading && <p>Loading...</p>}
        {!loading && entries.length === 0 && (
          <p>No workouts logged yet.</p>
        )}

        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="border p-3 rounded shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">{entry.date}</div>
                <div className="flex gap-2">
                  <button
                    className="text-blue-600 text-sm"
                    onClick={() => setEditingWorkout(entry)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 text-sm"
                    onClick={() =>
                      handleDelete(entry.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {entry.exercises.map((ex, i) => (
                  <div
                    key={i}
                    className="border p-2 rounded"
                  >
                    <div className="font-medium mb-1">
                      {ex.name || "Exercise"}
                    </div>
                    {ex.sets.map((set, j) => (
                      <div
                        key={j}
                        className="flex gap-4 text-sm"
                      >
                        <div>
                          Set {j + 1}: {set.reps} reps @{" "}
                          {set.weight}
                        </div>
                      </div>
                    ))}
                    {ex.notes && (
                      <div className="text-xs text-gray-500 mt-1">
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
            <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full relative max-h-[90vh] overflow-y-auto">
              <AddWorkout
                existingWorkout={editingWorkout}
                user={user}
                onClose={() => setEditingWorkout(null)}
              />
              <button
                className="absolute top-2 right-2 text-red-500 text-lg font-bold"
                onClick={() => setEditingWorkout(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
