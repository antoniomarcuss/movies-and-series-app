import { TvShowsServices } from "../../../services/tvShows";
import TvShowsCarousel from "../components/TvShowsCarousel";
const MoviesReleases = () => {
  return (
    <div>
      <TvShowsCarousel
        queryKey={"tvShowsReleases"}
        queryFn={TvShowsServices.fetchTvShowsReleases}
        title={"Lançamentos"}
        movieCategory={"/tvShows/releasesCategory"}
      />
    </div>
  );
};

export default MoviesReleases;
