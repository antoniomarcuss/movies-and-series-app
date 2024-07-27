import ShowDescriptionFromMovieOrTvShows from "../../../components/ShowDescriptionFromMovieOrTvShows";
import { useParams } from "react-router-dom";
import useFetchMoviesById from "../../../../hooks/useFetchMoviesById";

const TopRatedDescription = () => {
  const { movieId } = useParams();

  const { data: movie, isLoading, isError } = useFetchMoviesById(movieId);

  return (
    <div>
      <ShowDescriptionFromMovieOrTvShows
        item={movie}
        isLoading={isLoading}
        isError={isError}
        backLink="/topRatedCategory"
      />
    </div>
  );
};

export default TopRatedDescription;
