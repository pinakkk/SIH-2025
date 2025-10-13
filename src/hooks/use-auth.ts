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


// import { useEffect, useState } from "react";
// import {
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   onAuthStateChanged,
//   User,
// } from "firebase/auth";
// import {
//   auth,
//   googleProvider,
//   facebookProvider,
//   appleProvider,
// } from "@/lib/firebase";

// export function useAuth() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [initializing, setInitializing] = useState(true);

//   // 🔑 Track Firebase auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         const idToken = await currentUser.getIdToken();
//         localStorage.setItem("authToken", idToken);

//         // Prevent infinite state updates
//         setUser((prev) =>
//           prev?.uid === currentUser.uid ? prev : currentUser
//         );
//       } else {
//         localStorage.removeItem("authToken");
//         setUser(null);
//       }
//       setInitializing(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Email + password login
//   const login = async ({ email, password }: { email: string; password: string }) => {
//     setIsLoading(true);
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       return userCredential.user;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Google login
//   const loginWithGoogle = async (): Promise<User> => {
//     setIsLoading(true);
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       return result.user;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Facebook login
//   const loginWithFacebook = async (): Promise<User> => {
//     setIsLoading(true);
//     try {
//       const result = await signInWithPopup(auth, facebookProvider);
//       return result.user;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Apple login
//   const loginWithApple = async (): Promise<User> => {
//     setIsLoading(true);
//     try {
//       const result = await signInWithPopup(auth, appleProvider);
//       return result.user;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     setIsLoading(true);
//     try {
//       await auth.signOut();
//       localStorage.removeItem("authToken");
//       setUser(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     login,
//     loginWithGoogle,
//     loginWithFacebook,
//     loginWithApple,
//     logout,
//     isLoading,
//     isAuthenticated: !!user,
//     user,
//     initializing,
//   };
// }



// working with login
// // src/hooks/use-auth.ts
// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   auth,
//   googleProvider,
//   facebookProvider,
//   appleProvider,
// } from "@/lib/firebase";
// import { signInWithPopup, User } from "firebase/auth";

// export function useAuth() {
//   const [user, setUser] = useState<any | null>(null); // keep generic for API user object
//   const [isLoading, setIsLoading] = useState(false);
//   const [initializing, setInitializing] = useState(true);

//   // 🔑 Restore session from localStorage
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setInitializing(false);
//   }, []);

//   // API: Email + Password login
//   const login = async ({
//     email,
//     password,
//   }: {
//     email: string;
//     password: string;
//   }) => {
//     setIsLoading(true);
//     try {
//       const { data } = await axios.post(
//         "https://sih-2025-l3ur.onrender.com/api/login",
//         { email, password },
//         { withCredentials: true }
//       );

//       if (data.success && data.user) {
//         setUser(data.user);
//         localStorage.setItem("user", JSON.stringify(data.user));
//       }

//       return data.user;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Google login (optional Firebase)
//   const loginWithGoogle = async (): Promise<User> => {
//     setIsLoading(true);
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       return result.user;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const loginWithFacebook = async (): Promise<User> => {
//     setIsLoading(true);
//     try {
//       const result = await signInWithPopup(auth, facebookProvider);
//       return result.user;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const loginWithApple = async (): Promise<User> => {
//     setIsLoading(true);
//     try {
//       const result = await signInWithPopup(auth, appleProvider);
//       return result.user;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return {
//     login,
//     loginWithGoogle,
//     loginWithFacebook,
//     loginWithApple,
//     logout,
//     isLoading,
//     isAuthenticated: !!user,
//     user,
//     setUser, // expose setter for manual updates
//     initializing,
//   };
// }


// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   auth,
//   googleProvider,
//   facebookProvider,
//   appleProvider,
// } from "@/lib/firebase";
// import { signInWithPopup, User } from "firebase/auth";

// const API_BASE_URL = "https://sih-2025-l3ur.onrender.com"; // ✅ Production backend

// export function useAuth() {
//   const [user, setUser] = useState<any | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [initializing, setInitializing] = useState(true);

//   // Restore session
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setInitializing(false);
//   }, []);

//   // 📌 API Login
//   const login = async ({ email, password }: { email: string; password: string }) => {
//     setIsLoading(true);
//     try {
//       const { data } = await axios.post(
//         `${API_BASE_URL}/api/login`,
//         { email, password },
//         { withCredentials: true }
//       );
//       if (data.success && data.user) {
//         setUser(data.user);
//         localStorage.setItem("user", JSON.stringify(data.user));
//       }
//       return data.user;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 📌 Social logins
//   const loginWithGoogle = async (): Promise<User> => {
//     setIsLoading(true);
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       return result.user;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const loginWithFacebook = async (): Promise<User> => {
//     setIsLoading(true);
//     try {
//       const result = await signInWithPopup(auth, facebookProvider);
//       return result.user;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const loginWithApple = async (): Promise<User> => {
//     setIsLoading(true);
//     try {
//       const result = await signInWithPopup(auth, appleProvider);
//       return result.user;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return {
//     login,
//     loginWithGoogle,
//     loginWithFacebook,
//     loginWithApple,
//     logout,
//     isLoading,
//     isAuthenticated: !!user,
//     user,
//     setUser,
//     initializing,
//   };
// }



// working with firebase
import { useState, useEffect } from "react";
import axios from "axios";
import {
  auth,
  googleProvider,
} from "@/lib/firebase";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  User,
} from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<any | null>(null); // keep generic for API user object
  const [isLoading, setIsLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // 🔑 Restore session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setInitializing(false);
  }, []);

  // 🔄 Handle redirect login results (important for production)
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const firebaseUser = {
            uid: result.user.uid,
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,   // ✅ store photo
            provider: "google",
          };
          setUser(firebaseUser);
          localStorage.setItem("user", JSON.stringify(firebaseUser));
        }

      } catch (err) {
        console.error("Redirect login error:", err);
      }
    };
    checkRedirectResult();
  }, []);

  // API: Email + Password login
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5002/api/login",
        { email, password },
        { withCredentials: true }
      );

      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data.user;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Google login (popup in dev, redirect in prod)
  // inside useAuth.ts

  const loginWithGoogle = async (): Promise<User | null> => {
    setIsLoading(true);
    try {
      if (process.env.NODE_ENV === "development") {
        // Popup for dev
        const result = await signInWithPopup(auth, googleProvider);
        if (result?.user) {
          const firebaseUser = {
            uid: result.user.uid,
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,   // ✅ store photo
            provider: "google",
          };
          setUser(firebaseUser);
          localStorage.setItem("user", JSON.stringify(firebaseUser));
        }

        return result.user;
      } else {
        // Redirect for prod
        await signInWithRedirect(auth, googleProvider);
        return null;
      }
    } finally {
      setIsLoading(false);
    }
  };


  ;

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return {
    login,
    loginWithGoogle,
    logout,
    isLoading,
    isAuthenticated: !!user,
    user,
    setUser, // expose setter for manual updates
    initializing,
  };
}
