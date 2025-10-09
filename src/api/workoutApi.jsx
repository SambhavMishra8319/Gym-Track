import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ✅ Save workout
export const saveWorkout = async ({ day, name, date, sets }) => {
  return await axios.post(`${API_URL}/api/workouts`, {
    day,
    name,
    date,
    sets,
  });
};

// ✅ Fetch all workouts for a given exercise
export const fetchWorkouts = async (day, name) => {
  const res = await axios.get(`${API_URL}/api/workouts`, {
    params: { day, name },
  });
  return res.data;
};
