import { TvShowsServices } from "../../../services/tvShows";
import { useThemeControllerStore } from "../../../stores/ThemeControllerStore";
import { useState } from "react";
import { useFavoritesStore } from "../../../stores/useFavoritesStore";
import { useQuery } from "react-query";
import { MoviesServices } from "../../../services/movies";
const useFavoritesViewModel = () => {
  const { favorites } = useFavoritesStore();
  const [moviesData, setMoviesData] = useState([]);
  const [tvShowsData, setTvShowsData] = useState([]);
  const isSun = useThemeControllerStore(({ isSun }) => isSun);

  const { isLoading: isLoadingMovies, isError: isErrorMovies } = useQuery({
    queryKey: ["favoritesMovies", favorites],
    queryFn: () =>
      Promise.all(
        favorites
          .filter((fav) => fav.type === "movie")
          .map((fav) => MoviesServices.fetchMoviesById(fav.id))
      ),
    enabled: favorites.some((fav) => fav.type === "movie"),
    onSuccess: (data) => {
      setMoviesData(data.map((response) => response.data));
    },
  });

  const { isLoading: isLoadingTvShows, isError: isErrorTvShows } = useQuery({
    queryKey: ["favoritesTvShows", favorites],
    queryFn: () =>
      Promise.all(
        favorites
          .filter((fav) => fav.type === "tvShow")
          .map((fav) => TvShowsServices.fetchTvShowsById(fav.id))
      ),
    enabled: favorites.some((fav) => fav.type === "tvShow"),
    onSuccess: (data) => {
      setTvShowsData(data.map((response) => response.data));
    },
  });

  const isLoading = isLoadingMovies || isLoadingTvShows;
  const isError = isErrorMovies || isErrorTvShows;

  const favoritesItems = [...moviesData, ...tvShowsData];

  return { favoritesItems, isLoading, isError, isSun };
};

export default useFavoritesViewModel;
