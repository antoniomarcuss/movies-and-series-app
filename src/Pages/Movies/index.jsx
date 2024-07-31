import MoviesReleases from "./MoviesReleases";
import MoviesTopRated from "./MoviesTopRated";
import MoviesPopular from "./MoviesPopular";
import { MoviesServices } from "../../services/movies";
import CarouselTime from "../components/CarouselTime";

const Movies = () => {
  return (
    <div className="">
      <CarouselTime
        queryKey={"releases"}
        queryFn={MoviesServices.fetchMoviesReleases(1)}
      />
      <MoviesReleases />
      <MoviesTopRated />
      <MoviesPopular />
    </div>
  );
};

export default Movies;
