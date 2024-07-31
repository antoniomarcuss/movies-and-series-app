import TvShowsReleases from "./TvShowsReleases";
import TvShowsTopRated from "./TvShowsTopRated";
import TvShowsPopular from "./TvShowsPopular";

import { TvShowsServices } from "../../services/tvShows";

import CarouselTime from "../components/CarouselTime";
const TvShows = () => {
  return (
    <div>
      <CarouselTime
        queryKey={"tvShowsReleases"}
        queryFn={TvShowsServices.fetchTvShowsReleases(1)}
        home="/tvShows"
      />

      <TvShowsReleases />
      <TvShowsTopRated />
      <TvShowsPopular />
    </div>
  );
};

export default TvShows;
