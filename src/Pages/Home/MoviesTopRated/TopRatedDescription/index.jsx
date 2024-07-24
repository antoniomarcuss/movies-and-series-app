import { useQuery } from "react-query";
import { MoviesServices } from "../../../../services/movies";
import ShowDescriptionFromMovieOrTvShows from "../../../components/ShowDescriptionFromMovieOrTvShows";
import { useParams } from "react-router-dom";
import useFetchMoviesById from "../../../../hooks/useFetchMoviesById";

const TopRatedDescription = () => {
  const { id } = useParams();

  const { data: movie, isLoading, isError } = useFetchMoviesById(id);

  return (
    <div>
      <ShowDescriptionFromMovieOrTvShows
        item={movie}
        isLoading={isLoading}
        isError={isError}
        backLink="/topRatedCategory"
      />
    </div>
  );
};

export default TopRatedDescription;
