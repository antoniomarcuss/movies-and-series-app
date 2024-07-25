import ShowCategory from "../../../components/ShowCategory";
import { TvShowsServices } from "../../../../services/tvShows";
const TopRatedCategory = () => {
  return (
    <div>
      <ShowCategory
        queryKey={["TvShowsTopRated"]}
        queryFn={TvShowsServices.fetchTopRatedTvShows}
        title=" Séries mais bem avaliadas"
        backLinkHome="/tvShows"
        backLink="/tvShows/topRatedCategory/topRatedDescription"
      />
    </div>
  );
};

export default TopRatedCategory;
