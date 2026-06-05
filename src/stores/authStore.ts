import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "../types/user";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  
  // Actions
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  setInitializing: (status: boolean) => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isInitializing: true,

      setAuth: (user, token) => 
        set({ 
          user, 
          token, 
          isAuthenticated: true, 
          isInitializing: false 
        }),

      clearAuth: () => 
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false, 
          isInitializing: false 
        }),

      setInitializing: (status) => set({ isInitializing: status }),

      updateUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist user and token
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
      onRehydrateStorage: () => (state) => {
        // After hydration, we know if we have a user/token
        if (state) {
          state.setInitializing(false);
        }
      },
    }
  )
);
