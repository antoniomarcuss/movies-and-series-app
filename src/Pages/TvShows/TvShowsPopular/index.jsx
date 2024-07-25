import { TvShowsServices } from "../../../services/tvShows";
import TvShowsCarousel from "../components/TvShowsCarousel";
const MoviesReleases = () => {
  return (
    <div>
      <TvShowsCarousel
        queryKey={"TvShowsPopular"}
        queryFn={TvShowsServices.fetchPopularTvShows}
        title={"Séries populares"}
        movieCategory={"/tvShows/popularCategory"}
      />
    </div>
  );
};

export default MoviesReleases;
