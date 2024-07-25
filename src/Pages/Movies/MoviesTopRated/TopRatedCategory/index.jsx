import ShowCategory from "../../../../Pages/components/ShowCategory";
import { MoviesServices } from "../../../../services/movies";
const TopRatedCategory = () => {
  return (
    <div>
      <ShowCategory
        queryKey={["topRated"]}
        queryFn={MoviesServices.fetchMoviesTopRated}
        title=" Filmes mais bem avaliados"
        backLink="/topRatedCategory/topRatedDescription"
      />
    </div>
  );
};

export default TopRatedCategory;
