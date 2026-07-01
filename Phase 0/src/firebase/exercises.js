import { workoutsCollection } from './config';
import { 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  deleteDoc,
  collection,      // 👈 ADD THIS
  where,           // 👈 ADD THIS
  limit            // 👈 ADD THIS
} from 'firebase/firestore';
import { db } from "./config";  // 👈 ADD THIS
// --------------------------
// ADD WORKOUT
// --------------------------
export async function addWorkout(userId, workoutData) {
  try {
    if (!userId) throw new Error("User ID missing");
    if (!workoutData) throw new Error("Workout data missing");

    const colRef = workoutsCollection(userId);

    const docRef = await addDoc(colRef, {
      ...workoutData,
      createdAt: new Date().toISOString()
    });

    return docRef.id;
  } catch (err) {
    console.error("Error adding workout:", err);
    return null;
  }
}

// --------------------------
// GET ALL WORKOUTS
// --------------------------
export async function getWorkouts(userId) {
  try {
    if (!userId) throw new Error("User ID missing");

    const colRef = workoutsCollection(userId);
    const q = query(colRef, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (err) {
    console.error("Error fetching workouts:", err);
    return [];
  }
}

// --------------------------
// UPDATE WORKOUT
// --------------------------
export async function updateWorkout(workoutId, userId, updatedData) {
  try {
    if (!workoutId) throw new Error("Workout ID missing");
    if (!userId) throw new Error("User ID missing");

    const docRef = doc(workoutsCollection(userId), workoutId);

    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: new Date().toISOString()
    });

    return true;
  } catch (err) {
    console.error("Error updating workout:", err);
    return false;
  }
}

// --------------------------
// DELETE WORKOUT
// --------------------------
export async function deleteWorkout(userId, workoutId) {
  try {
    if (!userId) throw new Error("User ID missing");
    if (!workoutId) throw new Error("Workout ID missing");

    const docRef = doc(workoutsCollection(userId), workoutId);

    await deleteDoc(docRef);

    return true;
  } catch (err) {
    console.error("Error deleting workout:", err);
    return false;
  }
}

export const getLastExerciseData = async (userId, exerciseName) => {
  try {
    console.log("🔍 Searching for:", exerciseName, "user:", userId);
    
    // Get ALL workouts (no index needed!)
    const workouts = await getWorkouts(userId);
    console.log("Found", workouts.length, "workouts");
    
    // Find workouts containing this exercise
    const relevantWorkouts = workouts
      .filter(w => 
        w.exercises?.some(ex => 
          ex.name?.toLowerCase() === exerciseName.toLowerCase()
        )
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Most recent first
    
    console.log("Relevant workouts:", relevantWorkouts.length);
    
    if (!relevantWorkouts.length) {
      console.log("❌ No workouts found for:", exerciseName);
      return null;
    }

    const workout = relevantWorkouts[0];
    const exercise = workout.exercises.find(ex => 
      ex.name?.toLowerCase() === exerciseName.toLowerCase()
    );
    
    if (!exercise || !exercise.sets?.length) {
      console.log("❌ No sets found for:", exerciseName);
      return null;
    }

    const lastSet = exercise.sets[exercise.sets.length - 1];
    console.log("✅ FOUND PREVIOUS DATA:", lastSet);
    
    return {
      reps: lastSet.reps || "",
      weight: lastSet.weight || ""
    };
  } catch (err) {
    console.error("❌ Error:", err);
    return null;
  }
};