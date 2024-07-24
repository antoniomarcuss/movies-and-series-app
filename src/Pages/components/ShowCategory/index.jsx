import { PropTypes } from "prop-types";
import { useQuery } from "react-query";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { useEffect, useRef, useState } from "react";
import Pagination from "../../../components/Pagination";
import { ApiImg } from "../../../consts";

const ShowCategory = ({ queryKey, queryFn, title, backLink }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey, page],
    queryFn: () => queryFn(page),
    staleTime: page === 1 ? 0 : 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setTotalPages(data.data.total_pages);
    },
  });
  const movieContainerRef = useRef(null);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const scrollToTop = () => {
    if (movieContainerRef.current && !isLoading && !isError) {
      movieContainerRef.current.scrollIntoView({ behavior: "auto" });
    }
  };
  useEffect(() => {
    scrollToTop();
  }, [page]);

  const getVisiblePages = (currentPage, total) => {
    const visiblePages = 4;
    const startPage =
      Math.floor((currentPage - 1) / visiblePages) * visiblePages + 1;
    const endPage = Math.min(startPage + visiblePages - 1, total);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div
      ref={movieContainerRef}
      className="bg-black bg-opacity-50 md:max-w-[1600px]  m-auto "
    >
      <div className="flex items-center gap-2 p-3 sm:p-4 bg-black bg-opacity-10 sm:px-4">
        <Link to="/">
          <IoArrowBackOutline className="text-lg" />
        </Link>
        <h1 className="text-center text-lg sm:text-xl">{title}</h1>
      </div>
      <Loading isLoading={isLoading} />
      <Error isError={isError} />
      {!isLoading && !isError && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 mx-1 mt-4  space-x-1  gap-y-4 justify-items-center">
          {data?.data.results.map((movie) => (
            <Link to={`/${backLink}/${movie.id}`} key={movie.id}>
              <div className="flex flex-col relative  items-center">
                <div>
                  <img
                    src={` ${
                      movie.poster_path
                        ? `${ApiImg}/${movie.poster_path}`
                        : "./imageNotFound.jpg "
                    }`}
                    className={` w-full h-48  md:h-52 lg:h-60  object-cover rounded-md ${
                      !movie.poster_path &&
                      "w-full object-cover lg:object-cover"
                    }	 rounded-md object-cover  `}
                    alt=""
                  />
                  <h1 className="truncate w-[100px]  mt-2 text-xs sm:w-32 md:w-36 lg:max-w-32  pb-2 racking-wider lg:text-[13px] ">
                    {movie.title}
                  </h1>
                </div>

                <div className="text-yellow-300 absolute text-xs text-bold bg-black rounded-full bg-opacity-40  p-1 left-0  bottom-8 ">
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {
        <Pagination
          handlePageChange={handlePageChange}
          page={page}
          totalPages={totalPages}
          visiblePages={visiblePages}
        />
      }
    </div>
  );
};

ShowCategory.propTypes = {
  queryKey: PropTypes.array.isRequired,
  queryFn: PropTypes.func.isRequired,
  title: PropTypes.string,
  backLink: PropTypes.string.isRequired,
};

export default ShowCategory;
