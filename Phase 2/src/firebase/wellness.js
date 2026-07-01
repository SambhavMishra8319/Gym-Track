import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "./config";

const subCollection = (userId, name) => collection(db, "users", userId, name);

export async function addWellnessEntry(userId, collectionName, data) {
  if (!userId) throw new Error("User ID missing");
  const docRef = await addDoc(subCollection(userId, collectionName), {
    ...data,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function getWellnessEntries(userId, collectionName) {
  if (!userId) return [];
  const q = query(subCollection(userId, collectionName), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateWellnessEntry(userId, collectionName, entryId, data) {
  if (!userId || !entryId) throw new Error("Missing user or entry id");
  await updateDoc(doc(db, "users", userId, collectionName, entryId), {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteWellnessEntry(userId, collectionName, entryId) {
  if (!userId || !entryId) throw new Error("Missing user or entry id");
  await deleteDoc(doc(db, "users", userId, collectionName, entryId));
}
