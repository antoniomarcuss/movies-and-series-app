import { Link, NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import useFetchGenres from "../../hooks/useFetchGenres";

const Header = () => {
  const { genres } = useFetchGenres();

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

  return (
    <div className="navbar  absolute bg-black bg-opacity-80">
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
            className="menu menu-sm dropdown-content bg-gray-950 rounded-box  mt-3 w-52 p-2 shadow z-50"
          >
            {genres?.map((genre) => (
              <li key={genre.id}>
                <Link
                  to={`genre/${genre.name}/${genre.id}`}
                  className="text-lg  "
                >
                  {genre.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sm:navbar-start navbar-center flex gap-4  p-2 px-6 text-center">
        {ActivePage.map((active) => (
          <NavLink
            key={active.link}
            to={active.link}
            className={({ isActive }) =>
              isActive
                ? " border-2 w-[80%] text-white   border-b-blue-600 border-t-0 border-l-0 border-r-0 transition-all duration-300"
                : " border-b-gray-500 w-[40%] text-white hover:border-b-white border-b-2  transition-all duration-300"
            }
          >
            {active.page}
          </NavLink>
        ))}
      </div>
      <div className="navbar-end">
        <Link to="searchForMoviesOrSeries">
          <button className=" btn btn-ghost btn-circle ">
            <CiSearch className="text-white text-xl  lg:text-2xl " />
          </button>
        </Link>
        <button className="btn btn-ghost btn-circle ">
          <FaHeart className="text-red-500 text-lg hover:text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default Header;
