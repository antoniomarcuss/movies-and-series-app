import { TvShowsServices } from "../../../../services/tvShows";
import ShowCategory from "../../../components/ShowCategory";

const PopularCategoryTvShows = () => {
  return (
    <div>
      <ShowCategory
        queryKey={["TvShowsPopular"]}
        queryFn={TvShowsServices.fetchPopularTvShows}
        title="Popular"
        backLink={"/tvShows/popularCategory/popularDescription"}
        backLinkHome="/tvShows"
      />
    </div>
  );
};

export default PopularCategoryTvShows;
