/**
 * @file BookReadPagination.jsx
 * @module BookReadPagination
 * @description 
 *   A component that provides pagination controls for the book reader interface. 
 *   Includes "Previous" and "Next" navigation buttons, a page indicator, and a dropdown to adjust the number of lines displayed per page.
 *
 * @requires React
 *
 * @component BookReadPagination
 * @param {function} prevPage - Function to navigate to the previous page.
 * @param {function} nextPage - Function to navigate to the next page.
 * @param {number} currentPage - The current page number (0-based index).
 * @param {number} pages - Total number of pages.
 * @param {number} linesPerPage - The number of lines displayed per page.
 * @param {function} handleLinesPerPageChange - Handler function for changing the lines per page.
 * @param {object} bookReaderData - Data object containing line options for the dropdown.
 *
 * @example
 * // Usage example:
 * import BookReadPagination from '@/components/BookReadPagination';
 * 
 * function BookReader() {
 *   return (
 *     <BookReadPagination
 *       prevPage={prevPage}
 *       nextPage={nextPage}
 *       currentPage={currentPage}
 *       pages={pages}
 *       linesPerPage={linesPerPage}
 *       handleLinesPerPageChange={handleLinesPerPageChange}
 *       bookReaderData={bookReaderData}
 *     />
 *   );
 * }
 * 
 * @exports BookReadPagination
 * 
 * @author Chace Nielson
 * @created 2025-01-13
 * @updated 2025-01-13
 */

import React from 'react'

function BookReadPagination({prevPage, nextPage, currentPage, pages, linesPerPage, handleLinesPerPageChange, bookReaderData}) {
  return (
    <div className="flex  flex-col gap-2 md:gap-1 md:flex-row justify-between items-center mt-4">
      <button
        onClick={prevPage}
        disabled={currentPage === 0}
        className={`px-4 py-2 rounded w-full md:w-fit ${
          currentPage > 0
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Previous
      </button>
      <h6 className=" p-1">
        Page {currentPage + 1} of {pages.length}
      </h6>
      <select
        id="linesPerPage"
        value={linesPerPage}
        onChange={handleLinesPerPageChange}
        className="border rounded p-1 text-black text-sm w-full md:w-fit "
      >
        {bookReaderData.linepPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option} Lines
          </option>
        ))}
      </select>
      <button
        onClick={nextPage}
        disabled={currentPage >= pages.length - 1}
        className={`px-4 py-2 rounded w-full md:w-fit  ${
          currentPage < pages.length - 1
            ? "bg-blue-500 hover:bg-blue-600 text-white  "
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  )
}

export default BookReadPagination