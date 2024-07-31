import { useParams } from "react-router-dom";
import useFetchTvShowsById from "../../../../hooks/useFetchTvShowsById";
import useFetchMoviesById from "../../../../hooks/useFetchMoviesById";
const useFavoritesDescriptionViewModel = () => {
  const { movieId, tvShowId } = useParams();
  const fetchMovieData = (id) =>
    id
      ? useFetchMoviesById(id)
      : { data: null, isLoading: false, isError: false };
  const fetchTvShowData = (id) =>
    id
      ? useFetchTvShowsById(id)
      : { data: null, isLoading: false, isError: false };

  const {
    data: movie,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
  } = fetchMovieData(movieId);
  const {
    data: tvShow,
    isLoading: isLoadingTvShow,
    isError: isErrorTvShow,
  } = fetchTvShowData(tvShowId);

  const item = movie || tvShow;
  const isLoading = isLoadingMovie || isLoadingTvShow;
  const isError = isErrorMovie || isErrorTvShow;

  return { item, isLoading, isError };
};

export default useFavoritesDescriptionViewModel;
