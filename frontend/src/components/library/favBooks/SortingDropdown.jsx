/**
 * @file SortingDropdown.jsx
 * @module SortingDropdown
 * @description
 * A reusable React component that renders a dropdown menu for sorting options.
 * Provides options for sorting items by title or author and triggers a callback
 * when the selection changes.
 *
 * @param {string} sortOption - The currently selected sorting option.
 * @param {function} handleSort - Callback function to handle the sorting option change.
 *
 * @example
 * <SortingDropdown 
 *   sortOption="title" 
 *   handleSort={(e) => console.log(e.target.value)} 
 * />
 *
 * @requires react
 *
 * @exports SortingDropdown
 *
 * @author Chace Nielson
 * @created 2025-01-14
 * @updated 2025-01-14
 */

import React from 'react'

function SortingDropdown({sortOption, handleSort}) {
  return (
    <div className="mb-4 flex items-center">
    <label
      htmlFor="sort"
      className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      Sort by:
    </label>
    <select
      id="sort"
      value={sortOption}
      onChange={handleSort}
      className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
    >
      <option value="">Select</option>
      <option value="title">Title</option>
      <option value="author">Author</option>
    </select>
  </div>

  )
}

export default SortingDropdown