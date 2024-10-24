"use client";
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '@/API/booksAPI';
import BookCard from '../BookCard';
import SearchBar from './SearchBar';  // Import the SearchBar component
import Pagination from './Pagination';  // Import the Pagination component
import { useSearch } from '@/context/SearchContext';  // Import useSearch from context

function AllBooks() {
  const { searchQuery, filters } = useSearch();  // Get search context
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch books on load and whenever page, searchQuery, or filters change
  useEffect(() => {
    setLoading(true);  // Immediately set loading to true, so the "Loading..." appears
  
    const debounceFetch = setTimeout(() => {
      const loadBooks = async () => {
        const data = await fetchBooks(page, searchQuery, filters);  // Fetch with searchQuery and filters from context
        if (data) {
          setBooks(data.results);
          setTotalPages(data.num_pages);
        }
        setLoading(false);  // Set loading to false after data is fetched
      };
      loadBooks();
    }, 400);  // Delay the fetch by 400ms (adjust as needed)
  
    // Clean up the timeout if user is still typing or page/filters change
    return () => clearTimeout(debounceFetch);
  }, [page, searchQuery, filters]);  // Trigger fetch on page, searchQuery, or filters change

  // Pagination control
  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      <SearchBar />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Book List */}
          <ul className="gap-4 grid grid-cols-3">
            {books.length > 0 ? (
              books.map((book) => <BookCard key={book.id} book={book} />)
            ) : (
              <p>No books found</p>
            )}
          </ul>

          <Pagination
            page={page}
            totalPages={totalPages}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
          />
        </>
      )}
    </div>
  );
}

export default AllBooks;
