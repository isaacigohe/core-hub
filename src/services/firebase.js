import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  
  authDomain: "core-hub-9ed4f.firebaseapp.com",
  projectId: "core-hub-9ed4f",
  storageBucket: "core-hub-9ed4f.firebasestorage.app",
  messagingSenderId: "831469829204",
  appId: "1:831469829204:web:b27723d798661d6a3401c1",
  measurementId: "G-W6YP3QH01B"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);