import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

// 🔥 Firebase config (from .env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ✅ Initialize Firebase once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ✅ Google provider
export const googleProvider = new GoogleAuthProvider();

// --------------------------------------------------
// 🔐 Google Login (Desktop = Popup, Mobile = Redirect)
// --------------------------------------------------
export const signInWithGoogle = () => {
  const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);

  return isMobile
    ? signInWithRedirect(auth, googleProvider)
    : signInWithPopup(auth, googleProvider);
};

// ✅ Logout
export const logOut = () => signOut(auth);

// ✅ Firestore helper
export const workoutsCollection = (userId) =>
  collection(db, `users/${userId}/workouts`);

export default app;
