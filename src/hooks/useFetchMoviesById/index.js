import { MoviesServices } from "../../services/movies";
import { useQuery } from "react-query";

const useFetchMoviesById = (id) => {
  const data = useQuery({
    queryKey: ["genres", id],
    queryFn: () => MoviesServices.fetchMoviesById(id),
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
  return data;
};

export default useFetchMoviesById;
