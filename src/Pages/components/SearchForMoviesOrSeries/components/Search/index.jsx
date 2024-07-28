import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { ApiImg } from "../../../../../consts";
import { useThemeControllerStore } from "../../../../../stores/ThemeControllerStore";

const Search = ({ category, title }) => {
  const isSun = useThemeControllerStore(({ isSun }) => isSun);
  return (
    <div className="md:max-w-[1600px] md:w-[90%]  m-auto">
      <h1
        className={`  text-lg md:text-xl text-center tracking-widest font-medium ${
          isSun ? "font-medium text-blue-950" : "text-gray-400"
        }`}
      >
        {title}
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-4  lg:grid-cols-6 mx-2 mt-4 space-x-1 lg:space-4 gap-y-4 justify-items-center  ">
        {category.map((item) => (
          <Link
            to={`/searchForMoviesOrSeries/${
              title === "Filmes" ? "movieDescription" : "tvShowDescription"
            }/${item.id}`}
            key={item.id}
          >
            <div className="flex flex-col relative items-center">
              <div>
                <img
                  src={`${
                    item.poster_path
                      ? `${ApiImg}/${item.poster_path}`
                      : "./imageNotFound.jpg "
                  }`}
                  className={` max-h-44  sm:min-h-56 h-full object-cover  rounded-md  ${
                    !item.poster_path
                      ? " w-32 h-44 sm:w-40   lg:object-cover "
                      : "lg:object-contain"
                  }`}
                  alt=""
                />
                <h1
                  className={`truncate w-[100px]  mt-1 text-xs sm:w-32 md:w-36 lg:max-w-32  pb-2 racking-wider lg:text-[13px] text-center ${
                    isSun ? "text-blue-950 font-medium " : "text-gray-400"
                  } `}
                >
                  {item.title || item.name}
                </h1>
              </div>

              <div
                className={`text-yellow-300 absolute text-xs font-bold bg-black rounded-full bg-opacity-40 p-1 left-1 bottom-9  `}
              >
                {item.vote_average?.toFixed(1)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;

Search.propTypes = {
  category: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
