import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import star icons
import { addFavoriteBook, removeFavoriteBook } from '@/API/favBooksAPI';
import { toast } from 'react-hot-toast';
import { useFavBooks } from '@/context/FavBooksContext';

function SetFavBook({ id }) {
  const { favBooks } = useFavBooks();
  const [isLocalFav, setIsLocalFav] = useState(false);

  useEffect(() => {
    const isFav = favBooks.some((book) => book.id === id);
    setIsLocalFav(isFav);
  }, [favBooks, id]);

  const toggleFavorite = async (e) => {
    e.stopPropagation(); // Prevent the click from triggering parent actions
    try {
      if (isLocalFav) {
        await removeFavoriteBook(id);
        setIsLocalFav(false);
        toast.success('Removed from favorites');
      } else {
        await addFavoriteBook(id);
        setIsLocalFav(true);
        toast.success('Added to favorites');
      }
    } catch (error) {
      toast.error(error.message || 'Error updating favorites');
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
