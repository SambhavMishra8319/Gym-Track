// // src/pages/AddWorkout.jsx (REPLACE with this drag-drop version)
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Reorder } from "framer-motion"; // 👈 DRAG DROP
// import { addWorkout, updateWorkout } from "../firebase/exercises";
// import { getLastExerciseData } from "../firebase/exercises";
// export default function AddWorkout({ user, existingWorkout = null, onClose = null }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const workoutToEdit = location.state?.workoutToEdit || existingWorkout;

//   const defaultExercise = {
//     name: "",
//     sets: [{ reps: "", weight: "" }],
//     notes: "",
//   };

//   const [date, setDate] = useState(
//     workoutToEdit?.date || new Date().toISOString().slice(0, 10)
//   );
//   const [exercises, setExercises] = useState(
//     workoutToEdit?.exercises || [defaultExercise]
//   );
//   const [saving, setSaving] = useState(false);

//   const template = location.state?.template;
// const [lastExerciseData, setLastExerciseData] = useState({});
//   useEffect(() => {
//     if (workoutToEdit && workoutToEdit.exercises) {
//       setDate(workoutToEdit.date || new Date().toISOString().slice(0, 10));
//       setExercises(workoutToEdit.exercises);
//     } else if (template) {
//       setExercises(template.exercises);
//     }
//   }, [workoutToEdit, template]);

//   // 👇 DRAG DROP: Reorder exercises
//   const handleReorder = (newExercises) => {
//     setExercises(newExercises);
//   };

//   const updateExerciseField = (exIdx, setIdx, field, value) => {
//     const copy = [...exercises];
//     copy[exIdx].sets[setIdx][field] =
//       field === "reps" ? Number(value) : value;
//     setExercises(copy);
//   };

//   const updateExerciseName = (exIdx, value) => {
//     const copy = [...exercises];
//     copy[exIdx].name = value;
//     setExercises(copy);
//   };

//   const updateExerciseNotes = (exIdx, value) => {
//     const copy = [...exercises];
//     copy[exIdx].notes = value;
//     setExercises(copy);
//   };

//   const addExercise = () =>
//     setExercises([...exercises, { ...defaultExercise }]);

//   const removeExercise = (idx) =>
//     setExercises(exercises.filter((_, i) => i !== idx));

//   const addSet = (exIdx) => {
//     const copy = [...exercises];
//     copy[exIdx].sets.push({ reps: "", weight: "" });
//     setExercises(copy);
//   };

//   const removeSet = (exIdx, setIdx) => {
//     const copy = [...exercises];
//     copy[exIdx].sets.splice(setIdx, 1);
//     setExercises(copy);
//   };

//   const handleSave = async () => {
//     if (!user) return alert("Sign in to save workouts");
    
//     if (exercises.some(ex => !ex.name.trim())) {
//       return alert("Please fill all exercise names");
//     }
    
//     setSaving(true);
//     try {
//       // 👇 SAVE EXERCISE ORDER
//       const orderedExercises = exercises.map((ex, index) => ({
//         ...ex,
//         order: index // 👈 Save drag-drop position
//       }));
      
//       const payload = {
//         date,
//         exercises: orderedExercises,
//         createdAt: new Date().toISOString(),
//       };
      
//       if (workoutToEdit?.id) {
//         await updateWorkout(workoutToEdit.id, user.uid, payload);
//         alert("Workout updated ✅");
//       } else {
//         await addWorkout(user.uid, payload);
//         alert("Workout saved ✅");
//       }
      
//       setExercises([defaultExercise]);
//       if (onClose) onClose();
//     } catch (e) {
//       console.error(e);
//       alert("Error saving workout");
//     }
//     setSaving(false);
//   };

//   return (
//     <div className="pb-24 md:pb-0">
//       <h2 className="text-xl font-semibold mb-4">
//         {workoutToEdit ? "Edit Workout" : "Add Workout"}
//       </h2>

//       <div className="mb-4">
//         <label className="block text-sm">Date</label>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="p-2 border rounded mt-1 w-full max-w-xs"
//         />
//       </div>

//       {/* 👇 DRAG & DROP EXERCISES */}
//       <Reorder.Group 
//         axis="y" 
//         values={exercises} 
//         onReorder={handleReorder}
//         className="space-y-4"
//       >
//         {exercises.map((ex, exIdx) => (
//           <Reorder.Item 
//             key={exIdx} 
//             value={ex} 
//             className="border p-3 rounded space-y-3 bg-white cursor-grab active:cursor-grabbing hover:shadow-md transition-all"
//             id={exIdx}
//           >
//             {/* 👇 DRAG HANDLE */}
//             <div className="flex items-center gap-2 mb-3">
//               <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold cursor-move hover:bg-gray-300 transition-colors">
//                 ≡
//               </div>
              
