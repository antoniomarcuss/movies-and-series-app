import { PropTypes } from "prop-types";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import Pagination from "../../../components/Pagination";
import { ApiImg } from "../../../consts";
import useShowCategoryViewModel from "./useShowCategoryViewModel";

const ShowCategory = ({
  queryKey,
  queryFn,
  title,
  backLinkHome = "/",
  backLink,
}) => {
  const {
    results,
    movieContainerRef,
    isSun,
    isLoading,
    isError,
    PaginationProps,
  } = useShowCategoryViewModel({
    queryKey,
    queryFn,
  });

  return (
    <div
      ref={movieContainerRef}
      className={` md:max-w-[1600px]  m-auto ${
        isSun ? "bg-white" : "bg-gray-950 "
      } `}
    >
      <div
        className={`flex items-center gap-2 p-3 sm:p-4  sm:px-4 ${
          isSun ? "  " : "bg-black bg-opacity-10"
        }`}
      >
        <Link to={backLinkHome}>
          <IoArrowBackOutline
            className={`text-lg ${isSun ? "text-blue-900" : "text-white"}`}
          />
        </Link>
        <h1
          className={`text-center text-lg sm:text-xl  ${
            isSun ? "text-blue-900 font-medium" : "text-white"
          }`}
        >
          {title}
        </h1>
      </div>
      <Loading isLoading={isLoading} />
      <Error isError={isError} />
      {!isLoading && !isError && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 mx-1 mt-4  space-x-1  gap-y-4 justify-items-center ">
          {results.map((item) => (
            <Link to={`${backLink}/${item.id}`} key={item.id}>
              <div className="flex flex-col relative  items-center">
                <div>
                  <img
                    src={` ${
                      item.poster_path
                        ? `${ApiImg}/${item.poster_path}`
                        : "./imageNotFound.jpg "
                    }`}
                    className={` w-full h-48  md:h-52 lg:h-60  object-cover rounded-md ${
                      !item.poster_path && "w-full object-cover lg:object-cover"
                    }	 rounded-md object-cover  `}
                    alt=""
                  />
                  <h1
                    className={`truncate w-[100px]  mt-2 text-xs sm:w-32 md:w-36 lg:max-w-32  pb-2 racking-wider lg:text-[13px] text-center ${
                      isSun ? "text-blue-950 font-medium" : "text-gray-200"
                    } `}
                  >
                    {item.title || item.name}
                  </h1>
                </div>

                <div className="text-yellow-300 absolute text-xs text-bold bg-black rounded-full bg-opacity-40  p-1 left-0  bottom-8 ">
                  {item.vote_average.toFixed(1)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {<Pagination {...PaginationProps} />}
    </div>
  );
};

ShowCategory.propTypes = {
  queryKey: PropTypes.array.isRequired,
  queryFn: PropTypes.func.isRequired,
  title: PropTypes.string,
  backLink: PropTypes.string.isRequired,
  backLinkHome: PropTypes.string,
};

export default ShowCategory;
