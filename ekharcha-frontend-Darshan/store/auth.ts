import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { create } from "zustand";
import api from "../utils/api";

type AuthState = {
  isLoading: boolean;
  user?: any;
  setUser: (user: any) => void; // <-- Add this line
  register: (payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  user: undefined,
  setUser: (user) => set({ user }), // <-- Add this line

  register: async ({ email, password, firstName, lastName }) => {
    set({ isLoading: true });
    try {
      const res = await api.post("/api/auth/register", {
        email,
        password,
        firstName,
        lastName,
      });
      await AsyncStorage.setItem("token", res.data.accessToken);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await api.post("/api/auth/login", { email, password });
      await AsyncStorage.setItem("token", res.data.accessToken);
      set({ user: res.data.user, isLoading: false }); // <-- Optionally set user here
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({ user: undefined });
    router.replace("/(auth)/login");
  },
}));