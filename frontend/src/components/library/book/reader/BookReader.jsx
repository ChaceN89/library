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
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import BookReadPagination from "./BookReadPagination";

function BookReader() {
  
  // get info from the context
  const {
    pages,
    currentPage,
    linesPerPage,
    setLinesPerPage,
    setCurrentPage,
    error,
    readerError,
    loading,
    isFullScreen,
    setIsFullScreen
  } = useBookContext();


  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

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

    return () => {
      setIsFullScreen(false);
    };

  }, [linesPerPage, pages.length, currentPage, setCurrentPage]);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    };
  
    // Attach the event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);
  
    // Cleanup the event listener when the component unmounts or when isFullScreen changes
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullScreen, setIsFullScreen]);

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold">Book Content</h3>
      <div
        className={`${
          isFullScreen
            ? "fixed inset-0 z-50 bg-white dark:bg-gray-800 p-6 max-h-screen flex flex-col"
            : "relative border p-4 rounded-lg bg-white dark:bg-gray-400 shadow-md flex flex-col"
        }`}
      >
        <button
          onClick={toggleFullScreen}
          className="absolute hover:text-black top-2 right-2 bg-gray-700  text-white  p-2 rounded-full hover:bg-gray-600"
        >
          {isFullScreen ? <BsFullscreenExit /> : <BsFullscreen />}
        </button>
        {loading ? (
          // Loading state
          <div className="animate-pulse space-y-4 flex-grow">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-8 bg-gray-300 rounded w-5/6"></div>
            <div className="h-8 bg-gray-300 rounded w-2/3"></div>
            <div className="h-8 bg-gray-300 rounded w-full"></div>
            <div className="h-8 bg-gray-300 rounded w-2/5"></div>
          </div>
        ) : error || readerError ? (
          // Error state
          <p className="text-red-500 font-bold text-center flex-grow">
            {error || "Book Content Cannot be fetched"}
          </p>
        ) : (
          // Render book content
          <>
            <div
              className={`content border p-4 rounded bg-gray-100 font-semibold dark:bg-secondary overflow-y-auto flex-grow ${isFullScreen ? "max-h-[90vh]" : "max-h-[65vh]"}`}
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
              }}
            >
              {pages[currentPage] || "No content available for this page."}
            </div>
            <BookReadPagination
              prevPage={prevPage}
              nextPage={nextPage}
              currentPage={currentPage}
              pages={pages}
              linesPerPage={linesPerPage}
              handleLinesPerPageChange={handleLinesPerPageChange}
              bookReaderData={bookReaderData}
            />
          </>
        )}
      </div>

    </div>
  );
}

export default BookReader;
