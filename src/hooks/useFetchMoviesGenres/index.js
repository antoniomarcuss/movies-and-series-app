import { useQuery } from "react-query";
import { useMoviesGenresStore } from "../../stores/useMoviesGenresStore";
import { MoviesServices } from "../../services/movies";

const useFetchMoviesGenres = () => {
  const { genres, setGenres } = useMoviesGenresStore();

  const data = useQuery({
    queryKey: ["genres"],
    queryFn: MoviesServices.fetchMoviesGenre,
    refetchOnMount: false,
    onSuccess: (data) => {
      setGenres(data.data.genres);
    },
  });

  return {
    ...data,
    genres,
  };
};

export default useFetchMoviesGenres;
