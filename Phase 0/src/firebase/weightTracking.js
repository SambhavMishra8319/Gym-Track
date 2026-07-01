// src/firebase/weightTracking.js
import { addDoc, getDocs, deleteDoc, doc, collection, query, orderBy } from "firebase/firestore";
import { db } from "./config";

function weightCollection(userId) {
  return collection(db, "users", userId, "weights");
}
// src/firebase/weightTracking.js - ADD this function:
import { updateDoc } from "firebase/firestore"; // 👈 ADD import

export async function updateWeight(userId, weightId, weightData) {
  try {
    const docRef = doc(weightCollection(userId), weightId);
    await updateDoc(docRef, weightData);
  } catch (error) {
    console.error("Error updating weight:", error);
    throw error;
  }
}

export async function addWeight(userId, weightData) {
  try {
    const colRef = weightCollection(userId);
    const docRef = await addDoc(colRef, weightData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding weight:", error);
    throw error;
  }
}

export async function getWeights(userId) {
  try {
    const colRef = weightCollection(userId);
    const q = query(colRef, orderBy("date"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting weights:", error);
    return [];
  }
}

export async function deleteWeight(userId, weightId) {
  try {
    const docRef = doc(weightCollection(userId), weightId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting weight:", error);
    throw error;
  }
}