//               <div className="flex-1 w-full">
//                 <label className="text-xs">Exercise</label>
//                 <input
//                   value={ex.name}
//                   onChange={(e) => updateExerciseName(exIdx, e.target.value)}
//                   className="w-full p-2 border rounded"
//                   placeholder="Bench Press"
//                 />
//               </div>

//               <button
//                 className="text-red-600 text-sm w-24 md:w-auto"
//                 onClick={() => removeExercise(exIdx)}
//               >
//                 Remove
//               </button>
//             </div>

//             {ex.sets.map((set, setIdx) => (
//               <div
//                 key={setIdx}
//                 className="flex flex-col md:flex-row gap-4 items-start md:items-end"
//               >
//                 <div className="w-full md:w-auto">
//                   <label className="text-xs">Reps</label>
//                   <input
//                     type="number"
//                     value={set.reps}
//                     onChange={(e) =>
//                       updateExerciseField(
//                         exIdx,
//                         setIdx,
//                         "reps",
//                         e.target.value
//                       )
//                     }
//                     className="p-2 border rounded w-full md:w-20"
//                   />
//                 </div>

//                 <div className="w-full md:w-auto">
//                   <label className="text-xs">Weight</label>
//                   <input
//                     value={set.weight}
//                     onChange={(e) =>
//                       updateExerciseField(
//                         exIdx,
//                         setIdx,
//                         "weight",
//                         e.target.value
//                       )
//                     }
//                     placeholder="kg"
//                     className="p-2 border rounded w-full md:w-24"
//                   />
//                 </div>

//                 {ex.sets.length > 1 && (
//                   <button
//                     className="text-red-500 text-sm w-full md:w-auto"
//                     onClick={() => removeSet(exIdx, setIdx)}
//                   >
//                     ×
//                   </button>
//                 )}
//               </div>
//             ))}

//             <div className="flex gap-2">
//               <button
//                 onClick={() => addSet(exIdx)}
//                 className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200"
//               >
//                 + Add Set
//               </button>
              
//               <div className="flex-1">
//                 <label className="text-xs">Notes</label>
//                 <input
//                   value={ex.notes}
//                   onChange={(e) => updateExerciseNotes(exIdx, e.target.value)}
//                   className="w-full p-2 border rounded"
//                   placeholder="Optional notes"
//                 />
//               </div>
//             </div>
//           </Reorder.Item>
//         ))}
//       </Reorder.Group>

//       <div className="h-6" />

//       <div className="flex flex-col sm:flex-row gap-2 mt-4">
//         <button
//           onClick={addExercise}
//           className="px-4 py-2 bg-gray-100 rounded w-full sm:w-auto hover:bg-gray-200"
//         >
//           + Add Exercise
//         </button>
//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="px-6 py-2 bg-blue-600 text-white rounded-md w-full sm:w-auto hover:bg-blue-700 disabled:opacity-60 font-medium"
//         >
//           {saving
//             ? "Saving..."
//             : workoutToEdit
//             ? "Update Workout"
//             : "Save Workout"}
//         </button>
//       </div>

//       {onClose && (
//         <button
//           onClick={onClose}
//           className="w-full p-2 text-sm text-gray-500 border-t border-gray-200 mt-4 hover:text-gray-700"
//         >
//           Cancel
//         </button>
//       )}
//     </div>
//   );
// }
// src/pages/AddWorkout.jsx (REPLACE ENTIRE FILE)
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Reorder } from "framer-motion";
import { addWorkout, updateWorkout, getLastExerciseData } from "../firebase/exercises";

