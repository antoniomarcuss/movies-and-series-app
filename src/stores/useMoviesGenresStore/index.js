import { create } from "zustand";

export const useMoviesGenresStore = create((set) => ({
  genres: [],
  setGenres: (genres) => set({ genres }),
}));
