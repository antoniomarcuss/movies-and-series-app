import { useParams } from "react-router-dom";
import ShowCategory from "../../../components/ShowCategory";
import { MoviesServices } from "../../../../services/movies";

const MoviesByGenre = () => {
  const { genreName, genreId } = useParams();
  return (
    <div>
      <ShowCategory
        queryKey={["moviesByGenre", genreId]}
        queryFn={(page) => MoviesServices.fetchMoviesByGenre(genreId, page)}
        title={genreName}
        backLink={`/genre/${genreName}/${genreId}/DescriptionMoviesByGenres`}
      />
    </div>
  );
};

export default MoviesByGenre;
