import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION = "watchlist";

// ADD MOVIE
export async function addMovie(movie) {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...movie,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

// GET USER MOVIES
export async function getUserMovies(userId) {
  const q = query(collection(db, COLLECTION), where("userId", "==", userId));
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

// UPDATE MOVIE
export async function updateMovie(id, data) {
  const ref = doc(db, COLLECTION, id);

  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// DELETE MOVIE
export async function deleteMovie(id) {
  await deleteDoc(doc(db, COLLECTION, id));
}