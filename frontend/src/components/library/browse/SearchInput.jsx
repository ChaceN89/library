// src/components/search/SearchInput.jsx
"use client";
import React from 'react';
import { useSearch } from '@/context/SearchContext';

const SearchInput = () => {
  const { searchQuery, handleSearch } = useSearch();

  return (
    <input
      type="text"
      placeholder="Search by title or author..."
      value={searchQuery}
      onChange={handleSearch}
      className="border p-2 rounded mb-4 w-full"
    />
  );
};

export default SearchInput;
