// // src/firebase/service.js

// import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// import { db } from "./config";

// export const saveDietLog = async (userId, date, dietData) => {
//   if (!userId || !date) throw new Error("Missing userId or date");

//   const ref = doc(db, "diet_logs", userId, "logs", date);

//   await setDoc(
//     ref,
//     {
//       ...dietData,
//       userId,
//       date,
//       updatedAt: serverTimestamp(),
//     },
//     { merge: true },
//   );
// };

// export const getDietLog = async (userId, date) => {
//   if (!userId || !date) return null;

//   const ref = doc(db, "diet_logs", userId, "logs", date);
//   const snap = await getDoc(ref);

//   return snap.exists() ? snap.data() : null;
// };
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export const saveDietLog = async (userId, date, dietData) => {
  if (!userId || !date) throw new Error("Missing userId or date");

  const ref = doc(db, "diet_logs", userId, "logs", date);

  await setDoc(
    ref,
    {
      ...dietData,
      userId,
      date,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const getDietLog = async (userId, date) => {
  if (!userId || !date) return null;

  const ref = doc(db, "diet_logs", userId, "logs", date);
  const snap = await getDoc(ref);

  return snap.exists() ? snap.data() : null;
};