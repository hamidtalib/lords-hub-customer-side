import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB2n2N-WB4KWoNbPtZdVj9piujqMn0WeCY",
  authDomain: "lordshubgaming.firebaseapp.com",
  projectId: "lordshubgaming",
  storageBucket: "lordshubgaming.firebasestorage.app",
  messagingSenderId: "332774440952",
  appId: "1:332774440952:web:37048de5bffdbcad9b200d",
  measurementId: "G-QYTFZV0FRS",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics **only on client**
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Initialize Firebase services (safe for SSR)
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDB = getDatabase(app);
export const auth = getAuth(app);

export default app;
