// firebase/users.js
import { db, storage } from "./config"; // adjust path if needed
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Fetch user profile from Firestore
 * @param {string} uid
 * @returns {Promise<Object|null>}
 */
export async function getUserProfile(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (err) {
    console.error("Error getting user profile:", err);
    return null;
  }
}

/**
 * Create or update user profile
 * @param {string} uid
 * @param {Object} data
 */
export async function setUserProfile(uid, data) {
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true });
    return true;
  } catch (err) {
    console.error("Error setting user profile:", err);
    return false;
  }
}

/**
 * Upload profile picture to Firebase Storage
 * @param {string} uid
 * @param {File} file
 * @returns {Promise<string|null>} URL of uploaded picture
 */
export async function uploadProfilePicture(uid, file) {
  try {
    const storageRef = ref(storage, `profilePictures/${uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    // Update user's profile with picture URL
    await updateDoc(doc(db, "users", uid), { photoURL: url });
    return url;
  } catch (err) {
    console.error("Error uploading profile picture:", err);
    return null;
  }
}

/**
 * Fetch user achievements
 * @param {string} uid
 * @returns {Promise<Array>}
 */
export async function getUserAchievements(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() && docSnap.data().achievements
      ? docSnap.data().achievements
      : [];
  } catch (err) {
    console.error("Error fetching achievements:", err);
    return [];
  }
}

/**
 * Add a new achievement for the user
 * @param {string} uid
 * @param {Object} achievement
 */
export async function addAchievement(uid, achievement) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const current = docSnap.exists() && docSnap.data().achievements
      ? docSnap.data().achievements
      : [];
    current.push(achievement);
    await updateDoc(docRef, { achievements: current });
    return true;
  } catch (err) {
    console.error("Error adding achievement:", err);
    return false;
  }
}
/**
 * Fetch user streaks
 * @param {string} uid
 * @returns {Promise<Array>} Array of streak dates or objects
 */
// firebase/users.js
// import { db } from "./config";
// import { doc, getDoc } from "firebase/firestore";

export async function getUserStreaks(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().streaks || []; // array of streak objects/dates
    } else {
      return [];
    }
  } catch (err) {
    console.error("Error fetching user streaks:", err);
    return [];
  }
}
