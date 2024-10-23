// src/components/search/SearchBar.jsx
"use client";
import React from 'react';
import SearchInput from './SearchInput';
import Filters from './Filters';

const SearchBar = () => (
  <div className="search-bar">
    <SearchInput />
    <Filters />
  </div>
);

export default SearchBar;
