
// import { workoutsCollection } from './config'
// import { addDoc, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore'

// // Add a new workout
// export async function addWorkout(userId, workoutData) {
//   const colRef = workoutsCollection(userId)
//   const docRef = await addDoc(colRef, {
//     ...workoutData,
//     createdAt: new Date().toISOString()
//   })
//   return docRef.id
// }

// // Get all workouts for a user
// export async function getWorkouts(userId) {
//   try {
//     const colRef = workoutsCollection(userId)
//     const q = query(colRef, orderBy('createdAt', 'desc'))
//     const snapshot = await getDocs(q)
//     return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
//   } catch (err) {
//     console.error('Error fetching workouts:', err)
//     return []
//   }
// }

// // Update workout
// export async function updateWorkout(workoutId, userId, updatedData) {
//   const docRef = doc(workoutsCollection(userId), workoutId)
//   await updateDoc(docRef, { ...updatedData, updatedAt: new Date().toISOString() })
// }

// // Delete workout
// export async function deleteWorkout(userId, workoutId) {
//   const docRef = doc(workoutsCollection(userId), workoutId)
//   await deleteDoc(docRef)
// }
// exercises.js
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
// src/firebase/exercises.js - ADD this function
// // import { deleteDoc, doc } from "firebase/firestore";
// import { db } from "./config";

// export const deleteWorkout = async (userId, workoutId) => {
//   const workoutRef = doc(db, "users", userId, "workouts", workoutId);
//   await deleteDoc(workoutRef);
// };
// src/firebase/exercises.js - ADD these functions
// import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
// import { db } from "./config";

// export const getLastExerciseData = async (userId, exerciseName) => {
//   try {
//     const workoutsSnap = await getDocs(
//       query(
//         collection(db, "users", userId, "workouts"),
//         where("exercises", "array-contains-any", [
//           { name: exerciseName }
//         ]),
//         orderBy("date", "desc"),
//         limit(1)
//       )
//     );

//     if (workoutsSnap.empty) return null;

//     const workout = workoutsSnap.docs[0].data();
//     const exercise = workout.exercises.find(ex => ex.name === exerciseName);
    
//     if (!exercise || !exercise.sets.length) return null;

//     // Get last set data
//     const lastSet = exercise.sets[exercise.sets.length - 1];
//     return {
//       reps: lastSet.reps || "",
//       weight: lastSet.weight || ""
//     };
//   } catch (err) {
//     console.error("Error getting last exercise:", err);
//     return null;
//   }
// };
// src/firebase/exercises.js - REPLACE getLastExerciseData with THIS:
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
