/**
 * @file FavBooks.jsx
 * @module FavBooks
 * @description
 * A React component that displays a list of the user's favorite books. 
 * Includes sorting functionality by title or author, and handles loading 
 * and error states with appropriate UI feedback.
 *
 * @example
 * <FavBooks />
 *
 * @requires react
 * @requires BookCard - Component to display individual book details.
 * @requires useFavBooks - Context hook for accessing favorite books data.
 * @requires SortingDropdown - Component to provide sorting options.
 * @requires LoadingWheel - Component to display a loading indicator.
 * @requires ErrorLoading - Component to handle and display error messages.
 *
 * @exports FavBooks
 *
 * @author Chace Nielson
 * @created 2025-01-14
 * @updated 2025-01-14
 */

import React, { useState, useEffect } from 'react';
import BookCard from '../../bookCard/BookCard';
import { useFavBooks } from '@/context/FavBooksContext';
import SortingDropdown from './SortingDropdown';
import LoadingWheel from '@/components/loading/LoadingWheel';
import ErrorLoading from '@/components/loading/ErrorLoading';

function FavBooks() {
  const { favBooks, loading, error } = useFavBooks();
  const [localFavBooks, setLocalFavBooks] = useState([]);
  const [sortedBooks, setSortedBooks] = useState([]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    setLocalFavBooks(favBooks);
  }, [favBooks]);

  useEffect(() => {
    let books = [...localFavBooks];
    if (sortOption === 'title') {
      books = books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'author') {
      books = books.sort((a, b) => a.author.localeCompare(b.author));
    }
    setSortedBooks(books);
  }, [localFavBooks, sortOption]);

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  if(error){
    return(
      <ErrorLoading
        message="Oops! Something went wrong. We couldn't fetch your favorite books at this time."
      />
    )
  }

  return (
    <div>
      {/* Pass props to SortingDropdown */}
      <SortingDropdown sortOption={sortOption} handleSort={handleSort} />

      {loading ? (
        <div className='flex h-full w-full justify-center items-center mt-10'>
          <LoadingWheel/>
        </div>
      ) : (
        <ul className="grid-book-display">
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
