
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_YOUR_API_KEY,
  authDomain: import.meta.env.VITE_YOUR_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_YOUR_PROJECT_ID,
  storageBucket: import.meta.env.VITE_YOUR_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_YOUR_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_YOUR_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


