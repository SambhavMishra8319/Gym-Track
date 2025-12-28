// import React, { useEffect, useState } from "react";
// import Stats from "../components/Stats";
// import AddWorkout from "./AddWorkout";
// import GoalsSection from "../components/GoalsSection";
// import GoalModal from "../components/GoalModal";
// import { getWorkouts } from "../firebase/exercises";
// import { getGoals } from "../firebase/goals";

// export default function Home({ user }) {
//   const [entries, setEntries] = useState([]);
//   const [goals, setGoals] = useState([]);

//   const [addingWorkout, setAddingWorkout] = useState(false);
//   const [addingGoal, setAddingGoal] = useState(false);

//   const loadWorkouts = async () => {
//     if (!user) return setEntries([]);
//     const data = await getWorkouts(user.uid);
//     setEntries(data);
//   };

//   const loadGoals = async () => {
//     if (!user) return setGoals([]);
//     const data = await getGoals(user.uid);
//     setGoals(data);
//   };

//   useEffect(() => {
//     loadWorkouts();
//     loadGoals();
//   }, [user]);

//   return (
//     <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gray-100">
//       <div
//         className="
//           grid
//           grid-cols-1
//           md:grid-cols-2
//           lg:grid-cols-3
//           gap-6
//         "
//       >
//         {/* LEFT SECTION — Workouts */}
//         <div className="lg:col-span-2 space-y-4">
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="text-lg md:text-xl font-semibold">
//               Recent Workouts
//             </h2>

//             <button
//               onClick={() => setAddingWorkout(true)}
//               className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm md:text-base"
//             >
//               Add Workout
//             </button>
//           </div>

//           {addingWorkout && (
//             <div className="border p-4 rounded bg-white mb-2">
//               <AddWorkout
//                 user={user}
//                 onClose={() => {
//                   setAddingWorkout(false);
//                   loadWorkouts();
//                 }}
//               />
//             </div>
//           )}

//           {entries.length === 0 && (
//             <div className="p-4 bg-white border rounded text-center text-sm md:text-base">
//               No workouts yet.
//             </div>
//           )}

//           <div className="space-y-4">
//             {entries.slice(0, 5).map((e) => (
//               <div key={e.id} className="border p-3 rounded bg-white">
//                 <div className="flex justify-between mb-2">
//                   <div className="font-medium">{e.date}</div>
//                   <div className="text-xs text-gray-500">
//                     {new Date(e.createdAt).toLocaleString()}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   {e.exercises.map((ex, i) => (
//                     <div key={i} className="p-2 border rounded">
//                       <div className="font-semibold">{ex.name}</div>

//                       <div className="text-sm text-gray-600 mt-1">
//                         {ex.sets.map((s, si) => (
//                           <div key={si}>
//                             Set {si + 1}: {s.reps || "-"} reps @{" "}
//                             {s.weight || "-"} kg
//                           </div>
//                         ))}
//                       </div>

//                       {ex.notes && (
//                         <div className="text-xs text-gray-500 mt-1">
//                           Notes: {ex.notes}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT SIDEBAR — Stats + Goals */}
//         <div className="space-y-6">
//           <Stats entries={entries} />

//           <GoalsSection
//             goals={goals}
//             onAddGoal={() => setAddingGoal(true)}
//           />

//           {addingGoal && (
//             <GoalModal
//               user={user}
//               onClose={() => {
//                 setAddingGoal(false);
//                 loadGoals();
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/Home.jsx
// 👇 Lines 5-8: COMBINE these imports:
import { getWorkouts, deleteWorkout } from "../firebase/exercises";  // ✅ Combined
import { getGoals } from "../firebase/goals";
import Stats from "../components/Stats";
import AddWorkout from "./AddWorkout";
import GoalsSection from "../components/GoalsSection";  // ✅ Fixed typo
import GoalModal from "../components/GoalModal";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
export default function Home({ user }) {
  const [entries, setEntries] = useState([]);
  const [goals, setGoals] = useState([]);
  const [addingWorkout, setAddingWorkout] = useState(false);
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

  // 👇 NEW: Delete workout function
  const handleDeleteWorkout = async (workoutId) => {
    if (!user || !confirm("Delete this workout?")) return;
    
    try {
      // Assuming getWorkouts uses deleteDoc - adjust if needed
      await deleteWorkout(user.uid, workoutId); // You'll need this helper
      loadWorkouts(); // Refresh list
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete workout");
    }
  };

  // 👇 NEW: Edit workout function
  const handleEditWorkout = (workout) => {
    // Pass workout data to AddWorkout via state
    navigate("/add", { 
      state: { workoutToEdit: workout },
      replace: true 
    });
  };

  if (!user) {
    return (
      <div className="pt-20 px-4 text-center">
        <p>Please log in to see your workouts.</p>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gray-100">
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">
        {/* LEFT SECTION — Workouts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg md:text-xl font-semibold">
              Recent Workouts
            </h2>

            <button
              onClick={() => setAddingWorkout(true)}
              className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm md:text-base"
            >
              Add Workout
            </button>
          </div>

          {addingWorkout && (
            <div className="border p-4 rounded bg-white mb-2">
              <AddWorkout
                user={user}
                onClose={() => {
                  setAddingWorkout(false);
                  loadWorkouts();
                }}
              />
            </div>
          )}

          {entries.length === 0 && (
            <div className="p-4 bg-white border rounded text-center text-sm md:text-base">
              No workouts yet.
            </div>
          )}

          <div className="space-y-4">
            {entries.slice(0, 5).map((e) => (
              <div key={e.id} className="border p-3 rounded bg-white">
                {/* 👇 NEW: Edit/Delete buttons in header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="font-medium">{e.date}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(e.createdAt).toLocaleString()}
                    </div>
                  </div>
                  
                  {/* 👇 NEW: Action buttons */}
                  <div className="flex gap-2 ml-3 flex-shrink-0">
                    <button
                      onClick={() => handleEditWorkout(e)}
                      className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors"
                      title="Edit workout"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteWorkout(e.id)}
                      className="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors"
                      title="Delete workout"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* 👇 Existing exercises display */}
                <div className="space-y-2">
                  {e.exercises.map((ex, i) => (
                    <div key={i} className="p-2 border rounded">
                      <div className="font-semibold">{ex.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {ex.sets.map((s, si) => (
                          <div key={si}>
                            Set {si + 1}: {s.reps || "-"} reps @{" "}
                            {s.weight || "-"} kg
                          </div>
                        ))}
                      </div>
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
        </div>

        {/* RIGHT SIDEBAR — Stats + Goals (unchanged) */}
        <div className="space-y-6">
          <Stats entries={entries} />
          <GoalsSection
            goals={goals}
            onAddGoal={() => setAddingGoal(true)}
          />
          {addingGoal && (
            <GoalModal
              user={user}
              onClose={() => {
                setAddingGoal(false);
                loadGoals();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
