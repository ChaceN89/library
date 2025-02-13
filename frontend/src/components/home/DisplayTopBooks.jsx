/**
 * @file DisplayTopBooks.jsx
 * @module DisplayTopBooks
 * @desc React component to display a list of top books with loading and error states.
 * This component fetches data using a provided fetch function and renders a list of books,
 * loading placeholders, or an error message based on the current state.
 *
 * @component DisplayTopBooks
 * 
 * @requires react
 * @requires BookCard from "@/components/library/book/BookCard"
 * @requires LoadingWheel from "../loading/LoadingWheel"
 * @requires ErrorLoading from "../loading/ErrorLoading"
 * 
 * @description
 * - Displays a list of books based on the fetch function and the number of books to fetch.
 * - Includes a loading state with animated placeholders.
 * - Shows an error message when the fetch fails.
 * 
 * @notes
 * - Includes a simulated delay using a `sleep` function for loading state.
 * - Designed to be reusable for fetching and displaying different book categories.
 * 
 * @example
 * import DisplayTopBooks from "./DisplayTopBooks";
 * import { fetchMostViewedBooks } from "@/API/homePageAPI";
 * 
 * function App() {
 *   return (
 *     <DisplayTopBooks
 *       fetchFunction={fetchMostViewedBooks}
 *       title="Top 10 Most Viewed Books"
 *       booksToFetch={10}
 *     />
 *   );
 * }
 * 
 * @exports DisplayTopBooks
 * 
 * @author Chace Nielson
 * @created 2025-01-08
 * @updated 2025-01-10
 */

"use client";
import React, { useEffect, useState } from "react";
import BookCard from "../library/book/bookCard/BookCard";
import ErrorLoading from "../loading/ErrorLoading";

function DisplayTopBooks({ fetchFunction, title, booksToFetch }) {
  // Use States for the books and for loading and error messages
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 
  // Function to load books
  const loadBooks = async () => {
    try {
      // Get response
      const response = await fetchFunction(booksToFetch);
      // Set the book list
      setBooks(response.results);

    } catch (error) {
      setError(true); // Set error state
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Use Effect to change the fetching of book
  useEffect(() => {
    loadBooks();
  }, [fetchFunction, booksToFetch]);

  return (
    <section className="pt-6">
      <h2 className='pb-2'>{title}</h2>
      <div className="min-h-44">

        {!loading && books.length === 0 && <p>No books available.</p>}

        {/* If Error display the Error Box else display loading or the actual books */}
        {error ?(
          <ErrorLoading className="pt-5"  message="Failed to load books. Please try again later." />
        ):(
          <ul className="grid-book-display">
            {(loading ? Array.from({ length: booksToFetch }) : books).map((book, index) => (
              <BookCard
                key={book?.id || index}
                book={book || {}}
                loading={loading}
              />
            ))}
          </ul>
        )}      
      </div>
    </section>
  );
}

export default DisplayTopBooks;
