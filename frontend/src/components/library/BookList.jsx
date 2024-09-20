"use client"
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '@/API/books';
import BookCard from './BookCard';

function BookList() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch books on load and whenever page or searchQuery changes
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const data = await fetchBooks(page, searchQuery);
      if (data) {
        setBooks(data.results);
        setTotalPages(data.num_pages);
      }
      setLoading(false);
    };
    loadBooks();
  }, [page, searchQuery]);

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to the first page when a new search is made
  };

  // Pagination control
  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for books"
        value={searchQuery}
        onChange={handleSearch}
        className="border p-2 rounded mb-4 w-full"
      />

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

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between">
            <button 
              onClick={goToPreviousPage} 
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-2">Page {page} of {totalPages}</span>
            <button 
              onClick={goToNextPage} 
              disabled={page === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default BookList;
