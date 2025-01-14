/**
 * @file Book.jsx
 * @module Book
 * @description 
 *   Handles fetching and rendering details for a specific book, including 
 *   its information display, content reader, and comments section. Displays 
 *   loading and error states as needed.
 * 
 * @requires React
 * @requires @context/BookContext - Provides book-related state and functionality.
 * @requires @components/loading/ErrorLoading - Component for displaying error messages.
 * @requires @components/loading/LoadingWheel - Component for displaying loading animations.
 * @requires ./BookInfomationDisplay - Displays book details like title, author, and metadata.
 * @requires ./BookReader - Handles paginated content reading for the book.
 * @requires ./comments/BookComments - Displays comments for the book.
 * 
 * @component Book
 *
 * @example
 * // Example usage:
 * <Book id="123" title="example-title" />
 * 
 * @param {string} id - The unique ID of the book to fetch.
 * @param {string} title - The title of the book for URL consistency.
 * 
 * @exports Book
 * 
 * @author Chace Nielson
 * @created 2025-01-13
 * @updated 2025-01-13
 */

import React, { useEffect } from "react";
import { useBookContext } from "@/context/BookContext";
import ErrorLoading from "@/components/loading/ErrorLoading";
import BookInformationDisplay from "./BookInfomationDisplay";
import BookReader from "./reader/BookReader";
import BookComments from "./comments/BookComments";

function Book({ id, title }) {
  const { error, fetchBook } = useBookContext();

  useEffect(() => {
    fetchBook(id, title); // Fetch book data on component mount or when `id` or `title` changes.
  }, [id, title]);

  if (error) {
    return (
      <ErrorLoading
        className="mt-10"
        message={`Unable to load the book "${id}/${title}". Please try again later or check the URL.`}
      />
    );
  }

  return (
    <div>
      <BookInformationDisplay />
      <BookReader />
      <BookComments/>
    </div>
  );
}

export default Book;
