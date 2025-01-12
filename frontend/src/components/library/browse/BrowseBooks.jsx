// src/components/library/browse/BrowseBooks.jsx
"use client";

/**
 * @file BrowseBooks.jsx
 * @author 
 * @date Created: January 11, 2025
 * @lastUpdated: January 11, 2025
 * @description 
 *    This component renders a list of books with pagination. It fetches books
 *    from the API based on the current page, search query, filters, and page size.
 *    Displays loading placeholders or error messages if applicable.
 * 
 * @dependencies
 * - React: For managing component state and rendering
 * - fetchBooks: API function to fetch book data
 * - BookCard: Component to render individual book details
 * - Pagination: Component to handle pagination controls
 * - useSearch: Context hook for managing search-related state and filters
 * - ErrorLoading: Component to display error messages
 * - DEFAULT_PAGE_SIZE: Global constant for default books per page
 */

import React, { useEffect, useState } from "react";
import { fetchBooks } from "@/API/booksAPI";
import BookCard from "@/components/bookCard/BookCard";
import Pagination from "@/components/library/browse/Pagination";
import { useSearch } from "@/context/SearchContext";
import ErrorLoading from "@/components/loading/ErrorLoading";
import { DEFAULT_PAGE_SIZE } from "@/globals";

/**
 * BrowseBooks Component
 * 
 * Fetches and displays a list of books with pagination. Integrates search and filter functionality
 * via the `SearchContext`. Shows loading placeholders and handles errors gracefully.
 * 
 * @returns {JSX.Element} The BrowseBooks component.
 */
function BrowseBooks() {
  const { searchQuery, filters } = useSearch(); // Access search and filter state
  const [books, setBooks] = useState([]); // List of books to display
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(false); // Error state

  const [page, setPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE); // Number of books per page

  // Fetch books whenever page, pageSize, searchQuery, or filters change
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true); // Start loading state
      setError(false); // Reset error state
      try {
        const data = await fetchBooks(page, searchQuery, filters, pageSize); // Fetch books
        if (data) {
          setBooks(data.results); // Update books
          setTotalPages(data.num_pages); // Update total pages
        }
      } catch (err) {
        console.error("Failed to fetch books:", err);
        setError(true); // Set error state on failure
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    loadBooks();
  }, [page, pageSize, searchQuery, filters]); // Dependencies that trigger fetch

  // Pagination controls
  const goToNextPage = () => page < totalPages && setPage(page + 1);
  const goToPreviousPage = () => page > 1 && setPage(page - 1);

  return (
    <div className="flex-grow">
      {/* Error Message */}
      {error && (
        <ErrorLoading
          className="pt-5"
          message="Failed to load books. Please try again later."
        />
      )}

      {/* Books List */}
      {!error && (
        <>
          <ul className="grid-book-display xl:grid-cols-4 2xl:grid-cols-5">
            {(loading ? Array.from({ length: pageSize }) : books).map(
              (book, index) => (
                <BookCard
                  key={book?.id || index} // Use book ID or fallback to index
                  book={book || {}} // Pass book data or empty object if loading
                  loading={loading} // Indicate loading state
                />
              )
            )}
          </ul>

          {/* Pagination Controls */}
          <div className="flex w-full justify-center">

            <Pagination
              page={page} // Current page
              totalPages={totalPages} // Total number of pages
              pageSize={pageSize} // Books per page
              setPageSize={setPageSize} // Function to update page size
              goToPreviousPage={goToPreviousPage} // Go to previous page
              goToNextPage={goToNextPage} // Go to next page
            />
          </div>
        </>
      )}
    </div>
  );
}

export default BrowseBooks;
