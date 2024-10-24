import React, { useState, useEffect } from 'react';
import { addFavoriteBook, removeFavoriteBook } from '@/API/favBooksAPI'; // Import the API functions
import { toast } from 'react-hot-toast'; // For notifications
import { useFavBooks } from '@/context/FavBooksContext';  // Import the context

function SetFavBook({ id }) {
  const { favBooks, loadFavBooks } = useFavBooks();  // Get the context for favorite books
  const [isLocalFav, setIsLocalFav] = useState(false);  // Local state for favorite status

  // Check if the book is in the favorite books list
  useEffect(() => {
    const isFav = favBooks.some((book) => book.id === id);  // Compare book IDs
    setIsLocalFav(isFav);
  }, [favBooks, id]);  // Trigger check when favBooks or id changes

  const toggleFavorite = async () => {
    try {
      if (isLocalFav) {
        // Remove from favorites
        await removeFavoriteBook(id);
        setIsLocalFav(false);
        toast.success('Book removed from favorites');
      } else {
        // Add to favorites
        await addFavoriteBook(id);
        setIsLocalFav(true);
        toast.success('Book added to favorites');
      }

      // Trigger a refetch of the favorite books
      await loadFavBooks();
    } catch (error) {
      toast.error(error.message || 'Error updating favorites');
    }
  };

  return (
    <div onClick={toggleFavorite} className="cursor-pointer">
      {isLocalFav ? (
        <span className="text-yellow-500">⭐ Favourite</span>
      ) : (
        <span className="text-gray-500">☆ </span>
      )}
    </div>
  );
}

export default SetFavBook;
