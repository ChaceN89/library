"use client"
// src/components/library/BookList.jsx
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '@/API/books';
import BookCard from './BookCard';
import SearchBar from './SearchBar';  // Import the SearchBar component

function BookList() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    sort_by: 'most_recent',  // Default sort by most recent
    genre: '',
    language: '',
    description: false
  });
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch books on load and whenever page, searchQuery, or filters change
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const data = await fetchBooks(page, searchQuery, filters);  // Fetch with searchQuery and filters
      if (data) {
        setBooks(data.results);
        setTotalPages(data.num_pages);
      }
      setLoading(false);
    };
    loadBooks();
  }, [page, searchQuery, filters]);  // Trigger fetch on page, searchQuery, or filters change

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to the first page when a new search is made
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

export default BookList;
