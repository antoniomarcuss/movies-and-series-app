import { useFavoritesStore } from "../../../stores/useFavoritesStore";
import { useThemeControllerStore } from "../../../stores/ThemeControllerStore";
import { useParams } from "react-router-dom";
const useShowDescriptionFromMovieOrTvShowsViewModel = ({ item }) => {
  const quantityOfVideos = item?.data.videos.results.length;
  const genres = item?.data.genres.map((item) => item.name);
  const production = item?.data.production_companies
    .slice(1, 3)
    .map((item) => item.name);

  const isSun = useThemeControllerStore(({ isSun }) => isSun);
  const { movieId, tvShowId } = useParams();

  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const isFavorite = favorites.some((fav) => fav.id === (movieId || tvShowId));

  const handleToggleFavorite = () => {
    const id = movieId || tvShowId;
    const type = movieId ? "movie" : "tvShow";
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id, type);
    }
  };

  return {
    quantityOfVideos,
    genres,
    production,
    isSun,
    handleToggleFavorite,
    isFavorite,
  };
};

export default useShowDescriptionFromMovieOrTvShowsViewModel;
