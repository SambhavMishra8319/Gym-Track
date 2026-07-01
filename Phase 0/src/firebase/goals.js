import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const addGoal = async (uid, goal) => {
  await addDoc(collection(db, "goals"), {
    uid,
    ...goal,
    createdAt: serverTimestamp(),
  });
};

export const getGoals = async (uid) => {
  const q = query(collection(db, "goals"), where("uid", "==", uid));
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};
