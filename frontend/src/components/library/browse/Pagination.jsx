// src/components/library/browse/Pagination.jsx
"use client";

/**
 * @file Pagination.jsx
 * @author 
 * @date Created: January 11, 2025
 * @lastUpdated: January 11, 2025
 * @description 
 *    This component provides pagination controls for navigating between pages of books
 *    and allows users to select the number of books displayed per page.
 * 
 * @dependencies
 * - React: For managing component rendering and events
 * - PropTypes: For type-checking component props
 * - browsePageData: Provides options for page size selection
 */

import React from "react";
import PropTypes from "prop-types";
import { browsePageData } from "@/data/browsePageData";

/**
 * Pagination Component
 * 
 * Renders pagination controls with options for navigating pages and changing
 * the number of books displayed per page.
 * 
 * @param {number} page - The current page number.
 * @param {number} totalPages - The total number of pages available.
 * @param {number} pageSize - The number of books displayed per page.
 * @param {function} setPageSize - Function to update the number of books per page.
 * @param {function} goToPreviousPage - Function to navigate to the previous page.
 * @param {function} goToNextPage - Function to navigate to the next page.
 * 
 * @returns {JSX.Element} The Pagination component.
 */
const Pagination = ({
  page,
  totalPages,
  pageSize,
  setPageSize,
  goToPreviousPage,
  goToNextPage,
}) => {
  /**
   * Handles the page size selection change.
   * Updates the page size in the parent component.
   * 
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event object.
   */
  const handlePageSizeChange = (e) => {
    const newPageSize = parseInt(e.target.value, 10);
    setPageSize(newPageSize); // Update the page size in the parent component
  };

  return (
    <div className="mt-6 flex items-center justify-between p-4 card-background shadow-md rounded-lg gap-16">
      {/* Previous Page Button */}
      <button
        onClick={goToPreviousPage}
        disabled={page === 1}
        className="pagination-btn"
      >
        Previous
      </button>

      {/* Page Info and Page Size Selection */}
      <div className="flex gap-5 items-center">
        <h3 className="">
          Page {page} of {totalPages}
        </h3>
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm">
            Showing
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="p-2 border rounded-md"
          >
            {browsePageData.pageNumOption.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span>Books/Page</span>
        </div>
      </div>

      {/* Next Page Button */}
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

// PropTypes for type-checking
Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
  goToPreviousPage: PropTypes.func.isRequired,
  goToNextPage: PropTypes.func.isRequired,
};

export default Pagination;
