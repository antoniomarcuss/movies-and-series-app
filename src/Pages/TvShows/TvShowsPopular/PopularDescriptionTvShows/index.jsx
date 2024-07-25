import ShowDescriptionFromMovieOrTvShows from "../../../components/ShowDescriptionFromMovieOrTvShows";
import { useParams } from "react-router-dom";
import useFetchTvShowsById from "../../../../hooks/useFetchTvShowsById";

const PopularDescriptionTvShows = () => {
  const { id } = useParams();

  const { data: TvShow, isLoading, isError } = useFetchTvShowsById(id);

  return (
    <div>
      <ShowDescriptionFromMovieOrTvShows
        item={TvShow}
        isLoading={isLoading}
        isError={isError}
        backLink="/tvShows/popularCategory"
      />
    </div>
  );
};

export default PopularDescriptionTvShows;
