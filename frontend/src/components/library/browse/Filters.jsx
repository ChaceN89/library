// src/components/search/Filters.jsx
"use client";
import React from 'react';
import { useSearch } from '@/context/SearchContext';

const Filters = () => {
  const { filters, handleFilterChange } = useSearch();

  return (
    <div className="flex items-center gap-2">
      <div className="filters flex flex-col md:flex-row gap-2">
        <div className="text-center">Sort by:</div>
        <select
          name="sort_by"
          value={filters.sort_by}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="most_recent">Most Recent</option>
          <option value="least_recent">Least Recent</option>
          <option value="most_viewed">Most Viewed</option>
          <option value="least_viewed">Least Viewed</option>
          <option value="most_downloaded">Most Downloaded</option>
          <option value="least_downloaded">Least Downloaded</option>
          <option value="title_asc">Title (A-Z)</option>
          <option value="title_desc">Title (Z-A)</option>
        </select>
      </div>
      <input
        type="text"
        name="genre"
        value={filters.genre}
        placeholder="Genre"
        onChange={handleFilterChange}
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="language"
        value={filters.language}
        placeholder="Language"
        onChange={handleFilterChange}
        className="p-2 border rounded"
      />
      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          name="description"
          checked={filters.description}
          onChange={handleFilterChange}
        />
        Include Description
      </label>
    </div>
  );
};

export default Filters;
