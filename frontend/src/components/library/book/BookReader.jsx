import React, { useState, useEffect } from "react";

function BookReader({ book }) {
  const { content_url: contentUrl = "" } = book || {}; // Safely destructure the content URL

  const [content, setContent] = useState([]); // Store pages of content
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const [fileType, setFileType] = useState(second)

  // Function to fetch the content from the provided URL
  const fetchBookContent = async (url) => {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }
      const text = await response.text();
      return text;
    } catch (err) {
      throw err;
    }
  };

  // Function to split content into pages based on line limit
  const splitIntoPages = (content, linesPerPage = 20) => {
    const lines = content.split("\n"); // Split by line breaks
    const pages = [];
    let currentPage = [];

    lines.forEach((line) => {
      currentPage.push(line); // Add the line to the current page
      if (currentPage.length >= linesPerPage) {
        pages.push(currentPage.join("\n").trim()); // Join lines into a single page
        currentPage = []; // Start a new page
      }
    });

    if (currentPage.length > 0) {
      pages.push(currentPage.join("\n").trim()); // Add the remaining lines as the last page
    }

    return pages;
  };

  // Effect to load and process the content
  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const text = await fetchBookContent(contentUrl); // Fetch the content
        const pages = splitIntoPages(text); // Split content into pages
        setContent(pages);
      } catch (err) {
        console.error("Error loading content:", err);
        setError(err.message || "An error occurred while loading the book.");
      } finally {
        setLoading(false);
      }
    };

    if (contentUrl) {
      loadContent();
    }
  }, [contentUrl]);

  // Handlers for navigating pages
  const nextPage = () => {
    if (currentPage < content.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  // Render the component
  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold">Book Content</h3>
      <div className="book-reader border p-4 rounded-lg bg-white shadow-md ">
        {loading ? (
          // Placeholder for loading state
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-8 bg-gray-300 rounded w-5/6"></div>
            <div className="h-8 bg-gray-300 rounded w-2/3"></div>
          </div>
        ) : error ? (
          // Error message
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          // Content and navigation
          <div>
            {/* Display current page content */}
            <div
              className="content border p-4 rounded bg-gray-100 overflow-y-auto max-h-[60vh]"
              style={{
                whiteSpace: "pre-wrap", // Preserve whitespace and line breaks
                fontFamily: "monospace", // Optional: Use a monospace font
              }}
            >
              {content[currentPage]}
            </div>

            {/* Navigation controls */}
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
                Page {currentPage + 1} of {content.length}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === content.length - 1}
                className={`px-4 py-2 rounded ${
                  currentPage < content.length - 1
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookReader;
