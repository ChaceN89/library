"use client";  // Ensure this is a client component

import React, { useState } from 'react';
import { useSearch } from '@/context/SearchContext';
import { useRouter } from 'next/navigation';  // Import useRouter from next/navigation

const NavSearch = () => {
  const [localQuery, setLocalQuery] = useState('');  // Local state for the search input
  const { handleSearch } = useSearch();  // Access the context to update search globally
  const router = useRouter();  // Use the new next/navigation's useRouter

  // Handle user input in NavSearch
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setLocalQuery(newQuery);  // Update the local state

    // Update global search context
    handleSearch(e);
  };

  // Handle "Enter" key press for search submission
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      router.push('/browse');  // Navigate to /browse when "Enter" is pressed
    }
  };

  // Handle button click for search submission
  const handleSearchClick = () => {
    router.push('/browse');  // Navigate to /browse when the button is clicked
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={localQuery}  // Use local state to manage the input
        onChange={handleInputChange}  // Trigger input change
        onKeyDown={handleKeyDown}  // Trigger navigation when "Enter" is pressed
        className="border rounded-lg p-2 mr-2"  // Add margin-right for spacing
      />
      <button
        onClick={handleSearchClick}  // Trigger navigation when button is clicked
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default NavSearch;
