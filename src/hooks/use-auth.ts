import { useAuthStore } from '@/store/auth-store';
import { useEffect } from 'react';

export function useAuth() {
  const {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken,
    setUser,
  } = useAuthStore();

  // Auto-refresh token on mount if user is authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      // Check if token is about to expire and refresh if needed
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000;
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;

        if (expirationTime - now < fiveMinutes) {
          refreshToken();
        }
      } catch (error) {
        console.error('Error parsing token:', error);
        logout();
      }
    }
  }, [isAuthenticated, token, refreshToken, logout]);

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken,
    setUser,
  };
}