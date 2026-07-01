import { auth } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// ✅ SIGN UP
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// ✅ LOGIN
export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// ✅ LOGOUT
export const logOut = () => {
  return signOut(auth);
};
