/**
 * @file SearchContext.js
 * @module SearchContext
 * @description 
 *   Provides a context for managing search-related state and functionality, including 
 *   search queries and filters. Enables shared state across components for a unified 
 *   search experience.
 *
 * @example
 *   // Wrap your application or specific component tree:
 *   <SearchProvider>
 *     <YourComponent />
 *   </SearchProvider>
 *
 *   // Use the context in a child component:
 *   const { searchQuery, handleSearch, filters, handleFilterChange } = useSearch();
 *
 * @author Chace Nielson
 * @created 2025-01-10
 * @updated 2025-01-11
 */

"use client";

import React, { createContext, useContext, useState } from "react";

// Create the SearchContext
const SearchContext = createContext();

/**
 * Custom Hook to access the SearchContext
 * @returns {object} The context value containing search state and handlers.
 */
export const useSearch = () => useContext(SearchContext);

/**
 * SearchProvider Component
 * 
 * @param {React.ReactNode} children - The child components to wrap with the context provider.
 * 
 * @returns {JSX.Element} A provider component for the SearchContext.
 */
export const SearchProvider = ({ children }) => {
  // State for the search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for search filters
  const [filters, setFilters] = useState({
    genre: "",           // Filter by genre
    language: "",        // Filter by language
    description: false,  // Toggle for description inclusion
    sort_by: "most_recent", // Sorting preference (e.g., most_recent or most_viewed)
  });

  /**
   * Handles changes to the search query input.
   * @param {Event} e - The input change event.
   */
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Handles changes to the filter options.
   * @param {Event} e - The input change event.
   */
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleSearch, filters, handleFilterChange }}>
      {children}
    </SearchContext.Provider>
  );
};
