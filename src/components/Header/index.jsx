import { Link, NavLink, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import useFetchMoviesGenres from "../../hooks/useFetchMoviesGenres";
import useFetchTvShowsGenres from "../../hooks/useFetchTvShowsGenres";

const Header = () => {
  const { genres } = useFetchMoviesGenres();
  const { genresTvShows } = useFetchTvShowsGenres();
  const location = useLocation();

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
          <Link to={`genre/${genre.name}/${genre.id}`} className="text-lg">
            {genre.name}
          </Link>
        </li>
      ));
    } else if (location.pathname === "/tvShows" && genresTvShows) {
      return genresTvShows.map((genre) => (
        <li key={genre.id}>
          <Link
            to={`/tvShows/genre/${genre.name}/${genre.id}`}
            className="text-lg"
          >
            {genre.name}
          </Link>
        </li>
      ));
    }
    return null;
  };

  return (
    <div className="navbar absolute bg-black bg-opacity-80">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle hover:text-white"
          >
            <FaFilter />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-950 rounded-box mt-3 w-52 p-2 shadow z-50"
          >
            {renderGenres()}
          </ul>
        </div>
      </div>
      <div className="sm:navbar-start navbar-center flex gap-4 p-2 px-6 text-center">
        {ActivePage.map((active) => (
          <NavLink
            key={active.link}
            to={active.link}
            className={({ isActive }) =>
              isActive
                ? "border-2 sm:w-[80%] text-white border-b-blue-600 border-t-0 border-l-0 border-r-0 transition-all duration-300"
                : "border-b-gray-500 sm:w-[40%] text-white hover:border-b-white border-b-2 transition-all duration-300"
            }
          >
            {active.page}
          </NavLink>
        ))}
      </div>
      <div className="navbar-end">
        <Link to="searchForMoviesOrSeries">
          <button className="btn btn-ghost btn-circle">
            <CiSearch className="text-white text-xl lg:text-2xl" />
          </button>
        </Link>
        <Link to={"/favorites"} className="btn btn-ghost btn-circle">
          <FaHeart className="text-red-500 text-lg hover:text-red-600" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
