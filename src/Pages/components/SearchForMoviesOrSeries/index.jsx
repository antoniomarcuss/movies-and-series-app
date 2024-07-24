import { useState, useCallback } from "react";
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

const SearchForMoviesOrSeries = () => {
  const [query, setQuery] = useState("");
  const [moviePage, setMoviePage] = useState(1);
  const [tvPage, setTvPage] = useState(1);
  const [activeTab, setActiveTab] = useState("movies");
  const [searchQuery, setSearchQuery] = useState("");

  const throttledSearch = useCallback(
    throttle((value) => setSearchQuery(value), 800),
    []
  );

  const handleSearchValue = (e) => {
    setQuery(e.target.value);
    throttledSearch(e.target.value);
  };

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
    <div className="bg-black bg-opacity-70 min-h-screen m-auto ">
      <div className="flex items-center justify-between py-2 px-5 lg:px-12">
        <Link to={`/`}>
          <IoCaretBackSharp className="text-2xl top-5 left-5 text-white " />
        </Link>
        <form className="flex items-center py-4 justify-center max-w-[70%] w-full">
          <input
            type="search"
            autoFocus
            placeholder="Buscar aqui..."
            className="border border-gray-500 p-2 border-r-0 w-full outline-none px-2 rounded-l-md"
            value={query}
            onChange={handleSearchValue}
          />
          <button
            type="button"
            className="border border-gray-500 border-l-0 p-3 rounded-r-md"
            onClick={() => setSearchQuery(query)}
          >
            <CiSearch className="text-white" />
          </button>
        </form>
      </div>
      <div className="flex h-12  md:max-w-[1600px] md:w-[80%] m-auto bg-black bg-opacity-30 p-2 items-center justify-evenly gap-10 mt-4">
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
          title={activeTab === "movies" ? "Filmes" : "Series"}
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
