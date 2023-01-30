import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA7Tf4guk_ON55DiWR8IC6A1GyIEfx3A8E",
  authDomain: "todoapp-1460d.firebaseapp.com",
  projectId: "todoapp-1460d",
  storageBucket: "todoapp-1460d.appspot.com",
  messagingSenderId: "938432182853",
  appId: "1:938432182853:web:49cb830872de60a634012c",
  measurementId: "G-HZG5RL5S75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
