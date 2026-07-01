// src/utils/exerciseTypes.js

export const getExerciseType = (name = "") => {
  const n = name.toLowerCase();

  if (
    n.includes("treadmill") ||
    n.includes("cycling") ||
    n.includes("skipping")
  ) {
    return "cardio";
  }

  if (
    n.includes("plank") ||
    n.includes("dead hang") ||
    n.includes("stretch") ||
    n.includes("breathing")
  ) {
    return "duration";
  }

  if (
    n.includes("farmer walk") ||
    n.includes("plate pinch")
  ) {
    return "carry";
  }

  return "strength";
};