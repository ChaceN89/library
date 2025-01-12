/**
 * @file BookCardTitle.jsx
 * @module BookCardTitle
 * @description A reusable React subcomponent for rendering a book's title and a favorite button. 
 * Handles conditional rendering for different screen sizes and loading states.
 *
 * @component BookCardTitle
 * 
 * @param {Object} book - The book object containing details such as the title and ID.
 * @param {boolean} loading - Indicates whether the book's data is currently loading.
 * @param {boolean} [showOnSmallScreens=true] - Determines if the title should be displayed on small screens.
 * @param {boolean} [showOnLargeScreens=true] - Determines if the title should be displayed on large screens.
 * 
 * @requires react
 * @requires SetFavBook from "../library/favBooks/SetFavBook" - Component for adding or removing a book from favorites.
 * 
 * @description
 * - Displays the book's title and a favorite button.
 * - Supports loading state with placeholder text.
 * - Adapts to screen sizes by conditionally showing or hiding the component.
 * 
 * @example
 * <BookCardTitle 
 *   book={book} 
 *   loading={true} 
 *   showOnSmallScreens={true} 
 *   showOnLargeScreens={false} 
 * />
 * 
 * @author Chace Nielson
 * @created 2025-01-08
 * @updated 2025-01-08
 */

import React from 'react';
import SetFavBook from '../library/favBooks/SetFavBook';

function BookCardTitle({ book, loading, showOnSmallScreens = true, showOnLargeScreens = true }) {
  // Helper function to truncate the title and add ellipsis
  const truncateTitle = (title, maxLength = 20) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  // Dynamically determine text size based on title length
  const textSize = loading
    ? '' // No size adjustment while loading
    : book.title.length > 20
    ? 'text-xl'
    : book.title.length > 10
    ? 'text-lg'
    : 'text-3xl';

  return (
    <div
      className={`flex justify-between items-start ${
        !showOnSmallScreens ? 'hidden md:flex' : ''
      } ${!showOnLargeScreens ? 'md:hidden' : ''}`}
    >
      <div
        className={`underline cursor-pointer flex-grow font-bold  ${textSize}`}
        title={!loading ? book.title : ''}
      >
        {loading ? "..." : truncateTitle(book.title, 38)}
      </div>
      {!loading && <SetFavBook id={book.id} />}
    </div>
  );
}

export default BookCardTitle;
