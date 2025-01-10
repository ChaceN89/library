import React, { useState, useEffect } from 'react';
import { addFavoriteBook, removeFavoriteBook } from '@/API/favBooksAPI'; // Import the API functions
import { toast } from 'react-hot-toast'; // For notifications
import { useFavBooks } from '@/context/FavBooksContext';  // Import the context

function SetFavBook({ id, title }) {
  const { favBooks } = useFavBooks();  // Get the context for favorite books
  const [isLocalFav, setIsLocalFav] = useState(false);  // Local state for favorite status

  // Check if the book is in the favorite books list on initial load
  useEffect(() => {
    const isFav = favBooks.some((book) => book.id === id);  // Compare book IDs
    setIsLocalFav(isFav);
  }, [favBooks, id]);  // Trigger check when favBooks or id changes

  const toggleFavorite = async () => {
    try {
      if (isLocalFav) {
        // Remove from favorites
        await removeFavoriteBook(id);
        setIsLocalFav(false);  // Update the star to unfilled
      } else {
        // Add to favorites
        await addFavoriteBook(id);
        setIsLocalFav(true);  // Update the star to filled
      }
    } catch (error) {
      toast.error(error.message || 'Error updating favorites');
    }
  };

  return (
    <div onClick={toggleFavorite} className="cursor-pointer">
      {isLocalFav ? (
        <span className="text-yellow-500 text-2xl">⭐ </span>
      ) : (
        <span className="text-gray-500 text-2xl">☆ </span>
      )}
    </div>
  );
}

export default SetFavBook;
