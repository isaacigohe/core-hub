import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace these with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDbbdbjn5oac8g6WzwgoRxR5F8mYmhg6Yc",
  authDomain: "core-hub-9ed4f.firebaseapp.com",
  projectId: "core-hub-9ed4f",
  storageBucket: "core-hub-9ed4f.firebasestorage.app",
  messagingSenderId: "831469829204",
  appId: "1:831469829204:web:b27723d798661d6a3401c1",
  measurementId: "G-W6YP3QH01B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
