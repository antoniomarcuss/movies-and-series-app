import { MoviesServices } from "../../../../services/movies";
import ShowCategory from "../../../components/ShowCategory";

const PopularCategory = () => {
  return (
    <div>
      <ShowCategory
        title="Popular"
        queryKey={["popular"]}
        queryFn={MoviesServices.fetchPopularMovies}
        backLink={"popularCategory/popularDescription"}
      />
    </div>
  );
};

export default PopularCategory;
