import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { ApiImg } from "../../../../../consts";
import { useThemeControllerStore } from "../../../../../stores/ThemeControllerStore";

const Search = ({ category, title }) => {
  const isSun = useThemeControllerStore(({ isSun }) => isSun);
  return (
    <div className="md:max-w-[1600px] md:w-[90%]  m-auto">
      <h1 className="  text-lg md:text-xl text-center tracking-widest text-white font-medium">
        {title}
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 mx-2 mt-4 space-x-1 lg:space-4 gap-y-4  ">
        {category.map((item) => (
          <Link
            to={`/searchForMoviesOrSeries/${
              title === "Filmes" ? "movieDescription" : "tvShowDescription"
            }/${item.id}`}
            key={item.id}
          >
            <div className="flex flex-col relative items-center">
              <div className={`  w-full h-56   rounded-md`}>
                <img
                  src={`${
                    item.poster_path
                      ? `${ApiImg}/${item.poster_path}`
                      : "./imageNotFound.jpg "
                  }`}
                  className={` ${
                    !item.poster_path && "w-32 object-cover lg:object-cover "
                  }	 rounded-md h-48  sm:h-48   object-cover lg:object-contain `}
                  alt=""
                />
                <h1
                  className={`truncate w-[100px]  mt-2 text-xs sm:w-32 md:w-36 lg:max-w-32  pb-2 racking-wider lg:text-[13px] text-center ${
                    isSun && "text-blue-950 "
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
