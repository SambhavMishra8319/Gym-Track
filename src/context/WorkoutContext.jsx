import React, { createContext, useContext, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const WorkoutStateContext = createContext();
const WorkoutDispatchContext = createContext();

function workoutReducer(state, action) {
  switch (action.type) {
    case "load":
      return action.payload;
    case "add":
      return [...state, action.payload];
    case "update":
      return state.map(w => (w.id === action.payload.id ? action.payload : w));
    case "remove":
      return state.filter(w => w.id !== action.payload);
    default:
      throw new Error("Unknown action " + action.type);
  }
}

export function WorkoutProvider({ children }) {
  const [persisted, setPersisted] = useLocalStorage("workouts", []);
  const [state, dispatch] = useReducer(workoutReducer, persisted);

  // sync reducer state -> localStorage
  React.useEffect(() => setPersisted(state), [state, setPersisted]);

  return (
    <WorkoutStateContext.Provider value={state}>
      <WorkoutDispatchContext.Provider value={dispatch}>
        {children}
      </WorkoutDispatchContext.Provider>
    </WorkoutStateContext.Provider>
  );
}

export const useWorkouts = () => useContext(WorkoutStateContext);
export const useWorkoutsDispatch = () => useContext(WorkoutDispatchContext);
