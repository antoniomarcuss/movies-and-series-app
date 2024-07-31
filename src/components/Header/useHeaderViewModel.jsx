import { Link, useLocation } from "react-router-dom";
import useFetchMoviesGenres from "../../hooks/useFetchMoviesGenres";
import useFetchTvShowsGenres from "../../hooks/useFetchTvShowsGenres";
import { useThemeControllerStore } from "../../stores/ThemeControllerStore";
const useHeaderViewModel = () => {
  const location = useLocation();
  const { genres } = useFetchMoviesGenres();
  const { genresTvShows } = useFetchTvShowsGenres();

  const { isSun, setIsSun } = useThemeControllerStore();

  const ActivePage = [
    {
      page: "Filmes",
      link: "/",
    },
    {
      page: "Séries",
      link: "/tvShows",
    },
  ];

  const renderGenres = () => {
    if (location.pathname === "/" && genres) {
      return genres.map((genre) => (
        <li key={genre.id}>
          <Link to={`genre/${genre.name}/${genre.id}`} className={` text-lg `}>
            {genre.name}
          </Link>
        </li>
      ));
    } else if (location.pathname === "/tvShows" && genresTvShows) {
      return genresTvShows.map((genre) => (
        <li key={genre.id}>
          <Link
            to={`tvShows/genre/${genre.name}/${genre.id}`}
            className="text-lg"
          >
            {genre.name}
          </Link>
        </li>
      ));
    }
    return null;
  };

  return {
    isSun,
    setIsSun,
    ActivePage,
    renderGenres,
  };
};

export default useHeaderViewModel;
