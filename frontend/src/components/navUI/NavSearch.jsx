/**
 * @file NavSearch.jsx
 * @module NavSearch
 * @description 
 *   A search bar component for the navigation bar. Allows users to input search queries 
 *   and navigate to the browse page on submission. Integrates with the global search context.
 * 
 * @example
 *   <NavSearch />
 * 
 * @author Chace Nielson
 * @created 2025-01-10
 * @updated 2025-01-11
 */

"use client";

import React, { useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { useRouter } from "next/navigation";
import { navData } from "@/data/navData";

const NavSearch = () => {
  const [localQuery, setLocalQuery] = useState(""); // Local state for the search input
  const { handleSearch } = useSearch(); // Access the global search context to update the search query
  const router = useRouter(); // Next.js router for navigation

  /**
   * Handles user input changes in the search bar.
   * Updates the local state and global search context.
   * 
   * @param {Event} e - Input change event.
   */
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setLocalQuery(newQuery); // Update local state
    handleSearch(e); // Update global search context
  };

  /**
   * Handles navigation to the browse page for search results.
   * Triggered on "Enter" key press or button click.
   */
  const navigateToBrowse = () => {
    router.push(navData.browseButton.href); // Navigate to the browse page
  };

  /**
   * Handles "Enter" key press in the search bar to submit the search.
   * 
   * @param {Event} e - Keyboard event.
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigateToBrowse(); // Trigger navigation
    }
  };

  /**
   * Handles button click to submit the search.
   */
  const handleSearchClick = () => {
    navigateToBrowse(); // Trigger navigation
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center gap-1 bg-secondary dark:bg-primary rounded-lg p-0.5 shadow-md">
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search Books..."
        value={localQuery} // Bind to local state
        onChange={handleInputChange} // Handle input changes
        onKeyDown={handleKeyDown} // Trigger navigation on "Enter"
        className="flex-1 px-2 py-1 rounded-lg bg-primary dark:bg-secondary text-secondary dark:text-primary border border-secondary dark:border-primary focus:outline-none focus:ring-2 focus:ring-accent-dark transition"
      />
      {/* Search button */}
      <button
        onClick={handleSearchClick} // Trigger navigation on click
        className="nav-button-1"
      >
        <span className="relative z-10 flex gap-1 items-center">
          {navData.browseButton.searchTitle}
        </span>
      </button>
    </div>
  );
};

export default NavSearch;
