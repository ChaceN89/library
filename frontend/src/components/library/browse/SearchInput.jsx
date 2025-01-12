// src/components/search/SearchInput.jsx
"use client";

/**
 * @file SearchInput.jsx
 * @author 
 * @date Created: January 11, 2025
 * @lastUpdated: January 11, 2025
 * @description 
 *    This component renders a search input field as a multi-line text area for
 *    users to search for book titles and authors. It integrates with the `SearchContext`
 *    to handle and update the application's search query state in real-time.
 * 
 * @dependencies
 * - React: For component rendering
 * - useSearch: Context hook for managing the search query and handler
 */

import React from "react";
import { useSearch } from "@/context/SearchContext";

/**
 * SearchInput Component
 * 
 * Renders a responsive, multi-line text area that allows users to search for book
 * titles and authors. The component syncs the user input with the global search
 * state via `SearchContext`.
 * 
 * @returns {JSX.Element} The SearchInput component.
 */
const SearchInput = () => {
  // Access search-related state and handler from SearchContext
  const { searchQuery, handleSearch } = useSearch();

  return (
    <textarea
      placeholder="Type to Search for Book Titles and Authors..." // Informative placeholder for users
      rows={2} // Default visible rows in the text area
      value={searchQuery} // Bind the value to the searchQuery state
      onChange={handleSearch} // Update the state whenever user types
      className="nav-search border-2 w-full p-2 min-h-10 max-h-20 card-background"
    />
  );
};

export default SearchInput;
