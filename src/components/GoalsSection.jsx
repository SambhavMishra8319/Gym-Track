
// // import React from "react";
// // import { Plus, Target, CalendarDays } from "lucide-react";

// // export default function GoalsSection({ onAddGoal, goals = [] }) {
// //   return (
// //     <div className="w-full mt-6 p-6 bg-white rounded-2xl shadow-md border border-gray-100">
      
// //       {/* HEADER */}
// //       <div className="flex items-center justify-between mb-4">
// //         <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
// //           <Target size={22} className="text-blue-600" />
// //           Your Goals
// //         </h2>

// //         <button
// //           onClick={onAddGoal}
// //           className="
// //             flex items-center gap-2 
// //             px-4 py-2 
// //             rounded-xl 
// //             bg-blue-600 text-white
// //             hover:bg-blue-700 transition
// //             shadow-sm
// //           "
// //         >
// //           <Plus size={18} />
// //           Add Goal
// //         </button>
// //       </div>

// //       {/* GOALS GRID */}
// //       {goals.length === 0 ? (
// //         <div className="text-center py-12 text-gray-500">
// //           No goals added yet.  
// //           <br />  
// //           <span className="text-blue-600 font-medium">
// //             Start by clicking “Add Goal”.
// //           </span>
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
// //           {goals.map((goal, index) => (
// //             <div
// //               key={index}
// //               className="
// //                 p-5 rounded-xl 
// //                 border border-gray-200 
// //                 shadow-sm 
// //                 hover:shadow-md transition 
// //                 bg-gray-50
// //               "
// //             >
// //               <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>

// //               <p className="text-gray-600 mt-1 text-sm">{goal.description}</p>

// //               <div className="flex items-center gap-2 text-blue-600 mt-3">
// //                 <CalendarDays size={18} />
// //                 <span className="text-sm">
// //                   Target: {goal.targetDate || "Not set"}
// //                 </span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import { Plus, Target, Trophy } from "lucide-react";
// import GoalModal from "./GoalModal";
// import { getGoals } from "../firebase/goals";

// export default function GoalsSection({ user }) {
//   const [goals, setGoals] = useState([]);
//   const [open, setOpen] = useState(false);

//   const loadGoals = async () => {
//     if (!user) return;
//     const data = await getGoals(user.uid);
//     setGoals(data);
//   };

//   useEffect(() => {
//     loadGoals();
//   }, [user]);

//   return (
//     <>
//       {/* GOALS HEADER */}
//       <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold flex items-center gap-2">
//             <Target className="text-blue-600" size={22} />
//             Your Goals
//           </h2>

//           <button
//             onClick={() => setOpen(true)}
//             className="px-3 py-1.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm flex items-center gap-2"
//           >
//             <Plus size={16} /> Add Goal
//           </button>
//         </div>

//         {/* GOAL LIST */}
//         {goals.length === 0 ? (
//           <div className="text-gray-500 text-sm">No goals yet. Add one!</div>
//         ) : (
//           <div className="grid grid-cols-2 gap-4">
//             {goals.map((g) => (
//               <div
//                 key={g.id}
//                 className="p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition"
//               >
//                 <div className="flex justify-between">
//                   <div className="font-semibold">{g.title}</div>
//                   <Trophy className="text-yellow-500" size={20} />
//                 </div>

//                 <div className="text-sm mt-2 text-gray-600">
//                   Target: <span className="font-medium">{g.target}</span>
//                 </div>

//                 <div className="text-xs text-gray-400 mt-1">
//                   By: {g.deadline}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* GOAL MODAL */}
//       {open && (
//         <GoalModal
//           user={user}
//           onClose={() => {
//             setOpen(false);
//             loadGoals(); // refresh after saving
//           }}
//         />
//       )}
//     </>
//   );
// }
import React from "react";

export default function GoalsSection({ goals, onAddGoal }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow border">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Your Goals</h2>
        <button
          onClick={onAddGoal}
          className="px-3 py-1 bg-green-600 text-white rounded-md"
        >
          Add Goal
        </button>
      </div>

      {goals.length === 0 && (
        <p className="text-gray-500 text-sm">You have no goals yet.</p>
      )}

      <div className="space-y-3">
        {goals.map((g) => (
          <div
            key={g.id}
            className="p-3 border rounded-md bg-gray-50 shadow-sm"
          >
            <div className="font-medium">{g.title}</div>
            <div className="text-sm text-gray-600">{g.description}</div>
            <div className="text-xs text-gray-400 mt-1">
              Target: {g.targetDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
