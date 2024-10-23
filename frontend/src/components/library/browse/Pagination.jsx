// src/components/search/Pagination.jsx
import React from 'react';

const Pagination = ({ page, totalPages, goToPreviousPage, goToNextPage }) => (
  <div className="mt-4 flex justify-between">
    <button
      onClick={goToPreviousPage}
      disabled={page === 1}
      className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
    >
      Previous
    </button>
    <span className="mx-2">Page {page} of {totalPages}</span>
    <button
      onClick={goToNextPage}
      disabled={page === totalPages}
      className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default Pagination;
