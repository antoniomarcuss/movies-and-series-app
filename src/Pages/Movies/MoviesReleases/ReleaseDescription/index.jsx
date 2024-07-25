import ShowDescriptionFromMovieOrTvShows from "../../../components/ShowDescriptionFromMovieOrTvShows";
import { useParams } from "react-router-dom";
import useFetchMoviesById from "../../../../hooks/useFetchMoviesById";

const ReleaseDescription = () => {
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useFetchMoviesById(id);

  return (
    <div>
      <ShowDescriptionFromMovieOrTvShows
        item={movie}
        isLoading={isLoading}
        isError={isError}
        backLink="/releasesCategory"
      />
    </div>
  );
};

export default ReleaseDescription;
