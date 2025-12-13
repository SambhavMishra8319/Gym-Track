import React, { useState, useEffect } from "react";

// 35import React, { useState } from "react";
import { addWorkout, updateWorkout } from "../firebase/exercises";
import { useLocation } from "react-router-dom";

export default function AddWorkout({ user, existingWorkout = null, onClose = null }) {
  const defaultExercise = { name: "", sets: [{ reps: "", weight: "" }], notes: "" };
  const [date, setDate] = useState(existingWorkout?.date || new Date().toISOString().slice(0, 10));
  const [exercises, setExercises] = useState(existingWorkout?.exercises || [defaultExercise]);
  const [saving, setSaving] = useState(false);

  const updateExerciseField = (exIdx, setIdx, field, value) => {
    const copy = [...exercises];
    copy[exIdx].sets[setIdx][field] = field === "reps" ? Number(value) : value;
    setExercises(copy);
  };

  const addExercise = () => setExercises([...exercises, { ...defaultExercise }]);
  const removeExercise = (idx) => setExercises(exercises.filter((_, i) => i !== idx));
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
    setSaving(true);
    try {
      const payload = { date, exercises, createdAt: new Date().toISOString() };
      if (existingWorkout) {
        await updateWorkout(existingWorkout.id, user.uid, payload);
        alert("Workout updated ✅");
      } else {
        await addWorkout(user.uid, payload);
        alert("Workout saved ✅");
      }
      setExercises([defaultExercise]);
      if (onClose) onClose();
    } catch (e) {
      console.error(e);
      alert("Error saving workout");
    }
    setSaving(false);
  };
const location = useLocation();
const template = location.state?.template;

useEffect(() => {
  if (template) {
    setExercises(template.exercises);
  }
}, [template]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{existingWorkout ? "Edit Workout" : "Add Workout"}</h2>
      <div className="mb-4">
        <label className="block text-sm">Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-2 border rounded mt-1" />
      </div>

      <div className="space-y-4">
        {exercises.map((ex, exIdx) => (
          <div key={exIdx} className="border p-3 rounded space-y-2">
            {/* <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="text-xs">Exercise</label>
                <input
                  value={ex.name}
                  onChange={(e) => {
                    const copy = [...exercises];
                    copy[exIdx].name = e.target.value;
                    setExercises(copy);
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="Bench Press"
                />
              </div>
              <button className="text-red-600 text-sm" onClick={() => removeExercise(exIdx)}>Remove Exercise</button>
            </div> */}
            <div className="flex flex-col md:flex-row gap-2 items-start md:items-end">
  <div className="flex-1 w-full">
    <label className="text-xs">Exercise</label>
    <input
      value={ex.name}
      onChange={(e) => {
        const copy = [...exercises];
        copy[exIdx].name = e.target.value;
        setExercises(copy);
      }}
      className="w-full p-2 border rounded"
      placeholder="Bench Press"
    />
  </div>

  <button
    className="text-red-600 text-sm w-full md:w-auto"
    onClick={() => removeExercise(exIdx)}
  >
    Remove Exercise
  </button>
</div>


            {ex.sets.map((set, setIdx) => (
//               <div key={setIdx} className="flex flex-col md:flex-row gap-4 items-start md:items-end"
// >
//                 {/* <div>
//                   <label className="text-xs">Reps</label>
//                   <input type="number" value={set.reps} onChange={(e) => updateExerciseField(exIdx, setIdx, "reps", e.target.value)} className="p-2 border rounded w-16" />
//                 </div>
//                 <div>
//                   <label className="text-xs">Weight</label>
//                   <input value={set.weight} onChange={(e) => updateExerciseField(exIdx, setIdx, "weight", e.target.value)} placeholder="kg" className="p-2 border rounded w-16" />
//                 </div> */}
//                 <button className="text-red-500 text-sm" onClick={() => removeSet(exIdx, setIdx)}>Remove Set</button>
//               </div>
<div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
  <div>
    <label className="text-xs">Reps</label>
    <input
      type="number"
      value={set.reps}
      onChange={(e) =>
        updateExerciseField(exIdx, setIdx, "reps", e.target.value)
      }
      className="p-2 border rounded w-full md:w-16"
    />
  </div>

  <div>
    <label className="text-xs">Weight</label>
    <input
      value={set.weight}
      onChange={(e) =>
        updateExerciseField(exIdx, setIdx, "weight", e.target.value)
      }
      placeholder="kg"
      className="p-2 border rounded w-full md:w-16"
    />
  </div>

  <button
    className="text-red-500 text-sm w-full md:w-auto"
    onClick={() => removeSet(exIdx, setIdx)}
  >
    Remove Set
  </button>
</div>

            ))}
            <button onClick={() => addSet(exIdx)} className="px-2 py-1 bg-gray-100 rounded text-sm">Add Set</button>

            <div>
              <label className="text-xs">Notes</label>
              <input value={ex.notes} onChange={(e) => {
                const copy = [...exercises];
                copy[exIdx].notes = e.target.value;
                setExercises(copy);
              }} className="w-full p-2 border rounded" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={addExercise} className="px-4 py-2 bg-gray-100 rounded">Add Exercise</button>
        <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">
          {saving ? "Saving..." : existingWorkout ? "Update Workout" : "Save Workout"}
        </button>
      </div>
    </div>
  );
}
