import { useState, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { MoviesServices } from "../../../services/movies";
import { throttle } from "../../../utils/throttle";
import { TvShowsServices } from "../../../services/tvShows";
import { useThemeControllerStore } from "../../../stores/ThemeControllerStore";
const useSearchForMoviesOrSeriesViewModel = () => {
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
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
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
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
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

  const PaginationProps = {
    handlePageChange,
    page: activeTab === "movies" ? moviePage : tvPage,
    totalPages:
      activeTab === "movies"
        ? movieData?.data?.total_pages || 0
        : tvData?.data?.total_pages || 0,
    visiblePages,
  };

  return {
    movieData: {
      data: movieData?.data,
      isLoading: isLoadingMovies,
      isError: isErrorMovies,
    },
    tvData: {
      data: tvData?.data,
      isLoading: isLoadingTv,
      isError: isErrorTv,
    },
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    handleSearchValue,
    totalResultsTv,
    totalResultsMovies,
    activeCategory,
    isSun,
    PaginationProps,
  };
};

export default useSearchForMoviesOrSeriesViewModel;
