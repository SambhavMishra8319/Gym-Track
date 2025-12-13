// workoutService.js
import { workoutsCollection } from './config'
import { 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore'

// --------------------------
// ADD WORKOUT
// --------------------------
export async function addWorkout(userId, workoutData) {
  try {
    if (!userId) throw new Error("User ID missing")
    if (!workoutData) throw new Error("Workout data missing")

    const colRef = workoutsCollection(userId)

    const docRef = await addDoc(colRef, {
      ...workoutData,
      createdAt: new Date().toISOString()
    })

    return docRef.id
  } catch (err) {
    console.error("Error adding workout:", err)
    return null
  }
}

// --------------------------
// GET ALL WORKOUTS
// --------------------------
export async function getWorkouts(userId) {
  try {
    if (!userId) throw new Error("User ID missing")

    const colRef = workoutsCollection(userId)
    const q = query(colRef, orderBy("createdAt", "desc"))

    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (err) {
    console.error("Error fetching workouts:", err)
    return []
  }
}

// --------------------------
// UPDATE WORKOUT
// --------------------------
export async function updateWorkout(workoutId, userId, updatedData) {
  try {
    if (!workoutId) throw new Error("Workout ID missing")
    if (!userId) throw new Error("User ID missing")

    const docRef = doc(workoutsCollection(userId), workoutId)

    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: new Date().toISOString()
    })

    return true
  } catch (err) {
    console.error("Error updating workout:", err)
    return false
  }
}

// --------------------------
// DELETE WORKOUT
// --------------------------
export async function deleteWorkout(userId, workoutId) {
  try {
    if (!userId) throw new Error("User ID missing")
    if (!workoutId) throw new Error("Workout ID missing")

    const docRef = doc(workoutsCollection(userId), workoutId)

    await deleteDoc(docRef)

    return true
  } catch (err) {
    console.error("Error deleting workout:", err)
    return false
  }
}
