import { TvShowsServices } from "../../../services/tvShows";
import TvShowsCarousel from "../components/TvShowsCarousel";
const MoviesTopRated = () => {
  return (
    <div>
      <TvShowsCarousel
        queryKey={"TvShowsTopRated"}
        queryFn={TvShowsServices.fetchTopRatedTvShows}
        title="Séries mais bem avaliadas"
        movieCategory={"/tvShows/topRatedCategory"}
      />
    </div>
  );
};

export default MoviesTopRated;
