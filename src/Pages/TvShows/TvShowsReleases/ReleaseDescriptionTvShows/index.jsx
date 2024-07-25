import { useQuery } from "react-query";
import { MoviesServices } from "../../../../services/movies";
import ShowDescriptionFromMovieOrTvShows from "../../../components/ShowDescriptionFromMovieOrTvShows";
import { useParams } from "react-router-dom";
import useFetchTvShowsById from "../../../../hooks/useFetchTvShowsById";

const ReleaseDescriptionTvShows = () => {
  const { id } = useParams();
  console.log(id);
  const { data: tvShow, isLoading, isError } = useFetchTvShowsById(id);

  return (
    <div>
      <ShowDescriptionFromMovieOrTvShows
        item={tvShow}
        isLoading={isLoading}
        isError={isError}
        backLink="/tvShows/releasesCategory"
      />
    </div>
  );
};

export default ReleaseDescriptionTvShows;
