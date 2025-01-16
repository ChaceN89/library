/**
 * @file MyBooks.jsx
 * @module MyBooks
 * @description 
 *   This component fetches, sorts, and displays a list of books uploaded by the user. It includes 
 *   a sorting dropdown, error handling, and login redirection if the user is not authenticated.
 * 
 * @requires React
 * @requires fetchMyBooks - API function for fetching the user's uploaded books.
 * @requires BookInfoCard - Component for displaying detailed information about a single book.
 * @requires SortingDropdown - Component for sorting the book list by title or author.
 * @requires useProfileContext - Context hook for accessing user authentication state.
 * @requires ErrorLoading - Component for displaying error messages.
 * @requires LoginForm - Component for user login.
 * @requires LoadingWheel - Component for displaying a loading spinner.
 * 
 * @component MyBooks
 * 
 * @example
 * // Usage in the "My Books" page
 * import MyBooks from "@/components/library/myBooks/MyBooks";
 * 
 * export default function MyBooksPage() {
 *   return <MyBooks />;
 * }
 * 
 * @author Chace Nielson
 * @created 2025-01-16
 * @updated 2025-01-16
 */

"use client";
import React, { useEffect, useState } from 'react';
import { fetchMyBooks } from '@/API/myBooksAPI';  // Ensure the path is correct
import { useRouter } from "next/navigation";
import { useProfileContext } from '@/context/ProfileContext';
import ErrorLoading from '@/components/loading/ErrorLoading';
import LoginForm from '@/components/auth/LoginForm';
import LoadingWheel from '@/components/loading/LoadingWheel';
import SortingDropdown from '../favBooks/SortingDropdown';
import BookInfoCard from '../book/bookCard/BookInfoCard';

const MyBooks = () => {
  const { isLoggedIn } = useProfileContext();
  const router = useRouter();

  const [books, setBooks] = useState([]); // Unsorted list of books
  const [sortedBooks, setSortedBooks] = useState([]); // Sorted list of books
  const [sortOption, setSortOption] = useState(''); // Sorting option
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(false); // Error state

  // Fetch books on component mount
  useEffect(() => {
    const loadMyBooks = async () => {
      try {
        const myBooks = await fetchMyBooks();
        setBooks(myBooks); // Set unsorted books
        setSortedBooks(myBooks); // Initialize sortedBooks with fetched data
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadMyBooks();
  }, []);

  // Sort books when `sortOption` changes
  useEffect(() => {
    const sortBooks = () => {
      let sorted = [...books];
      if (sortOption === 'title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOption === 'author') {
        sorted.sort((a, b) => a.author.localeCompare(b.author));
      }
      setSortedBooks(sorted);
    };

    sortBooks();
  }, [sortOption, books]); // Re-sort whenever `sortOption` or `books` changes

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  // Render login form if not logged in
  if (!isLoggedIn && !loading) {
    return (
      <LoginForm
        isPopup
        onClose={() => router.push("/")}
        reRouteTo={null}
        onSuccess={() => loadMyBooks()}
      />
    );
  }

  // Render error state
  if (error) {
    return (
      <ErrorLoading
        message="Oops! Something went wrong. We couldn't fetch your books at this time."
      />
    );
  }

  // Render sorted books or loading wheel
  return (
    <div>
      <SortingDropdown sortOption={sortOption} handleSort={handleSort} />

      {loading ? (
        <div className='flex h-full w-full justify-center items-center mt-10'>
          <LoadingWheel />
        </div>
      ) : (
        <ul className="grid lg:grid-cols-2 gap-4">
          {sortedBooks.length > 0 ? (
            sortedBooks.map((book) => (
              <BookInfoCard key={book.id} book={book} />
            ))
          ) : (
            <p>No books found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default MyBooks;
