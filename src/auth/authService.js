import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

/**
 * Signup a new user
 */
export const signupUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

/**
 * Login existing user
 */
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

/**
 * Logout current user
 */
export const logoutUser = async () => {
  await signOut(auth);
};

/**
 * Listen to auth state changes
 * @param {function} callback
 */
export const listenToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};
