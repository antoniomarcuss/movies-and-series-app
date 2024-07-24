import { PropTypes } from "prop-types";
import { IoCaretBackSharp, IoStarSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ApiImg } from "../../../consts";
import { FaHeart } from "react-icons/fa";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const ShowDescriptionFromMovieOrTvShows = ({
  item,
  backLink,
  isLoading,
  isError,
}) => {
  const quantityOfVideos = item?.data.videos.results.length;
  const genres = item?.data.genres.map((item) => item.name);
  const production = item?.data.production_companies
    .slice(1, 3)
    .map((item) => item.name);

  return (
    <div className="lg:max-w-[1600px] relative min-h-screen bg-gray-950 w-full m-auto">
      <Loading isLoading={isLoading} />
      <Error isError={isError} />
      {!isLoading && !isError && (
        <>
          <Link
            to={`${backLink}`}
            className="absolute bg-black py-8 bg-opacity-40 w-full"
          >
            <IoCaretBackSharp className="absolute text-2xl top-5 left-5 text-white" />
          </Link>
          <div className="w-full bg-red-200 h-60 sm:h-96 md:h-[400px] lg:md:h-80">
            <img
              className="w-full h-full object-cover"
              src={`${ApiImg}/${item?.data.backdrop_path}`}
              alt=""
            />
          </div>
          <div className="relative sm:max-w-[80%] lg:max-w-[1400px] lg:w-[70%] m-auto bg-black p-2 bg-opacity-50 rounded-lg -top-10 sm:-top-36 ">
            <div className="flex items-center sm:p-3 lg:pl-[5vw] gap-2">
              <div className="w-48 sm:w-1/1 sm:p-1 max-w-52 sm:max-w-60 flex sm:items-center justify-between">
                <img
                  className="w-full rounded-md object-scale-down"
                  src={`${ApiImg}/${item?.data.poster_path}`}
                  alt=""
                />
              </div>
              <div className="flex flex-col sm:gap-2 lg:gap-4">
                <h1 className="font-bold self-center text-white text-sm sm:text-xl lg:text-3xl">
                  {item?.data.title || item?.data.name}
                </h1>
                <div>
                  <p className="border bg-black bg-opacity-60 border-yellow-300 px-2 p-1 w-fit text-xs text-yellow-300 sm:text-sm lg:text-lg">
                    {genres?.join(" / ") || item?.data.genres[0]}
                  </p>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3 mt-2 sm:mt-3">
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 sm:items-center text-yellow-300 text-xs">
                    <p className="text-white text-xs sm:text-md lg:text-lg">
                      {item?.data.runtime ? item?.data.runtime + " MIN" : ""}
                    </p>
                    <div className="flex sm:items-center sm:justify-center gap-2">
                      <span className="sm:text-md lg:text-lg">
                        {item?.data.release_date || item?.data.first_air_date}
                      </span>
                      <span className="sm:text-md lg:text-lg">
                        ({item?.data.origin_country})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center my-1 gap-2">
                    <IoStarSharp className="text-yellow-300 sm:text-xl" />
                    <p className="text-center text-yellow-300 sm:text-xl">
                      {item?.data.vote_average.toFixed(1)}
                    </p>
                    <span className="bg-black text-yellow-300 border border-yellow-300 w-12 sm:w-20 h-6 sm:h-8 text-center text-sm sm:text-xl">
                      IMDb
                    </span>
                  </div>
                  {item?.data?.budget ? (
                    <div className="flex flex-col sm:items-center sm:gap-3 sm:flex-row">
                      <h1 className="text-white text-sm sm:text-md lg:text-lg">
                        Orçamento:
                      </h1>
                      <p className="text-yellow-300 text-xs lg:text-md lg:text-lg">
                        {new Intl.NumberFormat("pt-BR", {
                          currency: "BRL",
                          style: "currency",
                        }).format(item?.data.budget)}
                      </p>
                    </div>
                  ) : null}
                  <div className="flex flex-col sm:justify-between sm:gap-y-2">
                    {production?.length > 0 && (
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-1">
                        <h1 className="text-white text-sm md:text-md lg:text-lg">
                          Produção:
                        </h1>
                        <p className="text-xs lg:text-lg text-yellow-300 sm:text-sm">
                          {production?.join(" / ")}
                        </p>
                      </div>
                    )}
                    <Link className="mt-2">
                      <FaHeart className="text-2xl text-sm:text-3xl" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 flex flex-col items-center gap-1 lg:w-[700px] m-auto text-justify">
              <h1 className="text-lg md:text-xl lg:text-2xl text-white tracking-widest">
                Sinopse
              </h1>
              <p>{item?.data.overview}</p>
            </div>

            <div className="flex justify-center mt-3">
              <div className="w-full">
                <h3 className="text-center text-lg md:text-2xl tracking-widest sm:text-xl my-4">
                  Elenco
                </h3>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={3}
                  breakpoints={{
                    350: {
                      slidesPerView: 3,
                      spaceBetween: 5,
                    },
                    640: {
                      slidesPerView: 4,
                      spaceBetween: 5,
                    },
                    768: {
                      slidesPerView: 5,
                      spaceBetween: 5,
                    },
                    1024: {
                      slidesPerView: 6,
                      spaceBetween: 5,
                    },
                  }}
                  modules={[Navigation]}
                  navigation
                >
                  {item?.data.credits.cast.slice(0, 10).map((cast) => (
                    <SwiperSlide key={cast.id} className="relative">
                      <Link>
                        <img
                          src={`${
                            cast.profile_path
                              ? `${ApiImg}/${cast.profile_path}`
                              : "/defaultPerson.avif"
                          }`}
                          className="w-full rounded-md h-48 object-cover"
                          alt={cast.name}
                        />
                        <div className="text-yellow-300 text-xs text-center mt-1">
                          {cast.character}
                        </div>
                        <div className="text-xs text-center">{cast.name}</div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {quantityOfVideos > 0 && (
              <div className="mt-6">
                <h3 className="text-center text-lg md:text-2xl tracking-widest sm:text-xl my-4">
                  Trailers
                </h3>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  breakpoints={{
                    350: {
                      slidesPerView: 1,
                      spaceBetween: 5,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 5,
                    },

                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 5,
                    },
                  }}
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                >
                  {item?.data.videos.results.slice(0, 5).map((video) => (
                    <SwiperSlide key={video.id} className="relative">
                      <iframe
                        className="w-full h-48 lg:h-60"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        frameBorder="0"
                        allowFullScreen
                        title={video.name}
                      ></iframe>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

ShowDescriptionFromMovieOrTvShows.propTypes = {
  item: PropTypes.object,
  backLink: PropTypes.string,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

export default ShowDescriptionFromMovieOrTvShows;
