// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5Ts9f6i4Knb7Gy8X2RpLihmpVlmOQKHo",
  authDomain: "sih-2025-5fab2.firebaseapp.com",
  projectId: "sih-2025-5fab2",
  storageBucket: "sih-2025-5fab2.firebasestorage.app",
  messagingSenderId: "1008133049665",
  appId: "1:1008133049665:web:86d074fab6ff0d7446a5c0",
  measurementId: "G-P5NQ3T95RW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
