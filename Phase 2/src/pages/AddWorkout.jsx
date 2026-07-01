import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Reorder, useDragControls } from "framer-motion";
import { addWorkout, updateWorkout, getLastExerciseData } from "../firebase/exercises";
import { EXERCISE_DATABASE, MUSCLE_GROUPS, findExercise, normalizeExerciseName, getExerciseMuscleGroup } from "../data/exerciseDatabase";

export default function AddWorkout({ user, existingWorkout = null, onClose = null, onSave = null }) {
  const navigate = useNavigate();
  const location = useLocation();
  const workoutToEdit = location.state?.workoutToEdit || existingWorkout;

  const defaultExercise = {
    name: "",
    muscleGroup: "",
    isCustom: false,
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
  const [lastExerciseData, setLastExerciseData] = useState({});
  const [selectedGroup, setSelectedGroup] = useState("All");

  const exerciseOptions = selectedGroup === "All"
    ? EXERCISE_DATABASE
    : EXERCISE_DATABASE.filter((exercise) => exercise.muscleGroup === selectedGroup);

  // 👈 FIXED: Single dragControls at top level
  const dragControls = useDragControls();

  const template = location.state?.template;

  useEffect(() => {
    if (workoutToEdit && workoutToEdit.exercises) {
      setDate(workoutToEdit.date || new Date().toISOString().slice(0, 10));
      setExercises(workoutToEdit.exercises);
    } else if (template) {
      setExercises(template.exercises);
    }
  }, [workoutToEdit, template]);

  const handleReorder = (newExercises) => {
    setExercises(newExercises);
  };

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
    const selected = findExercise(value);
    const copy = [...exercises];
    copy[exIdx] = {
      ...copy[exIdx],
      name: selected ? selected.name : value,
      muscleGroup: selected ? selected.muscleGroup : copy[exIdx].muscleGroup || "Custom",
      isCustom: !selected && Boolean(value.trim()),
    };
    setExercises(copy);
    await fetchPreviousData(selected ? selected.name : value);
  };

  const updateExerciseGroup = (exIdx, value) => {
    const copy = [...exercises];
    copy[exIdx] = {
      ...copy[exIdx],
      muscleGroup: value,
      isCustom: !findExercise(copy[exIdx].name),
    };
    setExercises(copy);
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
      const orderedExercises = exercises.map((ex, index) => {
        const canonicalName = normalizeExerciseName(ex.name);
        const selected = findExercise(ex.name);
        return {
          ...ex,
          name: canonicalName,
          originalName: ex.originalName || ex.name,
          muscleGroup: selected?.muscleGroup || ex.muscleGroup || getExerciseMuscleGroup(ex.name),
          isCustom: !selected,
          order: index
        };
      });
      
      const payload = {
        date,
        exercises: orderedExercises,
        createdAt: new Date().toISOString(),
      };
      
      if (onSave) {
        await onSave(payload);
        setExercises([defaultExercise]);
        if (onClose) onClose();
        return;
      }
      
      if (workoutToEdit?.id) {
        await updateWorkout(workoutToEdit.id, user.uid, payload);
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

  return (
    <div className="space-y-5 pb-28 md:pb-0">
      <h2 className="text-3xl font-black text-white sm:text-4xl">
        {workoutToEdit ? "Edit Workout" : "Add Workout"}
      </h2>

      <div className="premium-card">
        <label className="block text-sm">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="premium-input mt-1 max-w-xs"
        />
      </div>

      <div className="premium-card">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Exercise Database</label>
            <p className="text-xs text-gray-500">Select from saved exercises for clean analytics. You can still type a new custom exercise manually.</p>
          </div>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="premium-input !py-2 text-sm"
          >
            <option value="All">All Muscle Groups</option>
            {MUSCLE_GROUPS.filter((g) => g !== "Custom").map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
      </div>

      <datalist id="exercise-database-options">
        {exerciseOptions.map((exercise) => (
          <option key={exercise.name} value={exercise.name}>{exercise.muscleGroup}</option>
        ))}
      </datalist>

      {/* 👇 FIXED: Single dragControls shared across items */}
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
            dragListener={false}
            dragControls={dragControls}  // 👈 Shared single controls
            className="premium-card relative space-y-3 !p-3 sm:!p-4"
            id={exIdx}
          >
            {/* 👇 DRAG HANDLE */}
            <div 
              className="absolute left-3 top-4 z-10 flex h-8 w-8 touch-manipulation cursor-move items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300"
              onPointerDown={(e) => dragControls.start(e)}
            >
              ≡
            </div>
            
            {/* 👇 CONTENT */}
            <div className="pl-11 sm:pl-12">
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex-1 w-full">
                  <label className="text-xs block mb-1">
                    Exercise
                    {lastExerciseData[ex.name]?.reps && (
                      <span className="text-green-600 ml-2">
                        💪 Last: {lastExerciseData[ex.name].reps}×{lastExerciseData[ex.name].weight}
                      </span>
                    )}
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_160px]">
                    <input
                      value={ex.name}
                      onChange={(e) => updateExerciseName(exIdx, e.target.value)}
                      list="exercise-database-options"
                      className="premium-input !py-2 text-sm"
                      placeholder="Search or type new exercise"
                    />
                    <select
                      value={ex.muscleGroup || getExerciseMuscleGroup(ex.name)}
                      onChange={(e) => updateExerciseGroup(exIdx, e.target.value)}
                      className="premium-input !py-2 text-sm"
                    >
                      {MUSCLE_GROUPS.map((group) => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                  {!findExercise(ex.name) && ex.name?.trim() && (
                    <p className="mt-1 text-xs text-amber-600">Custom exercise: it will be saved and grouped under {ex.muscleGroup || "Custom"}.</p>
                  )}
                </div>

                <button
                  className="w-full rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-100 sm:w-auto"
                  onClick={() => removeExercise(exIdx)}
                >
                  Remove
                </button>
              </div>

              {/* SETS */}
              {ex.sets.map((set, setIdx) => (
                <div
                  key={setIdx}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
                >
                  <div className="w-full">
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
                      className="premium-input !py-2"
                    />
                  </div>

                  <div className="w-full">
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
                      className="premium-input !py-2"
                    />
                  </div>

                  {ex.sets.length > 1 && (
                    <button
                      className="rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-100"
                      onClick={() => removeSet(exIdx, setIdx)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <button
                  onClick={() => addSet(exIdx)}
                  className="premium-button-soft !py-2 text-sm sm:w-auto"
                >
                  + Add Set
                </button>
                
                <div className="flex-1">
                  <label className="text-xs block mb-1">Notes</label>
                  <input
                    value={ex.notes}
                    onChange={(e) => updateExerciseNotes(exIdx, e.target.value)}
                    className="premium-input !py-2"
                    placeholder="Optional notes"
                  />
                </div>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <div className="h-6" />

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <button
          onClick={addExercise}
          className="premium-button-soft sm:w-auto"
        >
          + Add Exercise
        </button>

        <button
          onClick={handleSave}
          disabled={saving}
          className="premium-button sm:w-auto disabled:opacity-60"
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
