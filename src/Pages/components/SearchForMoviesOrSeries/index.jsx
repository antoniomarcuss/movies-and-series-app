import { CiSearch } from "react-icons/ci";
import Pagination from "../../../components/Pagination";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { Link } from "react-router-dom";
import { IoCaretBackSharp } from "react-icons/io5";

import Search from "./components/Search";
import useSearchForMoviesOrSeriesViewModel from "./useSearchForMoviesOrSeriesViewModel";

const SearchForMoviesOrSeries = () => {
  const {
    isSun,
    searchQuery,
    setSearchQuery,
    handleSearchValue,
    activeTab,
    setActiveTab,
    movieData,
    totalResultsMovies,
    totalResultsTv,
    tvData,
    activeCategory,
    PaginationProps,
  } = useSearchForMoviesOrSeriesViewModel();

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
            className={`border p-2 border-r-0 w-full outline-none px-2 rounded-l-md ${
              isSun
                ? "bg-blue-950 border-0 text-white  placeholder:text-white "
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
          isSun ? "bg-current " : ""
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
      <Loading isLoading={movieData.isLoading || tvData.isLoading} />
      <Error isError={movieData.isError || tvData.isError} />
      {!movieData.isLoading &&
        !tvData.isLoading &&
        activeCategory?.length > 0 && (
          <Search
            category={activeCategory}
            title={activeTab === "movies" ? "Filmes" : "Séries"}
          />
        )}

      {(movieData.data || tvData.data) && <Pagination {...PaginationProps} />}
    </div>
  );
};

export default SearchForMoviesOrSeries;
