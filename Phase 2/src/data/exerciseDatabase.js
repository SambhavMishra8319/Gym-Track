export const EXERCISE_DATABASE = [
  { name: "Flat Bench Press", muscleGroup: "Chest", aliases: ["flat bench", "flat bench press", "falt bench press", "bench press"] },
  { name: "Incline Bench Press", muscleGroup: "Chest", aliases: ["incline bench", "incline bench press", "incline dumbbell press", "incline dumbell press", "incline db press"] },
  { name: "Decline Bench Press", muscleGroup: "Chest", aliases: ["decline bench", "decline bench press", "decline dumbbell press", "decline db press"] },
  { name: "Flat Dumbbell Press", muscleGroup: "Chest", aliases: ["flat dumbbell press", "falt dumbbell press", "flat db press"] },
  { name: "Chest Fly", muscleGroup: "Chest", aliases: ["chest fly", "butterfly", "pec deck"] },

  { name: "Deadlift", muscleGroup: "Back", aliases: ["deadlift", "dead lift"] },
  { name: "Lat Pulldown", muscleGroup: "Back", aliases: ["lat pulldown", "lat pull down"] },
  { name: "Close Grip Lat Pulldown", muscleGroup: "Back", aliases: ["close grip", "close grip lat pulldown", "close grip pulldown"] },
  { name: "Seated Row", muscleGroup: "Back", aliases: ["seated row", "one rod pull", "one arm row", "cable row"] },
  { name: "Barbell Row", muscleGroup: "Back", aliases: ["barbell row", "bent over row"] },

  { name: "Shoulder Press", muscleGroup: "Shoulders", aliases: ["shoulder press", "military press", "overhead press"] },
  { name: "Front Raise", muscleGroup: "Shoulders", aliases: ["front delt", "front delt raise", "front deldroid", "front deltoid", "front raise"] },
  { name: "Lateral Raise", muscleGroup: "Shoulders", aliases: ["side delt", "side deldroid", "side deltoid", "side raise", "lateral raise"] },
  { name: "Rear Delt Fly", muscleGroup: "Shoulders", aliases: ["back delt", "back delt raise", "back deltroid", "rear delt", "rear delt fly"] },
  { name: "Upright Row", muscleGroup: "Shoulders", aliases: ["upright row", "uptight rows", "upright rows"] },
  { name: "Shrugs", muscleGroup: "Shoulders", aliases: ["shrugs", "shoulder shrugs"] },

  { name: "Barbell Curl", muscleGroup: "Biceps", aliases: ["barbell curl", "bicep rod curl", "indian barbell", "indian barbell curl"] },
  { name: "Incline Dumbbell Curl", muscleGroup: "Biceps", aliases: ["incline dumbbell curl", "incline db curl"] },
  { name: "Dumbbell Curl", muscleGroup: "Biceps", aliases: ["dumbbell curl", "db curl"] },

  { name: "Tricep Pushdown", muscleGroup: "Triceps", aliases: ["tricep pushdown", "triceps pushdown", "triceps extension", "tricep extension", "cable pushdown"] },
  { name: "Overhead Tricep Extension", muscleGroup: "Triceps", aliases: ["overhead extension", "overhead tricep extension", "overhead triceps extension"] },

  { name: "Squat", muscleGroup: "Legs", aliases: ["squat", "barbell squat"] },
  { name: "Leg Press", muscleGroup: "Legs", aliases: ["leg press"] },
  { name: "Leg Extension", muscleGroup: "Legs", aliases: ["leg extension", "leg extensions"] },
  { name: "Leg Curl", muscleGroup: "Legs", aliases: ["leg curl", "leg curls"] },
  { name: "Calf Raise", muscleGroup: "Legs", aliases: ["calf raise", "calf raises"] },
  { name: "Hip Thrust", muscleGroup: "Legs", aliases: ["hip thrust", "hip thrusts"] },

  { name: "Plank", muscleGroup: "Abs", aliases: ["plank"] },
  { name: "Leg Raises", muscleGroup: "Abs", aliases: ["leg raise", "leg raises", "hanging leg raises"] },
  { name: "Crunches", muscleGroup: "Abs", aliases: ["crunch", "crunches"] },

  { name: "Wrist Curl", muscleGroup: "Forearms", aliases: ["wrist curl", "wrist curls"] },
  { name: "Reverse Wrist Curl", muscleGroup: "Forearms", aliases: ["reverse wrist curl", "reverse wrist curls"] },
  { name: "Dead Hang", muscleGroup: "Forearms", aliases: ["dead hang", "deadhang"] },
];

export const MUSCLE_GROUPS = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Legs",
  "Abs",
  "Forearms",
  "Custom",
];

export function cleanExerciseText(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/dumbell/g, "dumbbell")
    .replace(/deldroid/g, "deltoid")
    .replace(/deltroid/g, "deltoid")
    .trim();
}

export function findExercise(value = "") {
  const cleaned = cleanExerciseText(value);
  if (!cleaned) return null;

  return EXERCISE_DATABASE.find((exercise) => {
    if (cleanExerciseText(exercise.name) === cleaned) return true;
    return (exercise.aliases || []).some((alias) => cleanExerciseText(alias) === cleaned);
  }) || null;
}

export function normalizeExerciseName(value = "") {
  const match = findExercise(value);
  if (match) return match.name;

  const cleaned = String(value).trim().replace(/\s+/g, " ");
  if (!cleaned) return "Unnamed Exercise";
  return cleaned
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function getExerciseMuscleGroup(value = "") {
  return findExercise(value)?.muscleGroup || "Custom";
}

export function getExerciseOptions() {
  return EXERCISE_DATABASE.map((exercise) => `${exercise.name} — ${exercise.muscleGroup}`);
}
