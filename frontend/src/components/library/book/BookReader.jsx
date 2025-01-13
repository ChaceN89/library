import React, { useState, useEffect } from "react";

function BookReader({ contentUrl }) {
  const [content, setContent] = useState([]); // Store pages of content
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

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

  // Function to split content into pages based on character limit
  const splitIntoPages2 = (content, charsPerPage = 1000) => {
    const lines = content.split("\n"); // Split by line breaks
    const pages = [];
    let currentPage = "";

    lines.forEach((line) => {
      if (currentPage.length + line.length > charsPerPage) {
        pages.push(currentPage.trim());
        currentPage = ""; // Start a new page
      }
      currentPage += `${line}\n`; // Append the line to the current page
    });

    if (currentPage.trim()) {
      pages.push(currentPage.trim()); // Add the last page
    }

    return pages;
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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
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
    <div className="book-reader">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div>
          <div
            className="content border p-4 rounded bg-gray-100 "
            style={{
              whiteSpace: "pre-wrap", // Preserve all whitespace and line breaks
              fontFamily: "monospace", // Optional: Use a monospace font
              overflowY: "auto", // Enable scrolling within the page
            }}
          >
            {content[currentPage]}
          </div>
          <div className="navigation flex justify-between mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage + 1} of {content.length}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === content.length - 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookReader;
