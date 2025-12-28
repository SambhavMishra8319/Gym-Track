// import React from 'react'

// export default function ExerciseCard({ exercise }) {
//   return (
//     <div className="border p-3 rounded bg-white">
//       <div className="font-semibold">{exercise.name}</div>
//       <div className="text-sm text-gray-600 mt-2 space-y-1">
//         {exercise.sets.map((s, i) => (
//           <div key={i}>
//             <span className="font-medium">Set {i+1}:</span> {s.reps || '-'} reps @ {s.weight || '-'} kg
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
import React from "react";

export default function ExerciseCard({ exercise }) {
  return (
    <div className="border p-3 rounded bg-white">
      <div className="font-semibold text-sm md:text-base">
        {exercise.name}
      </div>
      <div className="text-xs md:text-sm text-gray-600 mt-2 space-y-1">
        {exercise.sets.map((s, i) => (
          <div key={i}>
            <span className="font-medium">Set {i + 1}:</span>{" "}
            {s.reps || "-"} reps @ {s.weight || "-"} kg
          </div>
        ))}
      </div>
    </div>
  );
}
