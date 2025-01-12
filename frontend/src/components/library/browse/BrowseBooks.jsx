"use client";

import React, { useEffect, useState } from "react";
import { fetchBooks } from "@/API/booksAPI";
import BookCard from "@/components/bookCard/BookCard";
import Pagination from "@/components/library/browse/Pagination";
import { useSearch } from "@/context/SearchContext";
import ErrorLoading from "@/components/loading/ErrorLoading";

function BrowseBooks() {
  const { searchQuery, filters } = useSearch(); // Get search context
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [assumedBooks, setAssumedBooks] = useState(10); // Placeholder count

  // Adjust placeholder count based on search query
  useEffect(() => {
    setAssumedBooks(searchQuery ? 3 : 10);
  }, [searchQuery]);

  // Fetch books data
  const loadBooks = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await fetchBooks(page, searchQuery, filters);
      if (data) {
        setBooks(data.results);
        setTotalPages(data.num_pages);
      }
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Debounce fetch books on dependency change
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      loadBooks();
    }, 400);

    return () => clearTimeout(debounceFetch);
  }, [page, searchQuery, filters]);

  // Pagination controls
  const goToNextPage = () => page < totalPages && setPage(page + 1);
  const goToPreviousPage = () => page > 1 && setPage(page - 1);

  return (
    <div className="flex-grow">
      {/* Show error message */}
      {error && (
        <ErrorLoading
          className="pt-5"
          message="Failed to load books. Please try again later."
        />
      )}

      {/* Render books or placeholders */}
      {!error && (
        <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {(loading ? Array.from({ length: assumedBooks }) : books).map(
            (book, index) => (
              <BookCard
                key={book?.id || index}
                book={book || {}}
                loading={loading}
              />
            )
          )}
        </ul>
      )}

      {/* Pagination */}
      {!error && (
        <Pagination
          page={page}
          totalPages={totalPages}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
        />
      )}
    </div>
  );
}

export default BrowseBooks;
