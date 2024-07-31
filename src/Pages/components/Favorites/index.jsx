import { ApiImg } from "../../../consts";
import { FaHeart } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { Link } from "react-router-dom";
import useFavoritesViewModel from "./useFavoritesViewModel";

const Favorites = () => {
  const { favoritesItems, isLoading, isError, isSun } = useFavoritesViewModel();

  return (
    <div
      className={` min-h-screen md:max-w-[1600px] m-auto p-3 sm:p-4 ${
        isSun ? "bg-white " : "bg-gray-950 "
      }`}
    >
      <div
        className={`flex items-center gap-2     sm:px-4 ${
          isSun ? "text-blue-900 font-medium " : "text-white "
        }`}
      >
        <Link to="/">
          <IoArrowBackOutline
            className={`text-lg ${isSun && "text-blue-900"}`}
          />
        </Link>
        <div className="flex items-center gap-2">
          <h1 className={`text-lg ${isSun && "text-blue-900"}`}>Favoritos</h1>
          <FaHeart className="text-red-500 text-lg hover:text-red-600" />
        </div>
      </div>
      {favoritesItems.length === 0 && (
        <div
          className={`text-center flex items-center justify-center min-h-[70vh] sm:min-h-[90vh]  mt-4 tracking-widest ${
            isSun ? "text-blue-950 font-medium" : "text-white"
          }`}
        >
          Nenhum item encontrado nos favoritos.
        </div>
      )}
      <Loading isLoading={isLoading} />
      <Error isError={isError} />
      {!isLoading && !isError && (
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2 mt-4">
          {favoritesItems.map((item) => (
            <Link
              to={
                item.title
                  ? `/favorites/movie/${item.id}`
                  : `/favorites/tvShow/${item.id}`
              }
              key={item.id}
              className="relative"
            >
              <img
                className="rounded-md"
                src={`${ApiImg}/${item.poster_path}`}
                alt=""
              />
              <h1
                className={`self-center text-center mt-1 text-xs  truncate ${
                  isSun ? "text-blue-950 font-medium" : "text-white"
                }`}
              >
                {item.title || item.name}
              </h1>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
