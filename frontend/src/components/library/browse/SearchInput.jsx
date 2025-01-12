// src/components/search/SearchInput.jsx
"use client";
import React from 'react';
import { useSearch } from '@/context/SearchContext';

const SearchInput = () => {
  const { searchQuery, handleSearch } = useSearch();

  return (
    <textarea
      type="text"
      placeholder="Type to Search for Books..."
      rows={2} // Sets it to display 2 lines by default
      value={searchQuery} // Bind to local state
      onChange={handleSearch} // Handle input changes
      className="nav-search border-2 w-full p-2 min-h-10 max-h-24 card-background"
    />
  );
};

export default SearchInput;
