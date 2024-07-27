import { useState } from "react";
import { useFavoritesStore } from "../../../stores/useFavoritesStore";
import { useQuery } from "react-query";
import { MoviesServices } from "../../../services/movies";
import { ApiImg } from "../../../consts";
import { FaHeart } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { Link } from "react-router-dom";
import { TvShowsServices } from "../../../services/tvShows";

const Favorites = () => {
  const { favorites } = useFavoritesStore();
  const [moviesData, setMoviesData] = useState([]);
  const [tvShowsData, setTvShowsData] = useState([]);

  const { isLoading: isLoadingMovies, isError: isErrorMovies } = useQuery({
    queryKey: ["favoritesMovies", favorites],
    queryFn: () =>
      Promise.all(
        favorites
          .filter((fav) => fav.type === "movie")
          .map((fav) => MoviesServices.fetchMoviesById(fav.id))
      ),
    enabled: favorites.some((fav) => fav.type === "movie"),
    onSuccess: (data) => {
      setMoviesData(data.map((response) => response.data));
    },
  });

  const { isLoading: isLoadingTvShows, isError: isErrorTvShows } = useQuery({
    queryKey: ["favoritesTvShows", favorites],
    queryFn: () =>
      Promise.all(
        favorites
          .filter((fav) => fav.type === "tvShow")
          .map((fav) => TvShowsServices.fetchTvShowsById(fav.id))
      ),
    enabled: favorites.some((fav) => fav.type === "tvShow"),
    onSuccess: (data) => {
      setTvShowsData(data.map((response) => response.data));
    },
  });

  const isLoading = isLoadingMovies || isLoadingTvShows;
  const isError = isErrorMovies || isErrorTvShows;

  const favoritesItems = [...moviesData, ...tvShowsData];

  return (
    <div className="bg-black bg-opacity-50 min-h-screen md:max-w-[1600px] m-auto p-3 sm:p-4">
      <div className="flex items-center gap-2 bg-black bg-opacity-10 sm:px-4">
        <Link to="/">
          <IoArrowBackOutline className="text-lg" />
        </Link>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Favoritos</h1>
          <FaHeart className="text-red-500 text-lg hover:text-red-600" />
        </div>
      </div>
      {favoritesItems.length === 0 && (
        <div className="text-center flex items-center justify-center min-h-[70vh] sm:min-h-[90vh] text-white mt-4 tracking-widest">
          Nenhum item encontrado nos favoritos.
        </div>
      )}
      <Loading isLoading={isLoading} />
      <Error isError={isError} />
      {!isLoading && !isError && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2 mt-4">
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
              <img src={`${ApiImg}/${item.poster_path}`} alt="" />
              <h1 className="self-center text-xs text-white truncate">
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
