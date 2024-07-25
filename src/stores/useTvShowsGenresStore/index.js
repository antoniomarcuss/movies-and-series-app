import { create } from "zustand";

export const useTvShowsGenresStore = create((set) => ({
  genresTvShows: [],
  setGenresTvShows: (genresTvShows) => set({ genresTvShows }),
}));
