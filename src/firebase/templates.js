import { addDoc, getDocs, doc, deleteDoc, collection } from "firebase/firestore";
import { db } from "./config";

// Get collection reference
function templatesCollection(userId) {
  return collection(db, "users", userId, "templates");
}

// Add a template
export async function addTemplate(userId, template) {
  return await addDoc(templatesCollection(userId), template);
}

// Get all templates
export async function getTemplates(userId) {
  const snap = await getDocs(templatesCollection(userId));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Delete template
export async function deleteTemplate(userId, templateId) {
  const ref = doc(db, "users", userId, "templates", templateId);
  await deleteDoc(ref);
}
