import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

/**
 * Log a Sakhi interaction with human feedback
 */
export const logInteraction = async (uid, data) => {
  const ref = collection(db, "interactionLogs", uid, "items");

  await addDoc(ref, {
    ...data,
    timestamp: serverTimestamp(),
  });
};
