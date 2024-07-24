import { PropTypes } from "prop-types";
const Pagination = ({ handlePageChange, page, visiblePages, totalPages }) => {
  return (
    <div className="join flex justify-center py-3">
      <button
        className="join-item btn"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        «
      </button>
      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`join-item btn ${page === pageNumber ? "btn-active" : ""}`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="join-item btn"
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
