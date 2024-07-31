import { useQuery } from "react-query";
import { useEffect, useRef, useState } from "react";
import { useThemeControllerStore } from "../../../stores/ThemeControllerStore";

const useShowCategoryViewModel = ({ queryKey, queryFn }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const isSun = useThemeControllerStore(({ isSun }) => isSun);

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

  const PaginationProps = {
    handlePageChange,
    page,
    totalPages,
    visiblePages,
  };

  return {
    isSun,
    results: data?.data.results,
    isLoading,
    isError,
    movieContainerRef,
    PaginationProps,
  };
};

export default useShowCategoryViewModel;
