
// // import React, { useEffect, useState } from "react";
// // import Stats from "../components/Stats";
// // import AddWorkout from "./AddWorkout";
// // import GoalsSection from "../components/GoalsSection"; // import Goals
// // import { getWorkouts } from "../firebase/exercises";

// // export default function Home({ user }) {
// //   const [entries, setEntries] = useState([]);
// //   const [addingWorkout, setAddingWorkout] = useState(false);

// //   const loadWorkouts = async () => {
// //     if (!user) return setEntries([]);
// //     const data = await getWorkouts(user.uid);
// //     setEntries(data);
// //   };

// //   useEffect(() => {
// //     loadWorkouts();
// //   }, [user]);

// //   return (
// //     <div className="grid grid-cols-3 gap-6">
// //       {/* LEFT SECTION: Recent Workouts + Goals */}
// //       <div className="col-span-2 space-y-4">
// //         {/* Goals Section */}
// //         <GoalsSection user={user} />

// //         {/* Recent Workouts Header */}
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-xl font-semibold">Recent Workouts</h2>
// //           <button
// //             onClick={() => setAddingWorkout(true)}
// //             className="px-3 py-1 bg-blue-500 text-white rounded"
// //           >
// //             Add Workout
// //           </button>
// //         </div>

// //         {addingWorkout && (
// //           <div className="border p-4 rounded bg-white mb-4">
// //             <AddWorkout
// //               user={user}
// //               onClose={() => {
// //                 setAddingWorkout(false);
// //                 loadWorkouts(); // refresh list after saving
// //               }}
// //             />
// //           </div>
// //         )}

// //         {entries.length === 0 && (
// //           <div className="p-4 bg-white border rounded">No workouts yet.</div>
// //         )}

// //         {/* Recent Workout List */}
// //         <div className="space-y-4">
// //           {entries.slice(0, 5).map((e) => (
// //             <div key={e.id} className="border p-3 rounded bg-white">
// //               <div className="flex justify-between mb-2">
// //                 <div className="font-medium">{e.date}</div>
// //                 <div className="text-xs text-gray-500">
// //                   {new Date(e.createdAt).toLocaleString()}
// //                 </div>
// //               </div>
// //               <div className="space-y-2">
// //                 {e.exercises.map((ex, i) => (
// //                   <div key={i} className="p-2 border rounded">
// //                     <div className="font-semibold">{ex.name}</div>
// //                     <div className="text-sm text-gray-600 mt-1">
// //                       {ex.sets.map((s, si) => (
// //                         <div key={si}>
// //                           Set {si + 1}: {s.reps || "-"} reps @ {s.weight || "-"} kg
// //                         </div>
// //                       ))}
// //                     </div>
// //                     {ex.notes && (
// //                       <div className="text-xs text-gray-500 mt-1">Notes: {ex.notes}</div>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* RIGHT SECTION: Stats */}
// //       <div>
// //         <Stats entries={entries} />
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import Stats from "../components/Stats";
// import AddWorkout from "./AddWorkout";
// import GoalsSection from "../components/GoalsSection";
// import GoalModal from "../components/GoalModal";

// import { getWorkouts } from "../firebase/exercises";
// import { getGoals } from "../firebase/goals";  // <-- You'll create this file

// export default function Home({ user }) {
//   const [entries, setEntries] = useState([]);
//   const [goals, setGoals] = useState([]);

//   const [addingWorkout, setAddingWorkout] = useState(false);
//   const [addingGoal, setAddingGoal] = useState(false);

//   // LOAD WORKOUTS
//   const loadWorkouts = async () => {
//     if (!user) return setEntries([]);
//     const data = await getWorkouts(user.uid);
//     setEntries(data);
//   };

//   // LOAD GOALS
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
//     <div className="grid grid-cols-3 gap-6">
//       {/* LEFT SECTION (2 columns): Workouts */}
//       <div className="col-span-2 space-y-4">
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Recent Workouts</h2>

//           <button
//             onClick={() => setAddingWorkout(true)}
//             className="px-3 py-1 bg-blue-600 text-white rounded-md"
//           >
//             Add Workout
//           </button>
//         </div>

