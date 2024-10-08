import { useParams } from "react-router-dom";
import ShowDescriptionFromMovieOrTvShows from "../../../components/ShowDescriptionFromMovieOrTvShows";

import useFetchTvShowsById from "../../../../hooks/useFetchTvShowsById";

const TvShowsDescription = () => {
  const { tvShowId } = useParams();
  const { data: tvShow, isLoading, isError } = useFetchTvShowsById(tvShowId);

  return (
    <div className="">
      <ShowDescriptionFromMovieOrTvShows
        item={tvShow}
        backLink="/searchForMoviesOrSeries"
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default TvShowsDescription;
