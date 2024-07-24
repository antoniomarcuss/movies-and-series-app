import { create } from "zustand";

export const useGenresMoviesStore = create((set) => ({
  genres: [],
  setGenres: (genres) => set({ genres }),
}));
