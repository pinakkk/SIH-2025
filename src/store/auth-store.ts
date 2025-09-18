import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '@/lib/api-client';
import { STORAGE_KEYS } from '@/lib/constants';
import { sleep } from '@/lib/utils';
import type { AuthState, LoginCredentials, RegisterCredentials, User } from '@/types/auth';

// Helper function to create a properly formatted mock JWT token
const createMockJWT = (userId: string, email: string): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const payload = {
    sub: userId,
    email: email,
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour from now
    iat: Math.floor(Date.now() / 1000)
  };
  
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = 'mock-signature-' + Date.now();
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          // Simulate API call for demo
          await sleep(1000);
          
          // Mock response - replace with actual API call
          const mockResponse = {
            user: {
              id: '1',
              email: credentials.email,
              name: 'John Doe',
              role: 'user' as const,
              createdAt: new Date().toISOString(),
            },
            token: createMockJWT('1', credentials.email),
            refreshToken: 'mock-refresh-token-' + Date.now(),
          };

          set({
            user: mockResponse.user,
            token: mockResponse.token,
            isAuthenticated: true,
            isLoading: false,
          });

          localStorage.setItem(STORAGE_KEYS.TOKEN, mockResponse.token);
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, mockResponse.refreshToken);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true });
        try {
          // Simulate API call for demo
          await sleep(1200);
          
          // Mock response - replace with actual API call
          const mockResponse = {
            user: {
              id: '1',
              email: credentials.email,
              name: credentials.name,
              role: 'user' as const,
              createdAt: new Date().toISOString(),
            },
            token: createMockJWT('1', credentials.email),
            refreshToken: 'mock-refresh-token-' + Date.now(),
          };

          set({
            user: mockResponse.user,
            token: mockResponse.token,
            isAuthenticated: true,
            isLoading: false,
          });

          localStorage.setItem(STORAGE_KEYS.TOKEN, mockResponse.token);
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, mockResponse.refreshToken);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      },

      refreshToken: async () => {
        try {
          // Simulate refresh - replace with actual API call
          await sleep(500);
          const currentUser = get().user;
          const newToken = createMockJWT(currentUser?.id || '1', currentUser?.email || 'user@example.com');
          const newRefreshToken = 'refreshed-mock-refresh-token-' + Date.now();
          
          set({ token: newToken });
          localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
        } catch (error) {
          get().logout();
          throw error;
        }
      },

      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);