import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXrFl6zaiVRoXgPbwglUkY9ZkKI8ow75w",
  authDomain: "cocoterrace-34750.firebaseapp.com",
  projectId: "cocoterrace-34750",
  storageBucket: "cocoterrace-34750.firebasestorage.app",
  messagingSenderId: "367761776451",
  appId: "1:367761776451:web:75fdf6320be621a43b19f6",
  measurementId: "G-2SRY9D48WB"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
