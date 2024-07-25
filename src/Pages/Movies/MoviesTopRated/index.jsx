import { MoviesServices } from "../../../services/movies";
import MoviesCarousel from "../components/MoviesCarousel";
const MoviesTopRated = () => {
  return (
    <div>
      <MoviesCarousel
        queryKey={"topRated"}
        queryFn={MoviesServices.fetchMoviesTopRated}
        title="Filmes mais bem avaliados"
        movieCategory={"topRatedCategory"}
      />
    </div>
  );
};

export default MoviesTopRated;
