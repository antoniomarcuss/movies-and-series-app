import { useParams } from "react-router-dom";
import ShowDescriptionFromMovieOrTvShows from "../../../components/ShowDescriptionFromMovieOrTvShows";
import { useQuery } from "react-query";
import { TvShowsServices } from "../../../../services/tvShows";
import useFetchMoviesById from "../../../../hooks/useFetchMoviesById";

const TvShowsDescription = () => {
  const { tvShowId } = useParams();
  const { data: tvShow, isLoading, isError } = useFetchMoviesById(tvShowId);

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
