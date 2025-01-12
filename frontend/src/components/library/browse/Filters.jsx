"use client";

/**
 * @file Filters.jsx
 * @author 
 * @date Created: January 11, 2025
 * @lastUpdated: January 11, 2025
 * @description 
 *    This component provides filtering options for the Browse Page, allowing users
 *    to filter books by sort order, genre, language, and whether to include descriptions.
 *    It uses the `SearchContext` to manage the global state of the filters.
 * 
 * @dependencies
 * - React: For rendering the component
 * - useSearch: Context hook for managing filter-related state and actions
 * - browsePageData: Data configuration for filtering and sorting options
 */

import React from "react";
import { useSearch } from "@/context/SearchContext";
import { browsePageData } from "@/data/browsePageData";

/**
 * FilterInput Component
 * 
 * A reusable input component for text, checkbox, or other types of inputs used in the filter.
 * 
 * @param {string} type - The input type (e.g., "text", "checkbox").
 * @param {string} name - The name of the input field.
 * @param {string|boolean} value - The current value of the input.
 * @param {function} onChange - Callback for handling input changes.
 * @param {string} placeholder - Placeholder text for text inputs.
 * @param {string} className - Additional CSS classes for styling.
 * @returns {JSX.Element} A styled input element.
 */
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

/**
 * Filters Component
 * 
 * Renders filtering options for the Browse Page. Includes:
 * - A dropdown for sorting books (e.g., by most recent, most viewed)
 * - Text inputs for filtering by genre and language
 * - A checkbox to include/exclude book descriptions
 * 
 * Integrates with the `SearchContext` to synchronize the filter state across the app.
 * 
 * @returns {JSX.Element} The Filters component.
 */
const Filters = () => {
  const { filters, handleFilterChange } = useSearch(); // Access filter state and handler

  return (
    <div className="flex flex-col items-center gap-4 p-4 card-background shadow rounded-lg">
      {/* Sort Options */}
      <div className="filters flex flex-col sm:flex-row lg:flex-col gap-4 items-center">
        <label htmlFor="sort_by" className="text-sm font-medium">
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
