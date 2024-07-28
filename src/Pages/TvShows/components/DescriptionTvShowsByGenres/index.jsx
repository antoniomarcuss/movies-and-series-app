import { useParams } from "react-router-dom";
import ShowDescriptionFromMovieOrTvShows from "../../../components/ShowDescriptionFromMovieOrTvShows";

import useFetchTvShowsById from "../../../../hooks/useFetchTvShowsById";

const DescriptionTvShowsByGenres = () => {
  const { genreName, genreId, tvShowId } = useParams();

  const { data: tvShows, isLoading, isError } = useFetchTvShowsById(tvShowId);

  return (
    <div>
      <ShowDescriptionFromMovieOrTvShows
        item={tvShows}
        isLoading={isLoading}
        isError={isError}
        backLink={`/tvShows/genre/${genreName}/${genreId}`}
        backLinkHome={`/tvShows/genre/${genreName}/${genreId}`}
      />
    </div>
  );
};
export default DescriptionTvShowsByGenres;
