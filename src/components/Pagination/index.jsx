import { PropTypes } from "prop-types";
import { useThemeControllerStore } from "../../stores/ThemeControllerStore";
const Pagination = ({ handlePageChange, page, visiblePages, totalPages }) => {
  const isSun = useThemeControllerStore(({ isSun }) => isSun);
  return (
    <div className="join flex justify-center py-3">
      <button
        className={`join-item btn  ${
          isSun
            ? ""
            : "border border-black bg-opacity-10 text-white disabled:text-gray-600"
        }`}
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        «
      </button>
      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`join-item btn ${
            isSun ? "" : "bg-opacity-5 border border-black text-gray-400"
          } ${page === pageNumber ? "btn-active " : ""}`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className={`join-item btn ${
          isSun
            ? ""
            : "border border-black bg-opacity-10 text-white disabled:text-gray-600"
        }  `}
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
