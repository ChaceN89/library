// src/components/library/SearchBar.jsx
import React from 'react';

function SearchBar({ searchQuery, handleSearch, handleFilterChange, filters }) {
  return (
    <div className="search-bar">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchQuery}
        onChange={handleSearch}
        className="border p-2 rounded mb-4 w-full"
      />
      <div className='flex gap-2'>
        {/* Genre Input */}
        <input
          type="text"
          name="genre"
          value={filters.genre}
          placeholder="Genre"
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />

        {/* Language Input */}
        <input
          type="text"
          name="language"
          value={filters.language}
          placeholder="Language"
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />

        {/* Toggle Description Search */}
        <label>
          <input
            type="checkbox"
            name="description"
            checked={filters.description}
            onChange={handleFilterChange}
          />
          Include Description
        </label>
      </div>

      {/* Filter Options */}
      <div className="filters mt-2 flex flex-col md:flex-row gap-4">
        <div>Sort by:</div>
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
          <option value="title_asc">Title (A-Z)</option>  {/* Add title sorting */}
          <option value="title_desc">Title (Z-A)</option>  {/* Add title sorting */}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
