import { MoviesServices } from "../../../../services/movies";
import ShowCategory from "../../../components/ShowCategory";

const ReleasesCategory = () => {
  return (
    <div>
      <ShowCategory
        queryKey={["releases"]}
        queryFn={MoviesServices.fetchMoviesReleases}
        title="Lançamentos"
        backLink="releasesCategory/releaseDescription"
      />
    </div>
  );
};

export default ReleasesCategory;