//         {/* ADD WORKOUT MODAL */}
//         {addingWorkout && (
//           <div className="border p-4 rounded bg-white mb-4">
//             <AddWorkout
//               user={user}
//               onClose={() => {
//                 setAddingWorkout(false);
//                 loadWorkouts();
//               }}
//             />
//           </div>
//         )}

//         {/* EMPTY STATE */}
//         {entries.length === 0 && (
//           <div className="p-4 bg-white border rounded">No workouts yet.</div>
//         )}

//         {/* RECENT WORKOUTS LIST */}
//         <div className="space-y-4">
//           {entries.slice(0, 5).map((e) => (
//             <div key={e.id} className="border p-3 rounded bg-white">
//               <div className="flex justify-between mb-2">
//                 <div className="font-medium">{e.date}</div>
//                 <div className="text-xs text-gray-500">
//                   {new Date(e.createdAt).toLocaleString()}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 {e.exercises.map((ex, i) => (
//                   <div key={i} className="p-2 border rounded">
//                     <div className="font-semibold">{ex.name}</div>

//                     <div className="text-sm text-gray-600 mt-1">
//                       {ex.sets.map((s, si) => (
//                         <div key={si}>
//                           Set {si + 1}: {s.reps || "-"} reps @{" "}
//                           {s.weight || "-"} kg
//                         </div>
//                       ))}
//                     </div>

//                     {ex.notes && (
//                       <div className="text-xs text-gray-500 mt-1">
//                         Notes: {ex.notes}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* RIGHT SECTION — Stats + Goals */}
//       <div className="space-y-6">
//         {/* STATS */}
//         <Stats entries={entries} />

//         {/* GOALS SECTION */}
//         <GoalsSection goals={goals} onAddGoal={() => setAddingGoal(true)} />

//         {/* GOAL MODAL */}
//         {addingGoal && (
//           <GoalModal
//             user={user}
//             onClose={() => {
//               setAddingGoal(false);
//               loadGoals(); // refresh goals
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import Stats from "../components/Stats";
import AddWorkout from "./AddWorkout";
import GoalsSection from "../components/GoalsSection";
import GoalModal from "../components/GoalModal";

import { getWorkouts } from "../firebase/exercises";
import { getGoals } from "../firebase/goals";

export default function Home({ user }) {
  const [entries, setEntries] = useState([]);
  const [goals, setGoals] = useState([]);

  const [addingWorkout, setAddingWorkout] = useState(false);
  const [addingGoal, setAddingGoal] = useState(false);

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

  return (
    <div
      className="
        grid 
        grid-cols-1       /* mobile */
        md:grid-cols-2    /* tablet */
        lg:grid-cols-3    /* desktop */
        gap-6 pt-4
      "
    >
      {/* LEFT SECTION — Workouts */}
      <div className="lg:col-span-2 space-y-4">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold">Recent Workouts</h2>

          <button
            onClick={() => setAddingWorkout(true)}
            className="px-3 py-1 bg-blue-600 text-white rounded-md"
          >
            Add Workout
          </button>
        </div>

        {/* ADD WORKOUT MODAL */}
        {addingWorkout && (
          <div className="border p-4 rounded bg-white mb-4">
            <AddWorkout
              user={user}
              onClose={() => {
                setAddingWorkout(false);
                loadWorkouts();
              }}
            />
          </div>
        )}

        {/* EMPTY STATE */}
        {entries.length === 0 && (
          <div className="p-4 bg-white border rounded text-center">
            No workouts yet.
          </div>
        )}

        {/* WORKOUT LIST */}
        <div className="space-y-4">
          {entries.slice(0, 5).map((e) => (
            <div key={e.id} className="border p-3 rounded bg-white">
              <div className="flex justify-between mb-2">
                <div className="font-medium">{e.date}</div>
                <div className="text-xs text-gray-500">
                  {new Date(e.createdAt).toLocaleString()}
                </div>
              </div>

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

      {/* RIGHT SIDEBAR (Stats + Goals) */}
      <div className="space-y-6">
        <Stats entries={entries} />

        <GoalsSection goals={goals} onAddGoal={() => setAddingGoal(true)} />

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
  );
}
