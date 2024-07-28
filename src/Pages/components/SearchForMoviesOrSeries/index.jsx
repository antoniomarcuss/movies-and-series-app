import { useState, useCallback, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "react-query";
import { MoviesServices } from "../../../services/movies";
import Pagination from "../../../components/Pagination";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { Link } from "react-router-dom";
import { IoCaretBackSharp } from "react-icons/io5";
import { throttle } from "../../../utils/throttle";
import { TvShowsServices } from "../../../services/tvShows";

import Search from "./components/Search";
import { useThemeControllerStore } from "../../../stores/ThemeControllerStore";

const SearchForMoviesOrSeries = () => {
  const [moviePage, setMoviePage] = useState(1);
  const [tvPage, setTvPage] = useState(1);
  const [activeTab, setActiveTab] = useState("movies");
  const [searchQuery, setSearchQuery] = useState("");

  const isSun = useThemeControllerStore(({ isSun }) => isSun);
  const throttledSearch = useCallback(
    throttle((value) => setSearchQuery(value), 800),
    []
  );

  const handleSearchValue = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    throttledSearch(value);
    if (value.trim()) {
      localStorage.setItem("searchValue", value);
      return;
    }
    localStorage.removeItem("searchValue");
  };

  useEffect(() => {
    const searchValue = localStorage.getItem("searchValue");
    if (searchValue) {
      setSearchQuery(searchValue);
    }
  }, []);

  const {
    data: movieData,
    isLoading: isLoadingMovies,
    isError: isErrorMovies,
  } = useQuery({
    queryKey: ["searchMovies", searchQuery, moviePage],
    queryFn: () => MoviesServices.SearchMovies(searchQuery, moviePage),
    enabled: !!searchQuery,
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 10, // 10 minutos
    refetchOnMount: false,
  });

  const {
    data: tvData,
    isLoading: isLoadingTv,
    isError: isErrorTv,
  } = useQuery({
    queryKey: ["searchTv", searchQuery, tvPage],
    queryFn: () => TvShowsServices.SearchTvShows(searchQuery, tvPage),
    enabled: !!searchQuery,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 10, // 10 minutos
  });

  const handlePageChange = (newPage) => {
    if (activeTab === "movies") {
      setMoviePage(newPage);
    } else {
      setTvPage(newPage);
    }
  };

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

  const visiblePages =
    activeTab === "movies"
      ? getVisiblePages(moviePage, movieData?.data?.total_pages || 0)
      : getVisiblePages(tvPage, tvData?.data?.total_pages || 0);

  const totalResults = (data) =>
    data?.data?.total_results > 999 ? "999+" : data?.data?.total_results || 0;

  const totalResultsTv = totalResults(tvData);
  const totalResultsMovies = totalResults(movieData);

  const activeCategory =
    activeTab === "movies" ? movieData?.data?.results : tvData?.data?.results;

  return (
    <div
      className={` min-h-screen m-auto ${isSun ? "bg-white " : "bg-gray-950"} `}
    >
      <div className="flex items-center justify-between py-2 px-5 lg:px-12">
        <Link to={`/`}>
          <IoCaretBackSharp
            className={`text-2xl top-5 left-5  ${
              isSun ? "text-blue-900" : "text-white"
            } `}
          />
        </Link>
        <form className="flex items-center py-4 justify-center max-w-[70%] w-full">
          <input
            type="search"
            autoFocus
            placeholder="Buscar aqui..."
            className={`border  p-2 border-r-0 w-full outline-none px-2 rounded-l-md ${
              isSun
                ? "bg-gray-500 border-0 text-white  placeholder:text-white "
                : "border-gray-500"
            }`}
            value={searchQuery}
            onChange={handleSearchValue}
          />
          <button
            type="button"
            className={`border  border-l-0 p-3 rounded-r-md ${
              isSun
                ? "border-gray-400 border-0 bg-black hover:bg-blue-950  "
                : "border-gray-500"
            }`}
            onClick={() => setSearchQuery(searchQuery)}
          >
            <CiSearch className={`text-white `} />
          </button>
        </form>
      </div>
      <div
        className={`flex h-12  md:max-w-[1600px] md:w-[90%] m-auto  p-2 items-center justify-evenly gap-10 mt-4 rounded-md ${
          isSun ? "bg-blue-900 " : ""
        }`}
      >
        <button
          onClick={() => setActiveTab("movies")}
          className={`relative  max-w-40 sm:max-w-60 lg:max-w-80 w-full ${
            activeTab === "movies"
              ? "text-white "
              : "text-white text-opacity-40 "
          }`}
        >
          Filmes
          {movieData && (
            <span className="bg-white text-blue-600 font-medium rounded-full h-6 text-center max-w-12 w-full absolute bottom-5 left-20 sm:left-32 lg:left-40">
              {totalResultsMovies}
            </span>
          )}
          <div
            className={`  transition-all h-[1px] w-full ${
              activeTab === "movies" ? "bg-blue-600" : "bg-white bg-opacity-20"
            }`}
          />
        </button>
        <button
          onClick={() => setActiveTab("series")}
          className={`relative  max-w-40 sm:max-w-60 lg:max-w-80 w-full ${
            activeTab === "series" ? "text-white" : "text-white text-opacity-40"
          }`}
        >
          Séries
          {tvData && (
            <span className="bg-white text-blue-600 font-medium rounded-full h-6 text-center max-w-12 w-full absolute bottom-5 left-20 sm:left-32 lg:left-40">
              {totalResultsTv}
            </span>
          )}
          <div
            className={`  transition-all h-[1px] w-full ${
              activeTab === "series" ? "bg-blue-600" : "bg-white bg-opacity-20"
            }`}
          />
        </button>
      </div>
      <Loading isLoading={isLoadingMovies || isLoadingTv} />
      <Error isError={isErrorMovies || isErrorTv} />
      {!isLoadingMovies && !isLoadingTv && activeCategory?.length > 0 && (
        <Search
          category={activeCategory}
          title={activeTab === "movies" ? "Filmes" : "Séries"}
        />
      )}

      {(movieData || tvData) && (
        <Pagination
          handlePageChange={handlePageChange}
          page={activeTab === "movies" ? moviePage : tvPage}
          totalPages={
            activeTab === "movies"
              ? movieData?.data?.total_pages || 0
              : tvData?.data?.total_pages || 0
          }
          visiblePages={visiblePages}
        />
      )}
    </div>
  );
};

export default SearchForMoviesOrSeries;
