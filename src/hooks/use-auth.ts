// import { useAuthStore } from '@/store/auth-store';
// import { useEffect } from 'react';

// export function useAuth() {
//   const {
//     user,
//     token,
//     isLoading,
//     isAuthenticated,
//     login,
//     register,
//     logout,
//     refreshToken,
//     setUser,
//   } = useAuthStore();

//   // Auto-refresh token on mount if user is authenticated
//   useEffect(() => {
//     if (isAuthenticated && token) {
//       // Check if token is about to expire and refresh if needed
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const expirationTime = payload.exp * 1000;
//         const now = Date.now();
//         const fiveMinutes = 5 * 60 * 1000;

//         if (expirationTime - now < fiveMinutes) {
//           refreshToken();
//         }
//       } catch (error) {
//         console.error('Error parsing token:', error);
//         logout();
//       }
//     }
//   }, [isAuthenticated, token, refreshToken, logout]);

//   return {
//     user,
//     token,
//     isLoading,
//     isAuthenticated,
//     login,
//     register,
//     logout,
//     refreshToken,
//     setUser,
//   };
// }


import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
  appleProvider,
} from "@/lib/firebase";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  // 🔑 Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        localStorage.setItem("authToken", idToken);

        // Prevent infinite state updates
        setUser((prev) =>
          prev?.uid === currentUser.uid ? prev : currentUser
        );
      } else {
        localStorage.removeItem("authToken");
        setUser(null);
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  // Email + password login
  const login = async ({ email, password }: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } finally {
      setIsLoading(false);
    }
  };

  // Google login
  const loginWithGoogle = async (): Promise<User> => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } finally {
      setIsLoading(false);
    }
  };

  // Facebook login
  const loginWithFacebook = async (): Promise<User> => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      return result.user;
    } finally {
      setIsLoading(false);
    }
  };

  // Apple login
  const loginWithApple = async (): Promise<User> => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, appleProvider);
      return result.user;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    loginWithGoogle,
    loginWithFacebook,
    loginWithApple,
    isLoading,
    isAuthenticated: !!user,
    user,
    initializing,
  };
}
