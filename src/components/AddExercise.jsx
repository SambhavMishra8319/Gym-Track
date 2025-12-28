// import React, { useState } from 'react'

// export default function AddExercise({ onRemove, onChange, index, exercise }) {
//   // exercise: { name, sets: [{reps, weight}, ...] }
//   const handleName = (e) => {
//     onChange(index, { ...exercise, name: e.target.value })
//   }

//   const handleSetChange = (setIdx, field, value) => {
//     const newSets = exercise.sets.map((s, i) => i === setIdx ? { ...s, [field]: value } : s)
//     onChange(index, { ...exercise, sets: newSets })
//   }

//   const addSet = () => {
//     onChange(index, { ...exercise, sets: [...exercise.sets, { reps: '', weight: '' }] })
//   }

//   const removeSet = (setIdx) => {
//     const newSets = exercise.sets.filter((_, i) => i !== setIdx)
//     onChange(index, { ...exercise, sets: newSets })
//   }

//   return (
//     <div className="border p-3 rounded bg-white">
//       <div className="flex justify-between items-center mb-2">
//         <input value={exercise.name} onChange={handleName} placeholder="Exercise name" className="p-2 border rounded w-full" />
//         <button onClick={() => onRemove(index)} className="ml-2 text-red-500">Remove</button>
//       </div>

//       <div className="space-y-2">
//         {exercise.sets.map((s, si) => (
//           <div key={si} className="flex items-center gap-2">
//             <div className="font-medium w-12">Set {si+1}</div>
//             <input value={s.reps} onChange={(e)=>handleSetChange(si,'reps',e.target.value)} placeholder="Reps" className="p-2 border rounded w-24" />
//             <input value={s.weight} onChange={(e)=>handleSetChange(si,'weight',e.target.value)} placeholder="Weight" className="p-2 border rounded w-24" />
//             <button onClick={()=>removeSet(si)} className="text-red-500 px-2">✖</button>
//           </div>
//         ))}
//       </div>

//       <div className="mt-3">
//         <button onClick={addSet} className="px-3 py-1 bg-gray-100 rounded">+ Add Set</button>
//       </div>
//     </div>
//   )
// }
import React from "react";

export default function AddExercise({ onRemove, onChange, index, exercise }) {
  const handleName = (e) => {
    onChange(index, { ...exercise, name: e.target.value });
  };

  const handleSetChange = (setIdx, field, value) => {
    const newSets = exercise.sets.map((s, i) =>
      i === setIdx ? { ...s, [field]: value } : s
    );
    onChange(index, { ...exercise, sets: newSets });
  };

  const addSet = () => {
    onChange(index, {
      ...exercise,
      sets: [...exercise.sets, { reps: "", weight: "" }],
    });
  };

  const removeSet = (setIdx) => {
    const newSets = exercise.sets.filter((_, i) => i !== setIdx);
    onChange(index, { ...exercise, sets: newSets });
  };

  return (
    <div className="border p-3 rounded bg-white">
      <div className="flex gap-2 mb-2">
        <input
          value={exercise.name}
          onChange={handleName}
          placeholder="Exercise name"
          className="p-2 border rounded w-full text-sm"
        />
        <button
          onClick={() => onRemove(index)}
          className="px-2 text-red-500 text-sm"
        >
          Remove
        </button>
      </div>

      <div className="space-y-2">
        {exercise.sets.map((s, si) => (
          <div
            key={si}
            className="flex flex-wrap items-center gap-2 text-sm"
          >
            <div className="font-medium w-14">Set {si + 1}</div>
            <input
              value={s.reps}
              onChange={(e) =>
                handleSetChange(si, "reps", e.target.value)
              }
              placeholder="Reps"
              className="p-2 border rounded w-20"
            />
            <input
              value={s.weight}
              onChange={(e) =>
                handleSetChange(si, "weight", e.target.value)
              }
              placeholder="Weight"
              className="p-2 border rounded w-24"
            />
            <button
              onClick={() => removeSet(si)}
              className="text-red-500 px-2"
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <button
          onClick={addSet}
          className="px-3 py-1 bg-gray-100 rounded text-sm"
        >
          + Add Set
        </button>
      </div>
    </div>
  );
}