export default function AddWorkout({ user, existingWorkout = null, onClose = null ,onSave = null  }) {
  const navigate = useNavigate();
  const location = useLocation();
  const workoutToEdit = location.state?.workoutToEdit || existingWorkout;

  const defaultExercise = {
    name: "",
    sets: [{ reps: "", weight: "" }],
    notes: "",
  };

  const [date, setDate] = useState(
    workoutToEdit?.date || new Date().toISOString().slice(0, 10)
  );
  const [exercises, setExercises] = useState(
    workoutToEdit?.exercises || [defaultExercise]
  );
  const [saving, setSaving] = useState(false);
  const [lastExerciseData, setLastExerciseData] = useState({}); // 👈 PREVIOUS DATA

  const template = location.state?.template;

  useEffect(() => {
    if (workoutToEdit && workoutToEdit.exercises) {
      setDate(workoutToEdit.date || new Date().toISOString().slice(0, 10));
      setExercises(workoutToEdit.exercises);
    } else if (template) {
      setExercises(template.exercises);
    }
  }, [workoutToEdit, template]);

  // 👇 DRAG DROP: Reorder exercises
  const handleReorder = (newExercises) => {
    setExercises(newExercises);
  };

  // 👇 FETCH PREVIOUS EXERCISE DATA WHEN NAME CHANGES
  const fetchPreviousData = async (exerciseName) => {
    if (!exerciseName.trim() || !user) return;
    
    try {
      const data = await getLastExerciseData(user.uid, exerciseName.trim());
      if (data) {
        setLastExerciseData(prev => ({
          ...prev,
          [exerciseName.trim()]: data
        }));
      }
    } catch (err) {
      console.error("Previous data error:", err);
    }
  };

  const updateExerciseField = (exIdx, setIdx, field, value) => {
    const copy = [...exercises];
    copy[exIdx].sets[setIdx][field] =
      field === "reps" ? Number(value) : value;
    setExercises(copy);
  };

  const updateExerciseName = async (exIdx, value) => {
    const copy = [...exercises];
    copy[exIdx].name = value;
    setExercises(copy);
    
    // 👇 FETCH PREVIOUS DATA INSTANTLY
    await fetchPreviousData(value);
  };

  const updateExerciseNotes = (exIdx, value) => {
    const copy = [...exercises];
    copy[exIdx].notes = value;
    setExercises(copy);
  };

  const addExercise = () =>
    setExercises([...exercises, { ...defaultExercise }]);

  const removeExercise = (idx) =>
    setExercises(exercises.filter((_, i) => i !== idx));

  const addSet = (exIdx) => {
    const copy = [...exercises];
    copy[exIdx].sets.push({ reps: "", weight: "" });
    setExercises(copy);
  };

  const removeSet = (exIdx, setIdx) => {
    const copy = [...exercises];
    copy[exIdx].sets.splice(setIdx, 1);
    setExercises(copy);
  };
const handleSave = async () => {
  if (!user) return alert("Sign in to save workouts");
  
  if (exercises.some(ex => !ex.name.trim())) {
    return alert("Please fill all exercise names");
  }
  
  setSaving(true);
  try {
    const orderedExercises = exercises.map((ex, index) => ({
      ...ex,
      order: index
    }));
    
    const payload = {
      date,
      exercises: orderedExercises,
      createdAt: new Date().toISOString(),
    };
    
    // 👇 TEMPLATES: Use onSave if provided
    if (onSave) {
      await onSave(payload);
      setExercises([defaultExercise]);
      if (onClose) onClose();
      return;
    }
    
    // 👇 NORMAL WORKOUTS: Save to workouts collection
    if (workoutToEdit?.id) {
      await updateWorkout(workoutToEdit.id, user.uid, payload);
      alert("Workout updated ✅");
    } else {
      await addWorkout(user.uid, payload);
      alert("Workout saved ✅");
    }
    
    // 👇 Reset form ONLY for normal workouts
    setExercises([defaultExercise]);
    if (onClose) onClose();
  } catch (e) {
    console.error(e);
    alert("Error saving workout");
  }
  setSaving(false);
};

  // const handleSave = async () => {
  //   if (!user) return alert("Sign in to save workouts");
    
  //   if (exercises.some(ex => !ex.name.trim())) {
  //     return alert("Please fill all exercise names");
  //   }
    
  //   setSaving(true);
  //   try {
  //     // 👇 SAVE EXERCISE ORDER
  //     const orderedExercises = exercises.map((ex, index) => ({
  //       ...ex,
  //       order: index
  //     }));
      
  //     const payload = {
  //       date,
  //       exercises: orderedExercises,
  //       createdAt: new Date().toISOString(),
  //     };
      
  //     if (workoutToEdit?.id) {
  //       await updateWorkout(workoutToEdit.id, user.uid, payload);
  //       alert("Workout updated ✅");
  //     } else {
  //       await addWorkout(user.uid, payload);
  //       alert("Workout saved ✅");
  //     }
      
  //     setExercises([defaultExercise]);
  //     if (onClose) onClose();
  //   } catch (e) {
  //     console.error(e);
  //     alert("Error saving workout");
  //   }
  //   setSaving(false);
  // };

  return (
    <div className="pb-24 md:pb-0">
      <h2 className="text-xl font-semibold mb-4">
        {workoutToEdit ? "Edit Workout" : "Add Workout"}
      </h2>

      <div className="mb-4">
        <label className="block text-sm">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded mt-1 w-full max-w-xs"
        />
      </div>

      {/* 👇 DRAG & DROP WITH PREVIOUS DATA */}
      <Reorder.Group 
        axis="y" 
        values={exercises} 
        onReorder={handleReorder}
        className="space-y-4"
      >
        {exercises.map((ex, exIdx) => (
          <Reorder.Item 
            key={exIdx} 
            value={ex} 
            className="border p-3 rounded space-y-3 bg-white cursor-grab active:cursor-grabbing hover:shadow-md transition-all"
            id={exIdx}
          >
            {/* 👇 DRAG HANDLE + EXERCISE WITH PREVIOUS DATA */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold cursor-move hover:bg-gray-300 transition-colors">
                ≡
              </div>
              
              <div className="flex-1 w-full">
                <label className="text-xs block mb-1">
                  Exercise
                  {lastExerciseData[ex.name]?.reps && (
                    <span className="text-green-600 ml-2">
                      💪 Last: {lastExerciseData[ex.name].reps}×{lastExerciseData[ex.name].weight}
                    </span>
                  )}
                </label>
                <input
                  value={ex.name}
                  onChange={(e) => updateExerciseName(exIdx, e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                  placeholder="Type exercise name (Bench Press, Squat...)"
                />
              </div>

              <button
                className="text-red-600 text-sm w-20 px-2 py-1 rounded hover:bg-red-50"
                onClick={() => removeExercise(exIdx)}
              >
                Remove
              </button>
            </div>

            {/* 👇 SETS WITH PREVIOUS DATA HINTS */}
            {ex.sets.map((set, setIdx) => (
              <div
                key={setIdx}
                className="flex flex-col md:flex-row gap-4 items-start md:items-end"
              >
                <div className="w-full md:w-auto flex-1">
                  <label className="text-xs block mb-1">
                    Set {setIdx + 1} Reps
                    {lastExerciseData[ex.name] && setIdx === 0 && (
                      <span className="text-green-600 text-xs ml-2">
                        (last: {lastExerciseData[ex.name].reps})
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    value={set.reps}
                    onChange={(e) =>
                      updateExerciseField(
                        exIdx,
                        setIdx,
                        "reps",
                        e.target.value
                      )
                    }
                    className="p-2 border rounded w-full md:w-20"
                  />
                </div>

                <div className="w-full md:w-auto">
                  <label className="text-xs block mb-1">
                    Weight
                    {lastExerciseData[ex.name] && setIdx === 0 && (
                      <span className="text-green-600 text-xs ml-2">
                        (last: {lastExerciseData[ex.name].weight}kg)
                      </span>
                    )}
                  </label>
                  <input
                    value={set.weight}
                    onChange={(e) =>
                      updateExerciseField(
                        exIdx,
                        setIdx,
                        "weight",
                        e.target.value
                      )
                    }
                    placeholder="kg"
                    className="p-2 border rounded w-full md:w-24"
                  />
                </div>

                {ex.sets.length > 1 && (
                  <button
                    className="text-red-500 text-sm px-2 py-1 rounded hover:bg-red-100"
                    onClick={() => removeSet(exIdx, setIdx)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            <div className="flex gap-3 items-end">
              <button
                onClick={() => addSet(exIdx)}
                className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 flex-shrink-0"
              >
                + Add Set
              </button>
              
              <div className="flex-1">
                <label className="text-xs block mb-1">Notes</label>
                <input
                  value={ex.notes}
                  onChange={(e) => updateExerciseNotes(exIdx, e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Optional notes"
                />
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <div className="h-6" />

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <button
          onClick={addExercise}
          className="px-4 py-2 bg-gray-100 rounded w-full sm:w-auto hover:bg-gray-200"
        >
          + Add Exercise
        </button>
        {/* 👇 DEBUG BUTTON - ADD TEMPORARILY */}
{/* <button 
  onClick={async () => {
    console.log("User:", user?.uid);
    console.log("Testing Bench Press data...");
    const data = await getLastExerciseData(user?.uid, "Bench Press");
    console.log("Previous data result:", data);
  }}
  className="px-4 py-2 bg-yellow-500 text-white rounded"
>
  🔍 DEBUG Previous Data
</button> */}

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-md w-full sm:w-auto hover:bg-blue-700 disabled:opacity-60 font-medium"
        >
          {saving
            ? "Saving..."
            : workoutToEdit
            ? "Update Workout"
            : "Save Workout"}
        </button>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="w-full p-2 text-sm text-gray-500 border-t border-gray-200 mt-4 hover:text-gray-700"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
