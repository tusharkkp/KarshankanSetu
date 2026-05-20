import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

/**
 * Add a new activity for a farmer
 */
export const addActivity = async (uid, activity) => {
  const ref = collection(db, "activities", uid, "items");
  await addDoc(ref, {
    ...activity,
    createdAt: serverTimestamp(),
    timestamp: serverTimestamp(),
  });
};

/**
 * Get recent activities (latest first)
 */
export const getRecentActivities = async (uid, max = 5) => {
  const ref = collection(db, "activities", uid, "items");
  const q = query(ref, orderBy("timestamp", "desc"), limit(max));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
