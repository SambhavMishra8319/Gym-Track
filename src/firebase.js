// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyB3SEL01A00iO0SFTt1utqQMCuW9p30GVQ",
  authDomain: "workoutplannar.firebaseapp.com",
  projectId: "workoutplannar",
  storageBucket: "workoutplannar.firebasestorage.app",
  messagingSenderId: "923344644640",
  appId: "1:923344644640:web:d21c2ef570bd2c401daa45",
  measurementId: "G-QV804ZLRLZ"
};

// Avoid duplicate initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
