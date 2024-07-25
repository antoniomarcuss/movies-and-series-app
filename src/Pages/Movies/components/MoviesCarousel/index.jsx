// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Loading from "../../../../components/Loading";
import Error from "../../../../components/Error";
import { IoStarSharp } from "react-icons/io5";
import { useQuery } from "react-query";
import { FiPlus } from "react-icons/fi";
import { ApiImg } from "../../../../consts";

const MoviesCarousel = ({ queryKey, queryFn, title, movieCategory }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey,
    queryFn: () => queryFn(1),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="my-4 lg:my-0">
      <div className="flex items-center justify-between px-3 gap-2">
        <div className="flex items-center justify-center gap-2">
          <p className="text-center text-lg lg:text-xl text-white my-2 lg:my-4">
            {title}
          </p>
          <IoStarSharp className="text-yellow-300 sm:text-xl" />
        </div>
        <Link to={`/${movieCategory}`}>
          <FiPlus className="text-xl text-white md:text-2xl" />
        </Link>
      </div>

      <Loading isLoading={isLoading} />
      <Error isError={isError} />
      {!isLoading && !isError && (
        <div className="flex justify-center mt-2 mx-1">
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            breakpoints={{
              350: {
                slidesPerView: 3,
                spaceBetween: 2,
                effect: "coverflow",
              },
              640: {
                slidesPerView: 5,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 6,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 7,
                spaceBetween: 5,
              },
            }}
            modules={[Navigation]}
            navigation
          >
            {data?.data.results.map((movie) => (
              <SwiperSlide key={movie.id} className="relative">
                <Link to={`movie/${movie.id}`}>
                  <img
                    src={`${ApiImg}/${movie.poster_path}`}
                    alt={movie.title}
                    className="bg-blue-200 rounded-md w-full"
                  />
                  <div className="text-yellow-300 absolute text-xs text-bold bg-black rounded-full bg-opacity-30 p-1 bottom-6">
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <p className="text-xs sm:text-sm tracking-tighter font-medium text-center mt-1 truncate max-w-[100px] sm:max-w-28 md:max-w-36 lg:max-w-40 lg:text-[16px] w-full">
                    {movie.title}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default MoviesCarousel;

MoviesCarousel.propTypes = {
  queryKey: PropTypes.string.isRequired,
  queryFn: PropTypes.func,
  title: PropTypes.string.isRequired,
  movieCategory: PropTypes.string.isRequired,
};
