import { useParams } from "react-router-dom";
import ShowDescriptionFromMovieOrTvShows from "../../components/ShowDescriptionFromMovieOrTvShows";
import useFetchTvShowsById from "../../../hooks/useFetchTvShowsById";
const ShowDescriptionCarouselMovies = () => {
  const { tvShowId } = useParams();

  const { data: tvShows, isLoading, isError } = useFetchTvShowsById(tvShowId);
  return (
    <div>
      <ShowDescriptionFromMovieOrTvShows
        item={tvShows}
        isLoading={isLoading}
        isError={isError}
        backLink="/tvShows"
      />
    </div>
  );
};

export default ShowDescriptionCarouselMovies;
