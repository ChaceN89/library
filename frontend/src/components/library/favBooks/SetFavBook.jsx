/**
 * @file SetFavBook.jsx
 * @module SetFavBook
 * @description
 * A React component that allows users to toggle a book's favorite status.
 * Integrates with user authentication and a favorites context to manage 
 * the user's favorite books.
 *
 * @param {number} id - The unique ID of the book.
 * @param {string} [bookTitle=null] - Optional title of the book for notifications.
 * @param {boolean} [large=false] - Determines the size of the star icon.
 * @param {boolean} [loading=false] - Prevents toggling when set to true.
 *
 * @example
 * <SetFavBook id={book.id} bookTitle="The Great Book" large={true} loading={false} />
 *
 * @requires react
 * @requires react-icons/fa - For rendering the star icon.
 * @requires react-hot-toast - For displaying toast notifications.
 * @requires useFavBooks - Context to manage favorite books.
 * @requires useProfileContext - Context to manage user authentication state.
 *
 * @exports SetFavBook
 *
 * @author Chace Nielson
 * @created 2025-01-13
 * @updated 2025-01-13
 */

import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa"; // Import star icons
import { addFavoriteBook, removeFavoriteBook } from "@/API/favBooksAPI";
import { toast } from "react-hot-toast";
import { useFavBooks } from "@/context/FavBooksContext";
import { useProfileContext } from "@/context/ProfileContext";

function SetFavBook({ id, bookTitle = null, large = false, loading = false }) {
  const { isLoggedIn } = useProfileContext(); // Access user authentication context
  const { favBooks, loadFavBooks } = useFavBooks(); // Access favorites context
  const [isLocalFav, setIsLocalFav] = useState(false); // Local state for favorite status

  // Sync local favorite state with context
  useEffect(() => {
    if (id) {
      const isFav = favBooks.some((book) => book.id === id);
      setIsLocalFav(isFav);
    }
  }, [favBooks, id]);

  // Toggle favorite status
  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return; // Prevent toggling if loading

    try {
      if (isLocalFav) {
        await removeFavoriteBook(id); // Remove favorite
        setIsLocalFav(false);
        toast.success(`${bookTitle || "Book"} removed from favorites`);
      } else {
        await addFavoriteBook(id); // Add favorite
        setIsLocalFav(true);
        toast.success(`${bookTitle || "Book"} added to favorites`);
      }
      loadFavBooks(); // Reload favorites
    } catch (error) {
      console.error("Error updating favorite status:", error);
      toast.error("An error occurred while updating favorites.");
    }
  };

  // Render nothing if user is not logged in or if loading
  if (!isLoggedIn || loading) return null;

  const starClass = `text-white ${large ? "text-4xl" : "text-2xl"}`;

  return (
    <button
      onClick={toggleFavorite}
      className={`focus:outline-none bg-black p-1 rounded-full ${
        isLocalFav ? "bg-opacity-50" : "bg-opacity-30"
      }`}
      aria-label={isLocalFav ? "Remove from favorites" : "Add to favorites"}
    >
      <FaStar className={isLocalFav ? `text-yellow-500 ${starClass}` : starClass} />
    </button>
  );
}

export default SetFavBook;
