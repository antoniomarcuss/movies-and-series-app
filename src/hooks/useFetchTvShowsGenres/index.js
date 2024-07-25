import { useQuery } from "react-query";

import { TvShowsServices } from "../../services/tvShows";
import { useTvShowsGenresStore } from "../../stores/useTvShowsGenresStore";

const useFetchTvShowsGenres = () => {
  const { genresTvShows, setGenresTvShows } = useTvShowsGenresStore();

  const data = useQuery({
    queryKey: ["TvShowsGenres"],
    queryFn: TvShowsServices.fetchTvShowsGenre,
    refetchOnMount: false,
    onSuccess: (data) => {
      setGenresTvShows(data.data.genres);
      // console.log(data.data.genres);
    },
  });

  return {
    ...data,
    genresTvShows,
  };
};

export default useFetchTvShowsGenres;
