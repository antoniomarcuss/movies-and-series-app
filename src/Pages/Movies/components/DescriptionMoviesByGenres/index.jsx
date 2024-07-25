import { useParams } from "react-router-dom";
import ShowDescriptionFromMovieOrTvShows from "../../../components/ShowDescriptionFromMovieOrTvShows";
import useFetchMoviesById from "../../../../hooks/useFetchMoviesById";

const DescriptionMoviesByGenres = () => {
  const { genreName, genreId, id } = useParams();

  const { data: movie, isLoading, isError } = useFetchMoviesById(id);

  return (
    <div>
      <ShowDescriptionFromMovieOrTvShows
        item={movie}
        isLoading={isLoading}
        isError={isError}
        backLink={`/genre/${genreName}/${genreId}`}
      />
    </div>
  );
};
export default DescriptionMoviesByGenres;
