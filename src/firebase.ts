import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

declare const process: {
  env: Record<string, string | undefined>;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set.`);
  }
  return value;
}

const firebaseConfig = {
  apiKey: requiredEnv("EXPO_PUBLIC_FIREBASE_API_KEY"),
  authDomain: requiredEnv("EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: requiredEnv("EXPO_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: requiredEnv("EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: requiredEnv("EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: requiredEnv("EXPO_PUBLIC_FIREBASE_APP_ID"),
  measurementId: requiredEnv("EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID")
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
