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
  return (
    <div
      className={`flex justify-between items-start ${
        !showOnSmallScreens ? 'hidden md:flex' : ''
      } ${!showOnLargeScreens ? 'md:hidden' : ''}`}
    >
      <h3 className="hover:underline cursor-pointer flex-grow">
        {loading ? "..." : book.title}
      </h3>
      {!loading && <SetFavBook id={book.id} />}
    </div>
  );
}

export default BookCardTitle;
