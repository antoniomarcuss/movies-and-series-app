import { useQuery } from "react-query";
import TvShowsReleases from "./TvShowsReleases";
import TvShowsTopRated from "./TvShowsTopRated";
import TvShowsPopular from "./TvShowsPopular";
import { ApiImgAutoResolution } from "../../consts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TvShowsServices } from "../../services/tvShows";
const TvShows = () => {
  const { data } = useQuery({
    queryKey: ["tvShowsReleases"],
    queryFn: () => TvShowsServices.fetchTvShowsReleases(1),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = data?.data.results.slice(0, 10).length || 0;

  useEffect(() => {
    if (totalImages > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          if (prevIndex === totalImages - 1) {
            return 0; // Imediatamente volta para a primeira imagem
          }
          return prevIndex + 1;
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [totalImages]);

  return (
    <div>
      <div className="carousel w-full     ">
        {data?.data.results.slice(0, 10).map((tvShows, index) => (
          <Link
            to={`/tvShows/${tvShows.id}`}
            key={tvShows.id}
            id="item1"
            className={`carousel-item w-full  ${
              index === currentImageIndex ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col items-center  ">
              <img
                src={`${ApiImgAutoResolution}/${tvShows.backdrop_path}`}
                className="w-full  md:h-96 object-cover lg:h-[450px] "
              />
              <h1 className="text-center mt-1 md:text-xl  w-full text-white font-bold md:w-[690px]">
                {tvShows.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex w-full justify-center gap-2 py-2">
        {data?.data.results.slice(0, 10).map((_, index) => (
          <div
            key={index}
            className={`w-2  h-2 cursor-pointer rounded-full bg-white bg-opacity-20   ${
              index === currentImageIndex && " bg-white bg-opacity-90  w-5"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          ></div>
        ))}
      </div>

      <TvShowsReleases />
      <TvShowsTopRated />
      <TvShowsPopular />
    </div>
  );
};

export default TvShows;
