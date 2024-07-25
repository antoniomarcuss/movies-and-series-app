import { MoviesServices } from "../../../services/movies";
import MoviesCarousel from "../components/MoviesCarousel";
const MoviesReleases = () => {
  return (
    <div>
      <MoviesCarousel
        queryKey={"releases"}
        queryFn={MoviesServices.fetchMoviesReleases}
        title={"Lançamentos"}
        movieCategory={"releasesCategory"}
      />
    </div>
  );
};

export default MoviesReleases;
