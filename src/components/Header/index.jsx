import { Link, NavLink, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import useFetchMoviesGenres from "../../hooks/useFetchMoviesGenres";
import useFetchTvShowsGenres from "../../hooks/useFetchTvShowsGenres";
import { useThemeControllerStore } from "../../stores/ThemeControllerStore";

const Header = () => {
  const { genres } = useFetchMoviesGenres();
  const { genresTvShows } = useFetchTvShowsGenres();
  const location = useLocation();

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

  return (
    <div
      className="navbar absolute bg-black bg-opacity-80 
      "
    >
      <div className="navbar-start flex items-center gap-2 sm:gap-5 ">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-gray-400 hover:text-white"
          >
            <FaFilter />
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm md:menu-md dropdown-content bg-gray-950 text-gray-400 rounded-box mt-3 w-52 p-2 shadow z-50 ${
              isSun && "bg-gray-100  text-gray-600 font-medium"
            }`}
          >
            {renderGenres()}
          </ul>
        </div>
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller "
            checked={isSun}
            onChange={() => setIsSun(!isSun)}
          />

          <svg
            className="swap-off  h-6 w-5 fill-current text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
          <svg
            className={`swap-on h-6 w-6 fill-current  ${
              isSun && "text-yellow-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
        </label>
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
