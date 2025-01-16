/**
 * @file favBooksContext.js
 * @module FavBooksContext
 * @description
 *   Provides a context and provider for managing the user's favorite books.
 *   Handles fetching, storing, and reloading the list of favorite books.
 *   Includes a custom hook for convenient access to the context.
 * 
 * @context FavBooksContext
 * 
 * @requires react
 * @requires createContext from "react" - For creating the context.
 * @requires fetchFavBooks from "@/API/favBooksAPI" - API function to fetch favorite books.
 * 
 * @description
 * - Maintains a list of favorite books and their loading status.
 * - Exposes functions to reload the list of favorite books.
 * - Can be used across the application to provide a consistent favorites state.
 * 
 * @example
 * // Wrap the application in the FavBooksProvider to enable the context:
 * <FavBooksProvider>
 *   <App />
 * </FavBooksProvider>
 * 
 * @example
 * // Access the context in a component:
 * const { favBooks, loading, loadFavBooks } = useFavBooks();
 * 
 * @author Chace Nielson
 * @created 2025-01-12
 * @updated 2025-01-12
 */

"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchFavBooks } from '@/API/favBooksAPI';  // Import the API to fetch favorites

// Create the Favorite Books context
const FavBooksContext = createContext();

/**
 * FavBooksProvider Component
 * @param {ReactNode} children - Child components to be wrapped by the provider.
 * @returns {JSX.Element} The context provider for favorite books.
 */
export const FavBooksProvider = ({ children }) => {
  const [favBooks, setFavBooks] = useState([]); // List of favorite books
  const [loading, setLoading] = useState(true); // Loading state for fetching favorites
  const [error, setError] = useState(false); // Loading state for fetching favorites

  /**
   * Fetch and load the user's favorite books.
   */
  const loadFavBooks = async () => {
    try {
      setLoading(true); // Set loading state to true
      const books = await fetchFavBooks(); // Fetch all favorite books
      setFavBooks(books); // Update the list of favorite books
      setError(false)
    } catch (error) {
      // console.error("Failed to fetch favorite books:", error); // Log errors to the console
      setError(true)
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Fetch favorite books when the provider is mounted
  useEffect(() => {
    loadFavBooks();
  }, []);

  return (
    <FavBooksContext.Provider value={{ favBooks, loading, loadFavBooks, error }}>
      {children}
    </FavBooksContext.Provider>
  );
};

/**
 * useFavBooks Hook
 * @returns {Object} The favorite books context value.
 * @throws {Error} If used outside the FavBooksProvider.
 */
export const useFavBooks = () => {
  const context = useContext(FavBooksContext);
  if (!context) {
    throw new Error("useFavBooks must be used within a FavBooksProvider");
  }
  return context;
};
