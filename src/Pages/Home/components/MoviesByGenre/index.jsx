import { useParams } from "react-router-dom";
import ShowCategory from "../../../components/ShowCategory";
import { MoviesServices } from "../../../../services/movies";
import useFetchGenres from "../../../../hooks/useFetchGenres";

const MoviesByGenre = () => {
  const { genreId } = useParams();
  console.log(genreId);
  const { genres } = useFetchGenres();
  const genreName = genres.find((genre) => genre.id == genreId)?.name;
  return (
    <div>
      <ShowCategory
        queryKey={["moviesByGenre", genreId]}
        queryFn={(page) => MoviesServices.fetchMoviesByGenre(genreId, page)}
        title={genreName}
        backLink={`genre/${genreName}/${genreId}/DescriptionMoviesByGenres`}
      />
    </div>
  );
};

export default MoviesByGenre;
