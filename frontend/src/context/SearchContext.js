// src/context/SearchContext.js
"use client";  // Add this line at the top

import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    language: '',
    description: false,
    sort_by: 'most_recent',
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleSearch, filters, handleFilterChange }}>
      {children}
    </SearchContext.Provider>
  );
};
