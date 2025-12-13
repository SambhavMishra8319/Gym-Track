// // // GoalModal.jsx
// // import React, { useState } from "react";

// // export default function GoalModal({ onClose, user }) {
// //   const [goal, setGoal] = useState("");

// //   const saveGoal = () => {
// //     // save goal logic (e.g., Firebase)
// //     console.log("Saving goal for user:", user.uid, goal);
// //     onClose();
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
// //       <div className="bg-white p-6 rounded-lg w-80 space-y-4">
// //         <h2 className="text-lg font-semibold">Set Your Goal</h2>
// //         <input
// //           type="text"
// //           placeholder="Enter your goal"
// //           value={goal}
// //           onChange={(e) => setGoal(e.target.value)}
// //           className="w-full border border-gray-300 rounded px-3 py-2"
// //         />
// //         <div className="flex justify-end gap-2">
// //           <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
// //             Cancel
// //           </button>
// //           <button onClick={saveGoal} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
// //             Save
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { saveGoal } from "../firebase/goals";

// export default function GoalModal({ user, onClose }) {
//   const [title, setTitle] = useState("");
//   const [target, setTarget] = useState("");
//   const [deadline, setDeadline] = useState("");

//   const handleSave = async () => {
//     if (!title || !target || !deadline) return alert("Fill all fields");
//     await saveGoal(user.uid, { title, target, deadline });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
//       <div className="bg-white w-96 p-6 rounded-2xl shadow-xl border border-gray-200">
        
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Add New Goal</h2>
//           <button
//             className="p-2 hover:bg-gray-100 rounded-full"
//             onClick={onClose}
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* FORM */}
//         <div className="space-y-4">
//           <div>
//             <label className="text-sm font-medium">Goal Title</label>
//             <input
//               type="text"
//               className="w-full mt-1 p-2 border rounded-xl bg-gray-50"
//               placeholder="Bench Press"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Target</label>
//             <input
//               type="text"
//               className="w-full mt-1 p-2 border rounded-xl bg-gray-50"
//               placeholder="100 kg"
//               value={target}
//               onChange={(e) => setTarget(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Deadline</label>
//             <input
//               type="date"
//               className="w-full mt-1 p-2 border rounded-xl bg-gray-50"
//               value={deadline}
//               onChange={(e) => setDeadline(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* BUTTONS */}
//         <div className="flex justify-end mt-5 gap-3">
//           <button
//             className="px-4 py-2 rounded-xl border"
//             onClick={onClose}
//           >
//             Cancel
//           </button>

//           <button
//             className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
//             onClick={handleSave}
//           >
//             Save Goal
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { addGoal } from "../firebase/goals";

export default function GoalModal({ user, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const saveGoal = async () => {
    if (!title.trim()) return alert("Goal title required");

    await addGoal(user.uid, {
      title,
      description,
      targetDate,
    });

    onClose(); // close and refresh
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Goal</h2>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Goal Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="e.g. Lose 5kg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="w-full p-2 border rounded mt-1"
              placeholder="Short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="text-sm font-medium">Target Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded mt-1"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            className="px-3 py-2 bg-gray-300 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md"
            onClick={saveGoal}
          >
            Save Goal
          </button>
        </div>
      </div>
    </div>
  );
}
