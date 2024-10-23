"use client";
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '@/API/books';
import BookCard from './BookCard';
import SearchBar from './search/SearchBar';  // Import the SearchBar component
import { useSearch } from '@/context/SearchContext';  // Import useSearch from context

function AllBooks() {
  const { searchQuery, handleSearch, filters, handleFilterChange } = useSearch();  // Get search context
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch books on load and whenever page, searchQuery, or filters change
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const data = await fetchBooks(page, searchQuery, filters);  // Fetch with searchQuery and filters from context
      if (data) {
        setBooks(data.results);
        setTotalPages(data.num_pages);
      }
      setLoading(false);
    };
    loadBooks();
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
      {/* Search Bar */}
      <br />
      <SearchBar 
        searchQuery={searchQuery} 
        handleSearch={handleSearch} 
        handleFilterChange={handleFilterChange} 
        filters={filters} 
      />

      <hr className=' m-2 border-4 border-black border-dashed'/>

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

export default AllBooks;
