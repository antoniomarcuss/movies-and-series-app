import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (id, type) =>
        set((state) => ({
          favorites: [...state.favorites, { id, type }],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        })),
    }),
    { name: "favorites", storage: createJSONStorage(() => localStorage) }
  )
);
