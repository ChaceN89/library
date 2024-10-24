"use client";
import React, { useState, useEffect } from 'react';
import BookCard from '../book/BookCard';
import { useFavBooks } from '@/context/FavBooksContext';  // Import the favorite books context

function FavBooks() {
  const { favBooks, loading } = useFavBooks();  // Use the context for favorite books
  const [localFavBooks, setLocalFavBooks] = useState([]);  // Local state for fetched fav books
  const [sortedBooks, setSortedBooks] = useState([]);  // Local state for sorted books
  const [sortOption, setSortOption] = useState('');  // State to handle sorting option

  // Fetch the favorite books only once when the component loads
  useEffect(() => {
    setLocalFavBooks(favBooks);  // Set the local state once from the context
  }, [favBooks]);

  // Handle sorting of books based on user's selection
  useEffect(() => {
    let books = [...localFavBooks]; // Make a copy of localFavBooks to sort locally

    if (sortOption === 'title') {
      books = books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'author') {
      books = books.sort((a, b) => a.author.localeCompare(b.author));
    }

    setSortedBooks(books);
  }, [localFavBooks, sortOption]);  // Run this effect whenever localFavBooks or sortOption changes

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);  // Set the selected sort option
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Favorite Books</h1>

      {/* Sorting Dropdown */}
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">Sort by:</label>
        <select id="sort" value={sortOption} onChange={handleSort} className="border p-2">
          <option value="">Select</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="gap-4 grid grid-cols-3">
          {sortedBooks.length > 0 ? (
            sortedBooks.map((book) => (
              <BookCard inFavSection={true} key={book.id} book={book} />
            ))
          ) : (
            <p>No favorite books found</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default FavBooks;
