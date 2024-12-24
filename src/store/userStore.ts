import { create } from "zustand";

type UserState = {
  user: { username: string; userId: string } | null;
  setUser: (user: { username: string; userId: string }) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
