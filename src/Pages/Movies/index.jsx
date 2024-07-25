import { useQuery } from "react-query";
import MoviesReleases from "./MoviesReleases";
import MoviesTopRated from "./MoviesTopRated";
import MoviesPopular from "./MoviesPopular";
import { MoviesServices } from "../../services/movies";
import { ApiImgAutoResolution } from "../../consts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Movies = () => {
  const { data } = useQuery({
    queryKey: ["releases"],
    queryFn: () => MoviesServices.fetchMoviesReleases(1),
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
      }, 5000); // Tempo de transição entre imagens (1 segundo)

      return () => clearInterval(interval);
    }
  }, [totalImages]);

  return (
    <div>
      <div className="carousel w-full     ">
        {data?.data.results.slice(0, 10).map((movie, index) => (
          <Link
            to={`movie/${movie.id}`}
            key={movie.id}
            id="item1"
            className={`carousel-item w-full  ${
              index === currentImageIndex ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col items-center  ">
              <img
                src={`${ApiImgAutoResolution}/${movie.backdrop_path}`}
                className="w-full  md:h-96 object-cover lg:h-[450px] "
              />
              <h1 className="text-center mt-1 md:text-xl  w-full text-white font-bold md:w-[690px]">
                {movie.title}
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

      <MoviesReleases />
      <MoviesTopRated />
      <MoviesPopular />
    </div>
  );
};

export default Movies;
