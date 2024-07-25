import { MoviesServices } from "../../../services/movies";
import MoviesCarousel from "../components/MoviesCarousel";
const MoviesReleases = () => {
  return (
    <div>
      <MoviesCarousel
        queryKey={"popular"}
        queryFn={() => MoviesServices.fetchPopularMovies(2)}
        title={"Filmes populares"}
        movieCategory={"popularCategory"}
      />
    </div>
  );
};

export default MoviesReleases;