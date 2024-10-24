import React, { useState, useEffect } from 'react';
import { addFavoriteBook, removeFavoriteBook } from '@/API/favBooksAPI'; // Import the API functions
import { toast } from 'react-hot-toast'; // For notifications
import { useFavBooks } from '@/context/FavBooksContext';  // Import the context

function SetFavBook({ id, title }) {
  const { favBooks, loadFavBooks } = useFavBooks();  // Get the context for favorite books
  const [isLocalFav, setIsLocalFav] = useState(false);  // Local state for favorite status
  const [removalTimeout, setRemovalTimeout] = useState(null);  // To store the removal timeout ID

  // Check if the book is in the favorite books list
  useEffect(() => {
    const isFav = favBooks.some((book) => book.id === id);  // Compare book IDs
    setIsLocalFav(isFav);
  }, [favBooks, id]);  // Trigger check when favBooks or id changes

  const removeFavorite = async () => {
    try {
      // Remove the book from favorites immediately
      await removeFavoriteBook(id);
      setIsLocalFav(false);  // Remove from the UI

      // Show toast with Undo option
      const toastId = toast(
        <span>
          {`'${title}' removed from favorites.`}
          <button
            onClick={() => undoRemoveFavorite(toastId)}
            className="ml-2 text-blue-500 underline"
          >
            Undo
          </button>
        </span>,
        { duration: 4000 }  // Show for 4 seconds
      );

      // Set a timeout to finalize the removal if not undone
      const timeoutId = setTimeout(async () => {
        toast.dismiss(toastId);  // Dismiss the undo toast
        await loadFavBooks();  // Refresh the favorite books list after removal is finalized
      }, 4000);

      setRemovalTimeout(timeoutId);  // Store the timeout ID
    } catch (error) {
      toast.error(error.message || 'Error removing favorite');
    }
  };

  const addFavorite = async () => {
    try {
      await addFavoriteBook(id);  // Add to favorites
      setIsLocalFav(true);  // Update UI
      toast.success(`'${title}' added to favorites`);
      await loadFavBooks();  // Refresh the favorite books list
    } catch (error) {
      toast.error(error.message || 'Error adding favorite');
    }
  };

  // Undo remove favorite action
  const undoRemoveFavorite = (toastId) => {
    clearTimeout(removalTimeout);  // Clear the removal timeout
    toast.dismiss(toastId);  // Dismiss the undo toast
    addFavorite();  // Re-add the book to favorites
  };

  const toggleFavorite = async () => {
    if (isLocalFav) {
      removeFavorite();  // Remove from favorites and trigger undo toast
    } else {
      addFavorite();  // Add to favorites
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
