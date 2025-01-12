/**
 * @file SetFavBook.jsx
 * @module SetFavBook
 * @description 
 *   A reusable React component for toggling a book's favorite status. 
 *   Integrates with user authentication and a favorites context to handle 
 *   adding and removing books from the user's favorites list.
 *
 * @component SetFavBook
 * 
 * @param {number} id - The unique ID of the book.
 * @param {string} [bookTitle=null] - The title of the book for display in notifications (optional).
 * 
 * @requires react
 * @requires @fortawesome/react-fontawesome - For star icons.
 * @requires addFavoriteBook from "@/API/favBooksAPI" - API function to add a book to favorites.
 * @requires removeFavoriteBook from "@/API/favBooksAPI" - API function to remove a book from favorites.
 * @requires toast from "react-hot-toast" - For displaying success and error notifications.
 * @requires useFavBooks from "@/context/FavBooksContext" - Context to manage favorite books.
 * @requires useProfileContext from "@/context/ProfileContext" - Context to manage user authentication state.
 *
 * @description
 * - Displays a favorite toggle button (star icon) based on the book's favorite status.
 * - Handles user interactions and updates the favorites list in real-time.
 * - Displays toast notifications for success and error events.
 *
 * @example
 * <SetFavBook id={book.id} bookTitle={book.title} />
 * 
 * @author Chace Nielson
 * @created 2025-01-12
 * @updated 2025-01-12
 */

import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import star icons
import { addFavoriteBook, removeFavoriteBook } from '@/API/favBooksAPI';
import { toast } from 'react-hot-toast';
import { useFavBooks } from '@/context/FavBooksContext';
import { useProfileContext } from '@/context/ProfileContext';

function SetFavBook({ id, bookTitle = null }) {
  const { isLoggedIn } = useProfileContext(); // Access user authentication context

  // Format the book title for notifications
  const formattedBookTitle = bookTitle ? `${bookTitle}:` : "";

  // Return null if the user is not logged in
  if (!isLoggedIn) {
    return null;
  }

  const { favBooks, loadFavBooks } = useFavBooks(); // Access favorites context
  const [isLocalFav, setIsLocalFav] = useState(false); // Local state for favorite status

  // Update the favorite status on component mount or when favorites context changes
  useEffect(() => {
    const isFav = favBooks.some((book) => book.id === id);
    setIsLocalFav(isFav);
  }, [favBooks, id, isLoggedIn]);

  // Toggle favorite status
  const toggleFavorite = async (e) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Prevent event bubbling to parent elements
    try {
      if (isLocalFav) {
        await removeFavoriteBook(id); // API call to remove favorite
        setIsLocalFav(false); // Update local state
        toast.success(`${formattedBookTitle} Removed from favorites`);
      } else {
        await addFavoriteBook(id); // API call to add favorite
        setIsLocalFav(true); // Update local state
        toast.success(`${formattedBookTitle} Added to favorites`);
      }
      loadFavBooks(); // Reload favorites list
    } catch (error) {
      const errorMsg = error.message || "An unexpected error occurred";
      toast.error(`${formattedBookTitle} ${errorMsg}`); // Display error notification
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="text-2xl focus:outline-none bg-accent p-0.5 rounded-full bg-opacity-80"
      aria-label={isLocalFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isLocalFav ? (
        <FaStar className="text-yellow-500" /> // Gold filled star
      ) : (
        <FaRegStar className="text-white" /> // White outlined star
      )}
    </button>
  );
}

export default SetFavBook;
