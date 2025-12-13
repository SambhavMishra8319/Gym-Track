// // // // //  import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // // // import { initializeApp, getApps, getApp } from "firebase/app";
// // // // import { getFirestore, collection } from "firebase/firestore";
// // // // import { getAuth, GoogleAuthProvider, signOut, signInWithPopup } from "firebase/auth";
// // // // import { getStorage } from "firebase/storage";

// // // // const firebaseConfig = {
// // // //   apiKey: "AIzaSyB3SEL01A00iO0SFTt1utqQMCuW9p30GVQ",
// // // //   authDomain: "workoutplannar.firebaseapp.com",
// // // //   projectId: "workoutplannar",
// // // //   storageBucket: "workoutplannar.firebasestorage.app",
// // // //   messagingSenderId: "923344644640",
// // // //   appId: "1:923344644640:web:d21c2ef570bd2c401daa45",
// // // //   measurementId: "G-QV804ZLRLZ"
// // // // };

// // // // // Initialize Firebase once
// // // // const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// // // // export const db = getFirestore(app);
// // // // export const auth = getAuth(app);
// // // // export const googleProvider = new GoogleAuthProvider();
// // // // export const storage = getStorage(app);

// // // // // Workouts collection helper
// // // // export const workoutsCollection = (userId) => collection(db, `users/${userId}/workouts`);

// // // // // ---------- Auth & Storage Helpers ----------
// // // // export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
// // // // export const logOut = () => signOut(auth);

// // // // // Upload profile image
// // // // export const uploadProfileImage = async (file, uid) => {
// // // //   const profileRef = ref(storage, `users/${uid}/profile.jpg`);
// // // //   await uploadBytes(profileRef, file);
// // // //   return getDownloadURL(profileRef);
// // // // };

// // // // export default app;
// // // import { initializeApp, getApps, getApp } from "firebase/app";
// // // import { getFirestore, collection } from "firebase/firestore";
// // // import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// // // import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// // // const firebaseConfig = {
// // //   apiKey: "AIzaSyB3SEL01A00iO0SFTt1utqQMCuW9p30GVQ",
// // //   authDomain: "workoutplannar.firebaseapp.com",
// // //   projectId: "workoutplannar",
// // //   storageBucket: "workoutplannar.firebasestorage.app",
// // //   messagingSenderId: "923344644640",
// // //   appId: "1:923344644640:web:d21c2ef570bd2c401daa45",
// // //   measurementId: "G-QV804ZLRLZ"
// // // };

// // // // Initialize Firebase once
// // // const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// // // // Firebase Services
// // // export const db = getFirestore(app);
// // // export const auth = getAuth(app);
// // // export const googleProvider = new GoogleAuthProvider();
// // // export const storage = getStorage(app);

// // // // Sign-in with Google
// // // export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// // // // Sign-out
// // // export const logOut = () => signOut(auth);

// // // // Workouts Collection Path
// // // export const workoutsCollection = (userId) =>
// // //   collection(db, `users/${userId}/workouts`);

// // // // Upload Profile Image Helper
// // // export const uploadProfileImage = async (file, uid) => {
// // //   const profileRef = ref(storage, `users/${uid}/profile.jpg`);
// // //   await uploadBytes(profileRef, file);
// // //   return await getDownloadURL(profileRef);
// // // };

// // // export default app;
// // import { initializeApp, getApps, getApp } from "firebase/app";
// // import { getFirestore, collection } from "firebase/firestore";
// // import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";
// // import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // import { getRedirectResult } from "firebase/auth";
// // import { auth } from "./configfirebase/Config";

// // useEffect(() => {
// //   getRedirectResult(auth)
// //     .then((result) => {
// //       if (result?.user) {
// //         setUser(result.user);
// //       }
// //     })
// //     .catch(console.error);
// // }, []);

// // const firebaseConfig = {
// //   apiKey: "AIzaSyB3SEL01A00iO0SFTt1utqQMCuW9p30GVQ",
// //   authDomain: "workoutplannar.firebaseapp.com",
// //   projectId: "workoutplannar",
// //   storageBucket: "workoutplannar.firebasestorage.app",
// //   messagingSenderId: "923344644640",
// //   appId: "1:923344644640:web:d21c2ef570bd2c401daa45",
// //   measurementId: "G-QV804ZLRLZ"
// // };

// // // Initialize Firebase once
// // const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// // // Firebase Services
// // export const db = getFirestore(app);
// // export const auth = getAuth(app);
// // export const googleProvider = new GoogleAuthProvider();
// // export const storage = getStorage(app);

// // // Mobile + Desktop Google Login
// // export const signInWithGoogle = () => {
// //   const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);

// //   if (isMobile) {
// //     return signInWithRedirect(auth, googleProvider);
// //   } else {
// //     return signInWithPopup(auth, googleProvider);
// //   }
// // };

// // // Sign-out
// // export const logOut = () => signOut(auth);

// // // Firestore collection
// // export const workoutsCollection = (userId) =>
// //   collection(db, `users/${userId}/workouts`);

// // // Upload profile image
// // export const uploadProfileImage = async (file, uid) => {
// //   const profileRef = ref(storage, `users/${uid}/profile.jpg`);
// //   await uploadBytes(profileRef, file);
// //   return await getDownloadURL(profileRef);
// // };

// // // Export default app
// // export default app;
// // firebase/config.js
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getFirestore, collection } from "firebase/firestore";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithRedirect,
//   signOut
// } from "firebase/auth";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyB3SEL01A00iO0SFTt1utqQMCuW9p30GVQ",
//   authDomain: "workoutplannar.firebaseapp.com",
//   projectId: "workoutplannar",
//   storageBucket: "workoutplannar.firebasestorage.app",
//   messagingSenderId: "923344644640",
//   appId: "1:923344644640:web:d21c2ef570bd2c401daa45",
//   measurementId: "G-QV804ZLRLZ",
// };

// // Initialize app once
// const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
// export const googleProvider = new GoogleAuthProvider();

// // Login (Desktop popup + Mobile redirect)
// export const signInWithGoogle = () => {
//   const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);

//   return isMobile
//     ? signInWithRedirect(auth, googleProvider)
//     : signInWithPopup(auth, googleProvider);
// };

// export const logOut = () => signOut(auth);

// export const workoutsCollection = (userId) =>
//   collection(db, `users/${userId}/workouts`);

// export const uploadProfileImage = async (file, uid) => {
//   const profileRef = ref(storage, `users/${uid}/profile.jpg`);
//   await uploadBytes(profileRef, file);
//   return await getDownloadURL(profileRef);
// };

// export default app;
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut
} from "firebase/auth";
import { getStorage } from "firebase/storage";

// 🔥 Firebase config (WEB app config — correct)
const firebaseConfig = {
  apiKey: "AIzaSyB3SEL01A00iO0SFTt1utqQMCuW9p30GVQ",
  authDomain: "workoutplannar.firebaseapp.com",
  projectId: "workoutplannar",
  storageBucket: "workoutplannar.firebasestorage.app",
  messagingSenderId: "923344644640",
  appId: "1:923344644640:web:d21c2ef570bd2c401daa45",
  measurementId: "G-QV804ZLRLZ",
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

  if (isMobile) {
    // MUST use redirect on Android
    return signInWithRedirect(auth, googleProvider);
  } else {
    return signInWithPopup(auth, googleProvider);
  }
};

// ✅ Logout
export const logOut = () => signOut(auth);

// ✅ Firestore helper
export const workoutsCollection = (userId) =>
  collection(db, `users/${userId}/workouts`);

export default app;
