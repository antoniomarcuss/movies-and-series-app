import { PropTypes } from "prop-types";
import { useThemeControllerStore } from "../../stores/ThemeControllerStore";
const Pagination = ({ handlePageChange, page, visiblePages, totalPages }) => {
  const isSun = useThemeControllerStore(({ isSun }) => isSun);
  return (
    <div className="join flex justify-center py-3">
      <button
        className={`join-item btn  ${
          isSun &&
          "bg-gray-200 border-0 disabled:bg-gray-300 hover:bg-blue-100 disabled:text-white disabled:hover:bg-gray-100"
        }`}
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        «
      </button>
      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`join-item btn  ${
            isSun && "bg-blue-500 border-gray-200 text-white hover:bg-blue-950"
          } ${
            page === pageNumber ? `btn-active ${isSun && "bg-blue-800"}` : ""
          }`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className={`join-item btn  ${
          isSun &&
          "bg-gray-200 border-0 disabled:bg-gray-300 hover:bg-blue-100 disabled:text-white disabled:hover:bg-gray-100"
        }`}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        »
      </button>
    </div>
  );
};

Pagination.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  visiblePages: PropTypes.arrayOf(PropTypes.number).isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
