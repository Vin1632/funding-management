import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBC-eiUDqtvqCcdcIMolfbNf_xizKW-4Jk",
  authDomain: "funding-management.firebaseapp.com",
  projectId: "funding-management",
  storageBucket: "funding-management.appspot.com",
  messagingSenderId: "261178319652",
  appId: "1:261178319652:web:0b4db26e88b22d32a7c9b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
