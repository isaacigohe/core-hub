import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

const moviesRef = collection(db, "movies");

// CREATE
export const addMovie = async (movie) => {
  return await addDoc(moviesRef, movie);
};

// READ
export const getMovies = async () => {
  const snapshot = await getDocs(moviesRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// UPDATE
export const updateMovie = async (id, updatedData) => {
  const movieDoc = doc(db, "movies", id);
  return await updateDoc(movieDoc, updatedData);
};

// DELETE
export const deleteMovie = async (id) => {
  const movieDoc = doc(db, "movies", id);
  return await deleteDoc(movieDoc);
};