/**
 * @file BookReader.jsx
 * @module BookReader
 * @description 
 *   Component for rendering the book reader interface. Displays book content split into pages,
 *   provides navigation controls, and allows the user to adjust the number of lines displayed per page.
 *
 * @requires React
 * @requires @context/BookContext - Provides book-related state and actions.
 * @requires @data/bookData - Contains default reader settings such as line options.
 *
 * @component BookReader
 *
 * @example
 * // Import and use the BookReader component in your application:
 * import BookReader from '@/components/BookReader';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <BookReader />
 *     </div>
 *   );
 * }
 * 
 * @exports BookReader
 * 
 * @author Chace Nielson
 * @created 2025-01-13
 * @updated 2025-01-13
 */

import React, { useEffect } from "react";
import { useBookContext } from "@/context/BookContext";
import { bookReaderData } from "@/data/bookData";

function BookReader() {
  const {
    pages,
    currentPage,
    linesPerPage,
    setLinesPerPage,
    setCurrentPage,
    error,
    readerError,
    loading,
  } = useBookContext();

  // Navigation handlers
  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  /**
   * Handles changes to the number of lines per page.
   * @param {Event} e - The change event from the select input.
   */
  const handleLinesPerPageChange = (e) => {
    const newLinesPerPage = parseInt(e.target.value, 10);
    setLinesPerPage(newLinesPerPage); // Update context
  };

  /**
   * Ensures the current page is within the valid range when lines per page changes.
   */
  useEffect(() => {
    if (currentPage + 1 > pages.length) {
      setCurrentPage(pages.length - 1);
    }
    
    if(currentPage <0){
      setCurrentPage(0);
    }

  }, [linesPerPage, pages.length, currentPage, setCurrentPage]);

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold">Book Content</h3>
      <div className="book-reader border p-4 rounded-lg bg-white dark:bg-gray-400 shadow-md">
        {loading ? (
          // Loading state
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-8 bg-gray-300 rounded w-5/6"></div>
            <div className="h-8 bg-gray-300 rounded w-2/3"></div>
            <div className="h-8 bg-gray-300 rounded w-full"></div>
            <div className="h-8 bg-gray-300 rounded w-2/5"></div>
          </div>
        ) : error || readerError ? (
          // Error state
          <p className="text-red-500 font-bold text-center">
            {error || "Book Content Cannot be fetched"}
          </p>
        ) : (
          // Render book content
          <>
            <p
              className="content border p-4 rounded bg-gray-100 font-semibold dark:bg-secondary overflow-y-auto max-h-[65vh]"
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
              }}
            >
              {pages[currentPage] || "No content available for this page."}
            </p>
            <div className="navigation flex justify-between items-center mt-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded ${
                  currentPage > 0
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Previous
              </button>
              <h6 className="px-4 py-2">
                Page {currentPage + 1} of {pages.length}
              </h6>
              <select
                id="linesPerPage"
                value={linesPerPage}
                onChange={handleLinesPerPageChange}
                className="border rounded p-2"
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
                className={`px-4 py-2 rounded ${
                  currentPage < pages.length - 1
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BookReader;
