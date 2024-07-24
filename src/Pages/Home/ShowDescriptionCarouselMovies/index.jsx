import { useParams } from "react-router-dom";
import ShowDescriptionFromMovieOrTvShows from "../../components/ShowDescriptionFromMovieOrTvShows";
import useFetchMoviesById from "../../../hooks/useFetchMoviesById";
const ShowDescriptionCarouselMovies = () => {
  const { movieId } = useParams();

  const { data: movie, isLoading, isError } = useFetchMoviesById(movieId);
  return (
    <div>
      <ShowDescriptionFromMovieOrTvShows
        item={movie}
        isLoading={isLoading}
        isError={isError}
        backLink="/"
      />
    </div>
  );
};

export default ShowDescriptionCarouselMovies;
