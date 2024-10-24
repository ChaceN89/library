// favBooksContext.js
"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchFavBooks } from '@/API/favBooksAPI';  // Import the API to fetch favorites

const FavBooksContext = createContext();

export const FavBooksProvider = ({ children }) => {
  const [favBooks, setFavBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavBooks = async () => {
    try {
      setLoading(true);
      const books = await fetchFavBooks();  // Fetch all favorite books
      setFavBooks(books);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavBooks();  // Load favorite books on mount
  }, []);

  return (
    <FavBooksContext.Provider value={{ favBooks, loading, loadFavBooks }}>
      {children}
    </FavBooksContext.Provider>
  );
};

// Custom hook to use the Favorite Books context
export const useFavBooks = () => {
  return useContext(FavBooksContext);
};
