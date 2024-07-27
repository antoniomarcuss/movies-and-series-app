import ShowDescriptionFromMovieOrTvShows from "../../../components/ShowDescriptionFromMovieOrTvShows";
import { useParams } from "react-router-dom";
import useFetchTvShowsById from "../../../../hooks/useFetchTvShowsById";

const TopRatedDescriptionTvShows = () => {
  const { tvShowId } = useParams();

  const { data: tvShow, isLoading, isError } = useFetchTvShowsById(tvShowId);

  return (
    <div>
      <ShowDescriptionFromMovieOrTvShows
        item={tvShow}
        isLoading={isLoading}
        isError={isError}
        backLink="/tvShows/topRatedCategory"
      />
    </div>
  );
};

export default TopRatedDescriptionTvShows;
