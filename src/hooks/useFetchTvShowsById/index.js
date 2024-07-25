import { useQuery } from "react-query";
import { TvShowsServices } from "../../services/tvShows";

const useFetchTvShowsById = (id) => {
  const data = useQuery({
    queryKey: ["TvShowsGenres", id],
    queryFn: () => TvShowsServices.fetchTvShowsById(id),
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
  return data;
};

export default useFetchTvShowsById;
