import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

/**
 * Create farmer profile if it does not exist
 * Called immediately after signup
 */
export const createFarmerProfileIfNotExists = async (uid, email) => {
  const farmerRef = doc(db, "farmers", uid);
  const snapshot = await getDoc(farmerRef);

  if (!snapshot.exists()) {
    await setDoc(farmerRef, {
      uid,
      email,
      name: "",
      phone: "",
      location: {
        state: "",
        district: "",
        village: "",
      },
      farm: {
        landSize: "",
        landUnit: "acre",
        farmType: "",
        primaryCrop: "",
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
};

/**
 * Get farmer profile
 */
export const getFarmerProfile = async (uid) => {
  const farmerRef = doc(db, "farmers", uid);
  const snapshot = await getDoc(farmerRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
};

/**
 * Update farmer profile
 */
export const updateFarmerProfile = async (uid, data) => {
  const farmerRef = doc(db, "farmers", uid);
  await updateDoc(farmerRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};
