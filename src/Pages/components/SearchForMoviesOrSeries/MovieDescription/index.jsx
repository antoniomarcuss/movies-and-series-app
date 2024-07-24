import { useParams } from "react-router-dom";
import ShowDescriptionFromMovieOrTvShows from "../../../components/ShowDescriptionFromMovieOrTvShows";

import useFetchMoviesById from "../../../../hooks/useFetchMoviesById";

const MovieDescription = () => {
  const { movieId } = useParams();
  const { data: movie, isLoading, isError } = useFetchMoviesById(movieId);

  return (
    <div>
      <ShowDescriptionFromMovieOrTvShows
        item={movie}
        backLink="/searchForMoviesOrSeries"
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default MovieDescription;
