import { FaStar } from "react-icons/fa"; // Import star icons
import React, { useState, useEffect } from "react";
import { addFavoriteBook, removeFavoriteBook } from "@/API/favBooksAPI";
import { toast } from "react-hot-toast";
import { useFavBooks } from "@/context/FavBooksContext";
import { useProfileContext } from "@/context/ProfileContext";

function SetFavBook({ id, bookTitle = null, large = false, loading = false }) {
  const { isLoggedIn } = useProfileContext(); // Access user authentication context
  const { favBooks, loadFavBooks } = useFavBooks(); // Access favorites context
  const [isLocalFav, setIsLocalFav] = useState(false); // Local state for favorite status

  useEffect(() => {
    if (id) {
      const isFav = favBooks.some((book) => book.id === id);
      setIsLocalFav(isFav);
    }
  }, [favBooks, id]);

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
        isLocalFav ? "bg-opacity-80" : "bg-opacity-60"
      }`}
      aria-label={isLocalFav ? "Remove from favorites" : "Add to favorites"}
    >
      <FaStar className={isLocalFav ? `text-yellow-500 ${starClass}` : starClass} />
    </button>
  );
}

export default SetFavBook;
