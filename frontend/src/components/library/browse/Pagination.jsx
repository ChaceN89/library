import React from "react";
import PropTypes from "prop-types";
import { DEFAULT_PAGE_SIZE } from "@/globals";
import { browsePageData } from "@/data/browsePageData";

const Pagination = ({ page, totalPages, goToPreviousPage, goToNextPage }) => {
  return (
    <div className="mt-6 flex items-center justify-between p-4 card-background  shadow-md rounded-lg">
      <button
        onClick={goToPreviousPage}
        disabled={page === 1}
        className="pagination-btn"
      >
        Previous
      </button>
      <div className="flex gap-5 items-center">

        <h3 className="">
          Page {page} of {totalPages} 
        </h3>
        <div>Showing {DEFAULT_PAGE_SIZE}Books/Page</div>
      </div>
      <button
        onClick={goToNextPage}
        disabled={page === totalPages}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  goToPreviousPage: PropTypes.func.isRequired,
  goToNextPage: PropTypes.func.isRequired,
};

export default Pagination;
