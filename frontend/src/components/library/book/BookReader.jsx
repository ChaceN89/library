import React from "react";
import { useBookContext } from "@/context/BookContext";
import { bookReaderData } from "@/data/bookData";

function BookReader() {
  const { pages, currentPage, linesPerPage, setCurrentPage, error, readerError, loading } = useBookContext();

  // Navigation handlers
  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="my-6">
  
  <div>
  {(() => {
    const bookStates = JSON.parse(localStorage.getItem("bookStates") || "{}"); // Parse the stored data or fallback to an empty object
    return (
      <pre className="text-sm bg-gray-100 p-2 rounded">
        {JSON.stringify(bookStates, null, 2)} {/* Pretty-print the object */}
      </pre>
    );
  })()}
</div>

<div>currentPage {currentPage}</div>
<div>linesPerPage {linesPerPage}</div>



      <h3 className="text-xl font-semibold">Book Content</h3>
      <div className="book-reader border p-4 rounded-lg bg-white shadow-md">
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
          <p className="text-red-500 font-bold text-center">{error || "Book Content Cannot be fetched"} </p>
        ) : (
          // Render book content
          <>
            <div
              className="content border p-4 rounded bg-gray-100 overflow-y-auto max-h-[40vh]"
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
              }}
            >
              {pages[currentPage] || "No content available for this page."}
            </div>
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
              <span className="px-4 py-2 text-gray-600">
                Page {currentPage + 1} of {pages.length}
              </span>
              <span className="px-4 py-2 text-gray-600">
                {JSON.stringify(bookReaderData.linepPerPageOptions)}
              </span>
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
