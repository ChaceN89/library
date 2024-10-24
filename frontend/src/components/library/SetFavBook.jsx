import React, { useState } from 'react';
import { addFavoriteBook, removeFavoriteBook } from '@/API/favBooksAPI'; // Import the API functions
import { toast } from 'react-hot-toast'; // For notifications

function SetFavBook({ inFavSection, id }) {
  const [isLocalFav, setIsLocalFav] = useState(inFavSection); // State to track whether the book is a favorite or not

  const toggleFavorite = async () => {
    try {
      if (isLocalFav) {
        // Remove from favorites
        const response = await removeFavoriteBook(id);
        setIsLocalFav(false);
        toast.success(response.detail);
      } else {
        // Add to favorites
        const response = await addFavoriteBook(id);
        setIsLocalFav(true);
        toast.success(response.detail);
      }
    } catch (error) {
      toast.error(error.message || 'Error updating favorites');
      if (error.message === 'Book is already in favorites.') {
        setIsLocalFav(true);
      }
    }
  };

  return (
    <div onClick={toggleFavorite} className="cursor-pointer">
      {isLocalFav ? (
        <span className="text-yellow-500">⭐</span> 
      ) : (
        <span className="text-yellow-500">☆</span> 
      )}
    </div>
  );
}

export default SetFavBook;
