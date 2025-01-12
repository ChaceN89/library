"use client";
import React from "react";
import { useSearch } from "@/context/SearchContext";
import { browsePageData } from "@/data/browsePageData";

// Reusable Input Component
const FilterInput = ({ type = "text", name, value, onChange, placeholder, className }) => (
  <input
    type={type}
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className={`p-2 border rounded-md ${className}`}
  />
);

const Filters = () => {
  const { filters, handleFilterChange } = useSearch();

  return (
    <div className="flex flex-col items-center gap-4 p-4 card-background shadow rounded-lg">
      {/* Sort Options */}
      <div className="filters flex flex-col sm:flex-row lg:flex-col gap-4 items-center">
        <label htmlFor="sort_by" className="text-sm font-medium ">
          Sort by:
        </label>
        <select
          id="sort_by"
          name="sort_by"
          value={filters.sort_by}
          onChange={handleFilterChange}
          className="p-2 border rounded-md"
        >
          {Object.entries(browsePageData.sortOptions).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Text Inputs */}
      <div className="flex flex-col gap-2 w-full md:flex-row">
        <FilterInput
          name="genre"
          value={filters.genre}
          onChange={handleFilterChange}
          placeholder="Genre"
          className="w-full"
        />
        <FilterInput
          name="language"
          value={filters.language}
          onChange={handleFilterChange}
          placeholder="Language"
          className="w-full"
        />
      </div>

      {/* Checkbox */}
      <label className="flex items-center gap-2">
        <FilterInput
          type="checkbox"
          name="description"
          checked={filters.description}
          onChange={handleFilterChange}
          className="w-4 h-4"
        />
        <span className="text-sm font-medium">Include Description</span>
      </label>
    </div>
  );
};

export default Filters;
