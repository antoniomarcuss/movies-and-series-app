import { TvShowsServices } from "../../../../services/tvShows";
import ShowCategory from "../../../components/ShowCategory";

const ReleasesCategoryTvShows = () => {
  return (
    <div>
      <ShowCategory
        queryKey={["tvShowsReleases"]}
        queryFn={TvShowsServices.fetchTvShowsReleases}
        title="Lançamentos"
        backLinkHome="/tvShows"
        backLink="/tvShows/releasesCategory/releaseDescription"
      />
    </div>
  );
};

export default ReleasesCategoryTvShows;
