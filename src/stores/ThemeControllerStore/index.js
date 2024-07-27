import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useThemeControllerStore = create(
  persist(
    (set) => ({
      isSun: false,
      setIsSun: (isSun) => set({ isSun }),
    }),
    { name: "theme", storage: createJSONStorage(() => localStorage) }
  )
);
