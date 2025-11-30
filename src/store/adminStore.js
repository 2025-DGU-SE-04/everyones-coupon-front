import { create } from "zustand";

export const useAdminStore = create((set) => ({
  isAdmin: false,
  setAdmin: (value) => set({ isAdmin: value }),
}));
