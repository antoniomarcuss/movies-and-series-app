import ShowDescriptionFromMovieOrTvShows from "../../ShowDescriptionFromMovieOrTvShows";
import useFavoritesDescriptionViewModel from "./useFavoritesDescriptionViewModel";

const FavoritesDescription = () => {
  const { item, isLoading, isError } = useFavoritesDescriptionViewModel();

  return (
    <div>
      <ShowDescriptionFromMovieOrTvShows
        item={item}
        isLoading={isLoading}
        isError={isError}
        backLink="/favorites"
      />
    </div>
  );
};

export default FavoritesDescription;
