import { useQuery } from "react-query";
import { useGenresMoviesStore } from "../../stores/GenresMoviesStore";
import { MoviesServices } from "../../services/movies";

const useFetchGenres = () => {
  const { genres, setGenres } = useGenresMoviesStore();

  const data = useQuery({
    queryKey: ["genres"],
    queryFn: MoviesServices.fetchMoviesGenre,
    refetchOnMount: false,
    onSuccess: (data) => {
      setGenres(data.data.genres);
      // console.log(data.data.genres);
    },
  });

  return {
    ...data,
    genres,
  };
};

export default useFetchGenres;
